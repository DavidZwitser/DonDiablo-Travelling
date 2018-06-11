import 'phaser-ce';
import TextButton from '../UI/TextButton';
import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';
import Gameplay from '../../../../States/Gameplay';
import Menu from '../../../../States/Menu';

/** The based class for any popup in the game */
export default class BasePopUp extends Phaser.Group
{
    private _backToMenuButton: TextButton;
    private _resetButton: TextButton;

    protected _titleText: Phaser.BitmapText;

    private _menuBackground: Phaser.Image;
    private _blackPixel: Phaser.Sprite;

    constructor(game: Phaser.Game, scale: number)
    {
        super(game);

        this._blackPixel = new Phaser.Sprite(this.game, 0, 0, Atlases.INTERFACE, AtlasImages.BLACK_PIXEL);
        this._blackPixel.width = game.width;
        this._blackPixel.height = game.height;
        this.addChild(this._blackPixel);
        this._blackPixel.anchor.setTo(0.5);
        this._blackPixel.alpha = 0.5;

        this._menuBackground = new Phaser.Image(game, 0, 0, Atlases.INTERFACE, 'Pausemenu_Background');
        this._menuBackground.anchor.set(0.5);
        this._menuBackground.alpha = 1;
        this.addChild(this._menuBackground);

        this._resetButton = new TextButton(game, 120, 150, 'Replay', 40, 'Pausemenu_Button_Restart_and_Quit', this.restartScene.bind(this), this);
        this._resetButton.anchor.set(0.5);
        this._resetButton.label.tint = 0xffffff;
        this._resetButton.label.fontSize = 35;
        this.addChild(this._resetButton);

        this._backToMenuButton = new TextButton(game, -120, 150, 'Quit', 12, 'Pausemenu_Button_Restart_and_Quit', this.backToMenu.bind(this), this);
        this._backToMenuButton.anchor.set(0.5);
        this._backToMenuButton.label.tint = 0xffffff;
        this._backToMenuButton.label.fontSize = 40;
        this.addChild(this._backToMenuButton);

        this._titleText = new Phaser.BitmapText(game, 0, -150, 'futura', 'Pause', 60);
        this._titleText.tint = 0xffffff;
        this._titleText.anchor.set(0.5);
        this._titleText.scale.set(scale, scale);
        this.addChild(this._titleText);

        this.visible = false;

    }

    /** When back to menu is clicked */
    private backToMenu(): void
    {
        this.game.paused = false;
        this.game.state.start(Menu.Name, true, false, this.game.world.generateTexture());
    }

    /** When the restart game button is clicked */
    private restartScene(): void
    {
        this.game.paused = false;
        this.game.state.start(Gameplay.Name, true, false);
    }

    /* Resize all the elements on the base popup */
    public resize(): void {
        this._blackPixel.width = this.game.width;
        this._blackPixel.height = this.game.height;
        this._blackPixel.scale.set(this.scale.x * 10000);
    }

    public destroy(): void
    {
        super.destroy(true);

        if (this._backToMenuButton) { this._backToMenuButton.destroy(); }
        this._backToMenuButton = null;

        if (this._resetButton) { this._resetButton.destroy(); }
        this._resetButton = null;

        if (this._titleText) { this._titleText.destroy(true); }
        this._titleText = null;

        if (this._menuBackground) { this._menuBackground.destroy(true); }
        this._menuBackground = null;

        if (this._blackPixel) { this._blackPixel.destroy(true); }
        this._blackPixel = null;
    }
}
