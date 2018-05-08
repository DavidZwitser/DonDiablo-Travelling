import ParalaxObject from '../../../../Rendering/Sprites/ParalaxObject';
// import MusicVisualizer from '../../../Environment/Paralax/MusicVisualizer';
import ScoreBar from '../../Paralax/UI/ScoreBar';
import ImageButton from './ImageButton';

/** The user interface */
export default class UI extends ParalaxObject
{
    private _pauseButton: ImageButton;
    // private _titleText: Phaser.Text;
    // private _visualizer: MusicVisualizer;

    private _scoreBar: ScoreBar;

    constructor(game: Phaser.Game)
    {
        super(game);
        this.createPauseButton();
        this.createScoreBar();
    }

    private createPauseButton(): void
{
    this._pauseButton = new ImageButton(this.game, this.game.width / 1.1, this.game.height / 2, 'ui_ingame_button_pause', 'ui_ingame_button_pause', () => {
        // PAUSE FUNCTION
    }, this);

    this.game.add.existing(this._pauseButton);
}

    private createScoreBar(): void
    {
        this._scoreBar = new ScoreBar(this.game, 0, 0);

        this.game.add.existing(this._scoreBar);
    }
}
