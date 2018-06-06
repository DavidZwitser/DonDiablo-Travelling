import 'phaser-ce';
import ImageButton from '../UI/ImageButton';
import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';

/** The credits screen */
export default class CreditsScreen extends Phaser.Group
{
    /** The backdrop */
    private _creditsBackdrop: Phaser.Sprite;

    /** The header text */
    private _headerText: Phaser.BitmapText;
    /** The text displaying the actual credits */
    private _creditsText: Phaser.BitmapText;

    /** The button for leaving this menu */
    private _backButton: ImageButton;

    constructor(game: Phaser.Game, callback: Function)
    {
        super(game);

        /* Setting up the backdrop */
        this._creditsBackdrop = new Phaser.Sprite(game, 0, 0, Atlases.INTERFACE, 'UserInterface_Credits_Background');
        this._creditsBackdrop.anchor.set(.5);
        this.addChild(this._creditsBackdrop);

        /* Setting up the header text */
        this._headerText =  new Phaser.BitmapText(game, 0, -510, 'myfont', 'Credits', 60);
        this._headerText.tint = 0xffffff;
        this._headerText.anchor.set(.5);
        this.addChild(this._headerText);

        /* Setting up the credits text */
        this._creditsText =  new Phaser.BitmapText(game, 0, 0, 'myfont', '', 40);
        this._creditsText.tint = 0xffffff;
        this._creditsText.anchor.set(.5);
        this.addChild(this._creditsText);
        /* Filling in the credits text, text */
        this._creditsText.text = 'Art Director\n Bo Schutte\n\nDigital Artists\n Jidske Donkersloot\n Amber Kalverboer\n Amber Huiskes\n Eva Vrieze\n\nProgramming Director' +
        '\n Ferry Elbagdadi\n\nProgramming\n Sebastiaan Buwalda\n Nathan Nieuwenhuizen\n David Zwitser';

        /* Setting up the back button */
        this._backButton = new ImageButton(this.game, -228, 475, AtlasImages.Exit_Button, 'UserInterface_Menu_ContinueButton', () => {
            callback();
        }, this);
        this._backButton.scale.x = -1;
        this.addChild(this._backButton);

        /* Hiding it by default */
        this.visible = false;
    }

    public destroy(): void
    {
        super.destroy(true);

        if (this._creditsBackdrop) { this._creditsBackdrop.destroy(true); }
        this._creditsBackdrop = null;

        if (this._headerText) { this._headerText.destroy(true); }
        this._headerText = null;

        if (this._creditsText) { this._creditsText.destroy(true); }
        this._creditsText = null;

        if (this._backButton) { this._backButton.destroy(); }
        this._backButton = null;
    }
}
