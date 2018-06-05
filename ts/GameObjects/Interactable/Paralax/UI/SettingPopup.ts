import 'phaser-ce';
import ImageButton from '../UI/ImageButton';
import SlideBar from './SlideBar';
import SaveData from '../../../../BackEnd/SaveData';
import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';

export default class SettingPopup extends Phaser.Group
{

    //lay out
    private settingBackdrop: Phaser.Sprite;

    //buttons
    private backToMenuButton: ImageButton;

    private _sfxText: Phaser.BitmapText;
    private _sfxSlider: SlideBar;

    private quallityText: Phaser.BitmapText;
    private qualitySlider: SlideBar;

    private _titleText: Phaser.BitmapText;

    //signals
    public onBack: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.onBack = new Phaser.Signal();

        this.settingBackdrop = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Pausemenu_Background');
        this.settingBackdrop.anchor.set(.5);
        this.addChild(this.settingBackdrop);

        this._titleText = new Phaser.BitmapText(game, 0, -150, 'ailerons', 'Settings', 50);
        this._titleText.tint = 0xffffff;
        this._titleText.anchor.set(0.5);
        this.addChild(this._titleText);

        this._sfxText = new Phaser.BitmapText(game, 0 , -50, 'futura', 'SFX', 40);
        this._sfxText.tint = 0xffffff;
        this._sfxText.anchor.set(0.5);
        this.addChild(this._sfxText);

        this._sfxSlider = new SlideBar(this.game, SaveData.SFX_VOLUME, () => {
            SaveData.SFX_VOLUME = this._sfxSlider.value;
        });
        this._sfxSlider.x = 0;
        this._sfxSlider.y = 0;
        this.addChild(this._sfxSlider);

        this.quallityText = new Phaser.BitmapText(game, 0 , 80, 'futura', 'Quality', 40);
        this.quallityText.tint = 0xffffff;
        this.quallityText.anchor.set(0.5);
        this.addChild(this.quallityText);

        this.qualitySlider = new SlideBar(this.game, SaveData.Quality, () => {
            SaveData.Quality = this.qualitySlider.value;
        });
        this.qualitySlider.x = 0;
        this.qualitySlider.y = 130;
        this.addChild(this.qualitySlider);

        this.backToMenuButton = new ImageButton(this.game, -200, 300, AtlasImages.Exit_Button, 'UserInterface_Menu_ContinueButton', () => {
            this.onBack.dispatch();
        }, this);
        this.backToMenuButton.scale.x = -1;
        this.addChild(this.backToMenuButton);

        this.visible = false;
    }
}
