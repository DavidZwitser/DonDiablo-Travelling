import ParalaxObject from '../../../../Rendering/Sprites/ParalaxObject';
// import MusicVisualizer from '../../../Environment/Paralax/MusicVisualizer';
import ScoreBar from '../../Paralax/UI/ScoreBar';
import PauseButton from '../../Paralax/UI/PauseButton';

/** The user interface */
export default class UI extends ParalaxObject
{
    // private _titleText: Phaser.Text;
    // private _visualizer: MusicVisualizer;

    public onPause: Phaser.Signal;

    private _scoreBar: ScoreBar;
    private _pauseButton: PauseButton;

    constructor(game: Phaser.Game)
    {
        super(game);
        this.onPause = new Phaser.Signal();

        this.createScoreBar();
        this.createPauseButton();
    }

    private createScoreBar(): void
    {
        this._scoreBar = new ScoreBar(this.game, 0, 0);
        this.game.add.existing(this._scoreBar);
    }

    private createPauseButton(): void
    {
        this._pauseButton = new PauseButton(this.game);
        this.game.add.existing(this._pauseButton);

        this.onPause = new Phaser.Signal();
        this._pauseButton.onPause.add(this.signal.bind(this));
    }

    public resize(): void
    {
        this._pauseButton.resize();
        this._scoreBar.resize();
    }

    public signal(): void
    {
        this.onPause.dispatch();
    }
}
