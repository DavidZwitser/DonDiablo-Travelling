import ParalaxObject from '../../../../Rendering/Sprites/ParalaxObject';
// import MusicVisualizer from '../../../Environment/Paralax/MusicVisualizer';
import ScoreBar from '../../Paralax/UI/ScoreBar';
import ImageButton from './ImageButton';

import AtlasImages from '../../../../Data/Atlases';
import GameOverScreen from '../UI/GameOverScreen';
import AtlasImages from '../../../../Data/AtlasImages';

/** The user interface */
export default class UI extends ParalaxObject
{
    private _pauseButton: ImageButton;
    private _pauseBackground: Phaser.Sprite;
    // private _titleText: Phaser.Text;
    // private _visualizer: MusicVisualizer;

    public onPause: Phaser.Signal;
    private _scoreBar: ScoreBar;
    private _gameOverScreen: GameOverScreen;

    constructor(game: Phaser.Game)
    {
        super(game);
        this.onPause = new Phaser.Signal();

        this.createPauseBackground();
        this.createPauseButton();
        this.createScoreBar();
        this.createGameOverScreen();

        this.resize();
    }

    private resize(): void
    {
       // let vmax: number = Math.max(this.game.width, this.game.height);
        let vmin: number = Math.min(this.game.width, this.game.height / 2);

        this._pauseButton.scale.set(vmin / GAME_WIDTH);
        this._pauseButton.position.set(this.game.width / 1.075, this.game.height / 2 * .2);
    }

    private createPauseBackground(): void
{
    this._pauseBackground = new Phaser.Sprite(this.game, this.game.width / 1.07, this.game.height / 2.45, AtlasImages.Interface, 'UserInterface_PauseHud_Backdrop');
    this.addChild(this._pauseBackground);
}

    private createPauseButton(): void
{
    this._pauseButton = new ImageButton(this.game, this.game.width / 1.075, this.game.height / 2, 'ui_ingame_button_pause', 'ui_ingame_button_pause', () => {
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
