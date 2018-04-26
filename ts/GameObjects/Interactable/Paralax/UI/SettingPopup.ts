import 'phaser-ce';
import ImageButton from '../UI/ImageButton';
import TextButton from '../UI/TextButton';
import SaveData from '../../../../BackEnd/SaveData';
import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';

export default class SettingPopup extends Phaser.Group
{

    //lay out
    private settingHeader: Phaser.Sprite;
    private settingBackdrop: Phaser.Sprite;

    //buttons
    private sfxButton: ImageButton;
    //private musicButton: ImageButton;
    private qualityButton: TextButton;
    private backToMenuButton: ImageButton;
    private playButton: ImageButton;

    //signals
    public onBack: Phaser.Signal;
    public onPlay: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.onBack = new Phaser.Signal();
        this.onPlay = new Phaser.Signal();

        this.settingHeader = new Phaser.Sprite(game, 0, -200, Atlases.Interface, AtlasImages.Setting_Header);
        this.settingHeader.anchor.set(.5);
        this.addChild(this.settingHeader);

        this.settingBackdrop = new Phaser.Sprite(game, 0, 0, Atlases.Interface, AtlasImages.Setting_Overlay);
        this.settingBackdrop.anchor.set(.5);
        this.addChild(this.settingBackdrop);

        this.backToMenuButton = new ImageButton(this.game, -100, 100, AtlasImages.Exit_Button, AtlasImages.Exit_Button, () => {
            this.onBack.dispatch();
        }, this);
        this.addChild(this.backToMenuButton);

        this.playButton = new ImageButton(this.game, 100, 100, 'play', 'play', () => {
            this.onPlay.dispatch();
        }, this);
        this.addChild(this.playButton);

        this.sfxButton = new ImageButton(this.game, 0, -80, 'ui_ingame_button', '', this.toggleSFX, this);
        this.sfxButton.scale.set(.6);
        this.addChild(this.sfxButton);

        //this.musicButton = new ImageButton(this.game, 0, 0, 'ui_ingame_button', '', this.toggleMusic, this);
        //this.addChild(this.musicButton);

        this.qualityButton = new TextButton(this.game, 0, 0, '', 40, 'button_menu', this.toggleQuality, this);
        this.qualityButton.scale.set(.5);
        this.addChild(this.qualityButton);

        this.visible = false;
        this.updateButtons();
    }

    public toggleSFX(): void {
        SaveData.SFXMuted = !SaveData.SFXMuted;
        this.updateButtons();
    }

    public toggleMusic(): void {
        SaveData.MusicMuted = !SaveData.MusicMuted;
        this.updateButtons();
    }

    public toggleQuality(): void {
        SaveData.Quality = SaveData.Quality === 0 ? 1 : 0;
        this.updateButtons();
    }

    private updateButtons(): void {
        this.sfxButton.icon.frameName = SaveData.SFXMuted ? 'ui_icon_sfx_off' : 'ui_icon_sfx_on';
        //this.musicButton.icon.frameName = SaveData.MusicMuted ? 'ui_icon_music_off' : 'ui_icon_music_on';
        this.qualityButton.label.text = SaveData.Quality ? 'quality: high' : 'quality: low';
    }
}
