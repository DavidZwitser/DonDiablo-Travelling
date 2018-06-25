import 'phaser-ce';

import BasePopUp from './BasePopUp';
import ImageButton from './ImageButton';

export default class HexScreen extends BasePopUp
{
    /** The text that shows the highscore */
    private _hexText: Phaser.BitmapText;

    private _closeButton: ImageButton;

    public onResume: Phaser.Signal;

    constructor(game: Phaser.Game, scale: number)
    {
        super(game, scale);

        this._titleText.text = 'Unlocked';

        this.onResume = new Phaser.Signal();

        this._hexText = new Phaser.BitmapText(game, 0 , -50, 'futura', '\n Unlocked New Song! \n "Starlight"', 40);
        this._hexText.tint = 0xffffff;
        this._hexText.anchor.set(0.5);
        this._hexText.scale.set(scale, scale);

        this._closeButton = new ImageButton(this.game, 250, -150, 'UserInterface_Hex_Button_Cross', 'UserInterface_Hex_Button_Cross', () => {
            this.onResume.dispatch();
        }, this);

        this.addChild(this._hexText);
        this.addChild(this._closeButton);
    }

       /** The hex screen gets displayed */
       public show(): void
       {
           this.visible = true;
       }

       /** T The hex screen is hidden */
       public hide(): void
       {
           this.visible = false;
       }

    public destroy(): void
    {
        super.destroy();

        if (this.onResume) {
            this.onResume.removeAll();
        }
        this.onResume = null;

        if (this._hexText) { this._hexText.destroy(true); }
        this._hexText = null;
    }

}
