import HexBar from '../../Paralax/UI/HexBar';

import PauseButton from '../../Paralax/UI/PauseButton';
import PlayerCollisionChecker from '../../../../Systems/PlayerCollisionChecker';

import PauseScreen from './PauseScreen';
import GameOverScreen from './GameOverScreen';

import PickupCounter from '../UI/PickupCounter';
import MotivationalPopupText from '../UI/MotivationalPopupText';
import SoundManager from '../../../../Systems/Sound/SoundManager';
import Sounds from '../../../../Data/Sounds';

/** The user interface group in the gameplay state */
export default class UI extends Phaser.Group
{
    // private _titleText: Phaser.Text;
    // private _visualizer: MusicVisualizer;

    public onPause: Phaser.Signal;

    public scoreBar: HexBar;
    public pickupCounter: PickupCounter;
    private _pauseButton: PauseButton;
    private _motivationalPopupText: MotivationalPopupText;
    public pauseScreen: PauseScreen;

    private _gameOverScreen: GameOverScreen;
    private _trackText: Phaser.BitmapText;
    private _countdownText: Phaser.BitmapText;
    private _comboValue: number = 1;
    private _streakCount: number = 0;

    private _fullCountdown: number = 3;

    private _countDownFade: Phaser.Tween;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.createPauseButton();
        this.createScoreBar();
        this.createPickUpCounter();
        this.createTrackText();
        this.createPopUpText();
        this.createCountDownText();

        this._countdownText.visible = false;

        this.pauseScreen = new PauseScreen(game, 1);
        this.pauseScreen.onResume.add(() => this.unpauseDelay(), this);

        this._gameOverScreen = new GameOverScreen(game, 1);
        this.addChild(this._gameOverScreen);

        this.addChild(this.pauseScreen);

        this.onPause = new Phaser.Signal();

    }

    /** unpauses the game after the countdown */
    private unpauseDelay(): void
    {
        this.pause(false);
        this._countdownText.visible = true;
        this._countdownText.text = '3';
        this.timeCount(3);
    }

    /** Counts down a timer before the game gets unpaused */
    private timeCount(index: number): void
    {
        this._countdownText.text = index.toString();
        if (index >= 1)
        {
            this._countdownText.alpha = 1;
            this._countDownFade = this.game.add.tween(this._countdownText)
            .to({alpha: 0}, 500, Phaser.Easing.Cubic.Out, true).start();
            this._countDownFade.onComplete.addOnce(() => this.timeCount(index - 1 ));
        }
        else
        {
            this._countdownText.visible = false;
            this.onPause.dispatch();
        }
    }

    /** Creates and declares the score/hex bar */
    private createScoreBar(): void
    {
        this.scoreBar = new HexBar(this.game, 0, 0);
        this.game.add.existing(this.scoreBar);
    }

    /** Creates and declares the pause button */
    private createPauseButton(): void
    {
        this._pauseButton = new PauseButton(this.game);

        this._pauseButton.onPause.add(() => this.onPause.dispatch(), this);
    }

    /** Creates and declares the Pickup counter */
    private createPickUpCounter(): void
    {
        this.pickupCounter = new PickupCounter(this.game, this.game.width / 2, this.game.height / 2);
        this.addChild(this.pickupCounter);

        PlayerCollisionChecker.getInstance().onColliding.add(() => {
            this.pickupCounter.updateScore(10, false);
            this.resetCombo();
        });
        PlayerCollisionChecker.getInstance().onCollidingPerfect.add(() =>
        {
            this.increaseStreakCount();
            this.pickupCounter.updateScore(15 * this._comboValue, true);
        });
        PlayerCollisionChecker.getInstance().onMissing.add(() => {
            this.resetCombo();
        });

    }

    /** Sets the combo to zero */
    private resetCombo(): void
    {
        this._streakCount = 0;
        this._comboValue = 1;
    }

    /** Increases the streak count and updates the combo */
    private increaseStreakCount(): void
    {
        this._streakCount++;
        if (this._streakCount % 5 === 0 && this._comboValue < 8) {
            this._comboValue *= 2;
        }
    }

    /** Creates and declares the Popup text */
    private createPopUpText(): void
    {
        this._motivationalPopupText = new MotivationalPopupText(this.game, this.game.width / 2, 2 * (this.game.height / 5));
        this.addChild(this._motivationalPopupText);
        PlayerCollisionChecker.getInstance().onCollidingPerfect.add(() =>
        {
            this._motivationalPopupText.showText(
                PlayerCollisionChecker.getInstance().PlayerPos.x,
                PlayerCollisionChecker.getInstance().PlayerPos.y,
                this._comboValue
            );
        });
    }

    /** creates a bitmap text object containing the title of the song */
    private createTrackText(): void {

        this._trackText = new Phaser.BitmapText(this.game, 0, 0, 'futura', 'Song track', 30);
        this._trackText.tint = 0xffffff;
        this._trackText.anchor.set(0.5);
        this.addChild(this._trackText);

    }
    /** Creates and declares the count down text */
    private createCountDownText(): void
    {
        this._countdownText = new Phaser.BitmapText(this.game, 0, 0, 'ailerons', this._fullCountdown.toString(), 30);
        this._countdownText.tint = 0xffffff;
        this._countdownText.anchor.set(0.5);
        this._countdownText.fontSize = 90;
        this.addChild(this._countdownText);
    }

    /** (un)pauses the ui */
    public pause(pause: boolean): void {

        this.pauseScreen.visible = pause;
        this._pauseButton.pauseButton.visible = !pause;
        this.scoreBar.visible = !pause;

    }

    /** Reacts when the player picks up a pickup */
    public react(): void
    {
        this._motivationalPopupText.react();
        this.scoreBar.value++;
    }

    /** So=hows game over screen */
    public gameOver(score: number, highscore: number): void
    {
        SoundManager.getInstance().play(Sounds.GAME_OVER, 1);
        this._gameOverScreen.show(score, highscore);
    }

    /** displays the title of the song using tween */
    public displayTrackTitle(title: string): void {
        this.resize();
        this._trackText.text = title;
        this._trackText.x -= 200;
        this._trackText.alpha = 0;
        this.game.add.tween(this._trackText).to({alpha: .5, x: this._trackText.position.x + 200}, 2000, Phaser.Easing.Cubic.Out, true)
        .onComplete.addOnce(() => {
            setTimeout( () => {
                this.game.add.tween(this._trackText).to({alpha: 0, x: this._trackText.position.x + 200}, 1500, Phaser.Easing.Cubic.In, true);
            }, 500);

        });
    }

    /** Resizes the ui to match the device sizes */
    public resize(): void
    {
        let vmin: number = Math.min(this.game.height, this.game.width);

        this.pauseScreen.position.set(this.game.width / 2, this.game.height / 2);
        this.pauseScreen.scale.set(vmin / GAME_WIDTH);
        this.pauseScreen.resize();

        this._gameOverScreen.position.set(this.game.width / 2, this.game.height / 2);
        this._gameOverScreen.scale.set(vmin / GAME_WIDTH);
        this._gameOverScreen.resize();

        this._trackText.scale.set(vmin / GAME_WIDTH, vmin / GAME_WIDTH);
        this._trackText.position.set(this.game.width / 2, this.game.height / 2 + this.pickupCounter.height);

        this._countdownText.scale.set(vmin / GAME_WIDTH, vmin / GAME_WIDTH);
        this._countdownText.position.set(this.game.width / 2, this.game.height / 2 + this.pickupCounter.height);

        this._pauseButton.resize();
        this.scoreBar.resize();
    }

    public destroy(): void {
        this.scoreBar.destroy();
    }
}
