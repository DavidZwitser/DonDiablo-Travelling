import 'phaser-ce';
import ImageButton from '../UI/ImageButton';
import TextButton from '../UI/TextButton';
import SaveData from '../BackEnd/SaveData';
import Menu from '../States/Menu';

export default class SettingPopup extends Phaser.Group
{
    private sfxButton: ImageButton;
    private musicButton: ImageButton;
    private qualityButton: TextButton;
    private closeButton: ImageButton;
    constructor(game: Phaser.Game, menuState: Menu)
    {
        super(game);

        this.closeButton = new ImageButton(this.game, -200, -150, 'exitbutton', 'exitbutton', () => {
            menuState.DisplaySetting(false);
        }, this);
        this.addChild(this.closeButton);

        this.sfxButton = new ImageButton(this.game, 0, -150, 'ui_ingame_button', '', this.toggleSFX, this);
        this.addChild(this.sfxButton);

        this.musicButton = new ImageButton(this.game, 0, 0, 'ui_ingame_button', '', this.toggleMusic, this);
        this.addChild(this.musicButton);

        this.qualityButton = new TextButton(this.game, 0, 150, '', {font: '50px',
        fill: '#fff',
        align: 'center' }, this.toggleQuality, this, 300, 100, 0x000000);
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
        this.musicButton.icon.frameName = SaveData.MusicMuted ? 'ui_icon_music_off' : 'ui_icon_music_on';
        this.qualityButton.label.text = SaveData.Quality ? 'quality: high' : 'quality: low';
    }
}
