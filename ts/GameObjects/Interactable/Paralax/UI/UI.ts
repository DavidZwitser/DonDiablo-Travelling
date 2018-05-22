import ParalaxObject from '../../../../Rendering/Sprites/ParalaxObject';
// import MusicVisualizer from '../../../Environment/Paralax/MusicVisualizer';
import ScoreBar from '../../Paralax/UI/ScoreBar';
import PauseButton from '../../Paralax/UI/PauseButton';
import PlayerCollisionChecker from '../../../../Systems/PlayerCollisionChecker';

/** The user interface */
export default class UI extends ParalaxObject
{
    // private _titleText: Phaser.Text;
    // private _visualizer: MusicVisualizer;

    public onUIPause: Phaser.Signal;

    private _scoreBar: ScoreBar;
    private _pauseButton: PauseButton;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.createPauseButton();
        this.createScoreBar();

        this.onUIPause = new Phaser.Signal();
    }

    private createScoreBar(): void
    {
        this._scoreBar = new ScoreBar(this.game, 0, 0);
        PlayerCollisionChecker.getInstance().onColliding.add(() => {
            this._scoreBar.Value += 0.05;
        });
        PlayerCollisionChecker.getInstance().onMissing.add(() => {
            this._scoreBar.Value -= 0.1;
        });
        this._scoreBar.onEmpty.add(() => {
            console.log('GAME OVER!');
        });
        this.game.add.existing(this._scoreBar);
    }

    private createPauseButton(): void
    {
        this._pauseButton = new PauseButton(this.game);
        this.game.add.existing(this._pauseButton);

        this._pauseButton.onPause.add(() => this.onUIPause.dispatch(), this);
    }

    public resize(): void
    {
        this._pauseButton.resize();
        this._scoreBar.resize();
    }
}
