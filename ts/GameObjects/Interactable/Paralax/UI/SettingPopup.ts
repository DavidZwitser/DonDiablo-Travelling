import 'phaser-ce';
import ImageButton from '../UI/ImageButton';
import SlideBar from './SlideBar';
import SaveData from '../../../../BackEnd/SaveData';
import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';

/** The settings menu popup */
export default class SettingPopup extends Phaser.Group
{
    /** The title of the settings */
    private _titleText: Phaser.BitmapText;

    /** The backdrop for the buttons and text */
    private _backdrop: Phaser.Sprite;

    /** The button which you can click to go back */
    private _backToMenuButton: ImageButton;

    /** Text displaying the sfx text */
    private _sfxText: Phaser.BitmapText;
    /** The slider for changing the sfx */
    private _sfxSlider: SlideBar;

    /** Text displaying the quality */
    private _quallityText: Phaser.BitmapText;
    /** The slider for changing the quality */
    private _qualitySlider: SlideBar;

    //signals
    public onBack: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game);

        /* Setting up back signal */
        this.onBack = new Phaser.Signal();

        /* Creating settings backdrop */
        this._backdrop = new Phaser.Sprite(game, 0, 0, Atlases.INTERFACE, 'Pausemenu_Background');
        this._backdrop.anchor.set(.5);
        this.addChild(this._backdrop);

        /* Creating title text */
        this._titleText = new Phaser.BitmapText(game, 0, -150, 'myfont', 'Settings', 50);
        this._titleText.tint = 0xffffff;
        this._titleText.anchor.set(0.5);
        this.addChild(this._titleText);

        /* Creating sfx text */
        this._sfxText = new Phaser.BitmapText(game, 0 , -50, 'myfont', 'SFX', 40);
        this._sfxText.tint = 0xffffff;
        this._sfxText.anchor.set(0.5);
        this.addChild(this._sfxText);

        /* Creating the sfx slider */
        this._sfxSlider = new SlideBar(this.game, SaveData.SFX_VOLUME, () => {
            SaveData.SFX_VOLUME = this._sfxSlider.value;
        });
        this._sfxSlider.x = 0;
        this._sfxSlider.y = 0;
        this.addChild(this._sfxSlider);

        /* Creating the quality text */
        this._quallityText = new Phaser.BitmapText(game, 0 , 80, 'myfont', 'Quality', 40);
        this._quallityText.tint = 0xffffff;
        this._quallityText.anchor.set(0.5);
        this.addChild(this._quallityText);

        /* Creating the quality slider */
        this._qualitySlider = new SlideBar(this.game, SaveData.QUALITY, () => {
            SaveData.QUALITY = this._qualitySlider.value;
        });
        this._qualitySlider.x = 0;
        this._qualitySlider.y = 130;
        this.addChild(this._qualitySlider);

        /* Creating the back button */
        this._backToMenuButton = new ImageButton(this.game, -200, 300, AtlasImages.EXIT_BUTTON, 'UserInterface_Menu_ContinueButton', () => {
            this.onBack.dispatch();
        }, this);
        this._backToMenuButton.scale.x = -1;
        this.addChild(this._backToMenuButton);

        /* Hiding by default */
        this.visible = false;
    }

    public destroy(): void
    {
        super.destroy(true);

        if (this._titleText) { this._titleText.destroy(true); }
        this._titleText = null;

        if (this._backdrop) { this._backdrop.destroy(true); }
        this._backdrop = null;

        if (this._backToMenuButton) { this._backToMenuButton.destroy(); }
        this._backToMenuButton = null;

        if (this._sfxText) { this._sfxText.destroy(true); }
        this._sfxText = null;

        if (this._sfxSlider) { this._sfxSlider.destroy(); }
        this._sfxSlider = null;

        if (this._quallityText) { this._quallityText.destroy(true); }
        this._quallityText = null;

        if (this._qualitySlider) { this._qualitySlider.destroy(); }
        this._qualitySlider = null;
    }
}
