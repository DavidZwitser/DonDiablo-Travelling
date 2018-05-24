import ParalaxObject from '../../../../Rendering/Sprites/ParalaxObject';
// import MusicVisualizer from '../../../Environment/Paralax/MusicVisualizer';
import ScoreBar from '../../Paralax/UI/ScoreBar';
import PauseButton from '../../Paralax/UI/PauseButton';
import PlayerCollisionChecker from '../../../../Systems/PlayerCollisionChecker';

import PauseScreen from './PauseScreen';
import GameOverScreen from './GameOverScreen';

/** The user interface */
export default class UI extends ParalaxObject
{
    // private _titleText: Phaser.Text;
    // private _visualizer: MusicVisualizer;

    public onPause: Phaser.Signal;

    public scoreBar: ScoreBar;
    private _pauseButton: PauseButton;
    public pauseScreen: PauseScreen;

    private _gameOverScreen: GameOverScreen;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.createPauseButton();
        this.createScoreBar();

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
            this.scoreBar.Value += 0.05;
        });
        PlayerCollisionChecker.getInstance().onMissing.add(() => {
            this.scoreBar.Value -= 0.1;
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

    public Pause(pause: boolean): void {
        this.pauseScreen.visible = pause;
        this._pauseButton.pauseButton.visible = !pause;
        this.scoreBar.visible = !pause;
    }

    public gameOver(): void
    {
        this._gameOverScreen.visible = true;
    }

    public resize(): void
    {
        this.pauseScreen.position.set(this.game.width / 2, this.game.height / 2);
        this.pauseScreen.resize();

        this._gameOverScreen.position.set(this.game.width / 2, this.game.height / 2);
        this._gameOverScreen.resize();

        this._pauseButton.resize();
        this.scoreBar.resize();
    }

    public destroy(): void {
        PlayerCollisionChecker.getInstance().onColliding.removeAll();
        PlayerCollisionChecker.getInstance().onMissing.removeAll();

        this.scoreBar.destroy();
    }
}
