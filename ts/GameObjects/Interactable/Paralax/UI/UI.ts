import ParalaxObject from '../../../../Rendering/Sprites/ParalaxObject';
// import MusicVisualizer from '../../../Environment/Paralax/MusicVisualizer';
import ScoreBar from '../../Paralax/UI/ScoreBar';

import PauseButton from '../../Paralax/UI/PauseButton';
import PlayerCollisionChecker from '../../../../Systems/PlayerCollisionChecker';

import PauseScreen from './PauseScreen';
import GameOverScreen from './GameOverScreen';

import PickupCounter from '../UI/PickupCounter';
import PopUpText from '../UI/PopUpText';

/** The user interface */
export default class UI extends ParalaxObject
{
    // private _titleText: Phaser.Text;
    // private _visualizer: MusicVisualizer;

    public onPause: Phaser.Signal;

    public scoreBar: ScoreBar;
    public pickupCounter: PickupCounter;
    private _pauseButton: PauseButton;
    private _popUpText: PopUpText;
    public pauseScreen: PauseScreen;

    private _gameOverScreen: GameOverScreen;
    private _trackText: Phaser.BitmapText;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.createPauseButton();
        this.createScoreBar();
        this.createPickUpCounter();
        this.createTrackText();
        this.createPopUpText();

        this.pauseScreen = new PauseScreen(game, 1, 80, 80);
        this.pauseScreen.onResume.add(() => this.onPause.dispatch(), this);

        this._gameOverScreen = new GameOverScreen(game, 1, 80, 80);
        this.addChild(this._gameOverScreen);

        this.addChild(this.pauseScreen);

        this.onPause = new Phaser.Signal();
    }

    private createScoreBar(): void
    {
        this.scoreBar = new ScoreBar(this.game, 0, 0);
        PlayerCollisionChecker.getInstance().onColliding.add(() => {
            this.scoreBar.value += 0.05;
        });
        PlayerCollisionChecker.getInstance().onMissing.add(() => {
            this.scoreBar.value -= 0.1;
        });
        // this.scoreBar.onEmpty.add(() => {
        //     console.log('GAME OVER!');
        // });
        this.game.add.existing(this.scoreBar);
    }

    private createPauseButton(): void
    {
        this._pauseButton = new PauseButton(this.game);

        this._pauseButton.onPause.add(() => this.onPause.dispatch(), this);
    }

    private createPickUpCounter(): void
    {
        this.pickupCounter = new PickupCounter(this.game, this.game.width / 2, this.game.height / 2);
        this.addChild(this.pickupCounter);
        PlayerCollisionChecker.getInstance().onColliding.add(() => {
            this.pickupCounter.updateScore(10);
        });
        PlayerCollisionChecker.getInstance().onCollidingPerfect.add(() =>
        {
            this.pickupCounter.updateScore(15);
        });
    }

    private createPopUpText(): void
    {
        this._popUpText = new PopUpText(this.game, this.game.width / 2, 2 * (this.game.height / 5));
        this.addChild(this._popUpText);
        PlayerCollisionChecker.getInstance().onCollidingPerfect.add(() =>
        {
            this._popUpText.showText();
        });
    }

    /** creates a bitmap text object containing the title of the song */
    private createTrackText(): void {
        this._trackText = new Phaser.BitmapText(this.game, 0, 0, 'myfont', 'Song track', 30);
        this._trackText.tint = 0xffffff;
        this._trackText.anchor.set(0.5);
        this.addChild(this._trackText);
    }

    public Pause(pause: boolean): void {
        this.pauseScreen.visible = pause;
        this._pauseButton.pauseButton.visible = !pause;
        this.scoreBar.visible = !pause;
    }

    public gameOver(score: number, highscore: number): void
    {
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

        this._pauseButton.resize();
        this.scoreBar.resize();
    }

    public destroy(): void {
        this.scoreBar.destroy();
    }
}
