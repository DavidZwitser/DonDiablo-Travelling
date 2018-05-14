import ParalaxObject from '../../../../Rendering/Sprites/ParalaxObject';
// import MusicVisualizer from '../../../Environment/Paralax/MusicVisualizer';
import ScoreBar from '../../Paralax/UI/ScoreBar';
import ImageButton from './ImageButton';
import GameOverScreen from '../UI/GameOverScreen';
import AtlasImages from '../../../../Data/AtlasImages';

/** The user interface */
export default class UI extends ParalaxObject
{
    private _pauseButton: ImageButton;
    // private _titleText: Phaser.Text;
    // private _visualizer: MusicVisualizer;

    public onPause: Phaser.Signal;
    private _scoreBar: ScoreBar;
    private _gameOverScreen: GameOverScreen;

    constructor(game: Phaser.Game)
    {
        super(game);
        this.onPause = new Phaser.Signal();

        this.createPauseButton();
        this.createScoreBar();
        this.createGameOverScreen();
    }

    private createPauseButton(): void
{
    this._pauseButton = new ImageButton(this.game, this.game.width / 1.1, this.game.height / 2, 'ui_ingame_button_pause', 'ui_ingame_button_pause', () => {
        this.onPause.dispatch();
    }, this);

    this.game.add.existing(this._pauseButton);
}

    private createScoreBar(): void
    {
        this._scoreBar = new ScoreBar(this.game, 0, this.game.height / 1.1);

        this.game.add.existing(this._scoreBar);
    }

    private createGameOverScreen(): void
    {
        this._gameOverScreen = new GameOverScreen(this.game , 0.6, 120, 125, AtlasImages.Background);
        this._gameOverScreen.x = this.game.width / 2;
        this._gameOverScreen.y = this.game.height / 2;
        this.game.add.existing(this._gameOverScreen);
    }
}
