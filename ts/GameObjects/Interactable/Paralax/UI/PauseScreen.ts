import 'phaser-ce';
import BasePopUp from './BasePopUp';
import SlideBar from './SlideBar';
import ImageButton from './ImageButton';
import SaveData from '../../../../BackEnd/SaveData';

export default class PauseScreen extends BasePopUp
{
    /** The text that shows the highscore */
    private _sfxText: Phaser.BitmapText;
    private _sfxSlider: SlideBar;
    private _closeButton: ImageButton;

    public onResume: Phaser.Signal;

    public onContinue: Phaser.Signal;

    constructor(game: Phaser.Game, scale: number, buttonOffset: number, spaceBetweenButtons: number)
    {
        super(game, scale, buttonOffset, spaceBetweenButtons);

        this._titleText.text = 'Pause';

        this.onResume = new Phaser.Signal();

        this._sfxText = new Phaser.BitmapText(game, 0 , -50, 'myfont', 'SFX', 40);
        this._sfxText.tint = 0xffffff;
        this._sfxText.anchor.set(0.5);
        this._sfxText.scale.set(scale, scale);

        this._sfxSlider = new SlideBar(this.game, SaveData.SFX_VOLUME, () => {
            SaveData.SFX_VOLUME = this._sfxSlider.value;
        });
        this._sfxSlider.x = 0;
        this._sfxSlider.y = 0;

        this._closeButton = new ImageButton(this.game, 250, -150, 'UserInterface_Hex_Button_Cross', 'UserInterface_Hex_Button_Cross', () => {
            this.onResume.dispatch();
        }, this);

        this.addChild(this._sfxText);
        this.addChild(this._sfxSlider);
        this.addChild(this._closeButton);
    }

    /** Update the highscore text */

    public destroy(): void
    {
        super.destroy();

        if (this.onResume) {
            this.onResume.removeAll();
        }
        this.onResume = null;

        if (this._sfxText) { this._sfxText.destroy(true); }
        this._sfxText = null;
    }

}
