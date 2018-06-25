import 'phaser-ce';
import Atlases from '../../../../Data/Atlases';
import SoundManager from '../../../../Systems/Sound/SoundManager';
import Sounds from '../../../../Data/Sounds';

/** A button with a variable icon and a backdrop */
export default class ImageButton extends Phaser.Button
{
    /** The icon of the button */
    public icon: Phaser.Sprite;

    constructor(game: Phaser.Game, x: number, y: number, backdropFrameName: string, iconFrameName: string, callback: Function, callbackContext: any)
    {
        /* Creating the button with the backdrop as framename */
        super(game, x, y, Atlases.INTERFACE, callback, callbackContext, backdropFrameName, backdropFrameName);
        this.anchor.set(.5);

        /* Setting up input */
        this.inputEnabled = true;
        this.events.onInputDown.add(() => {
            SoundManager.getInstance().play(Sounds.UI_CLICK);
        });

        /* Adding icon */
        this.icon = new Phaser.Sprite(game, 0, 0, Atlases.INTERFACE, iconFrameName);
        this.icon.anchor.set(.5);
        this.addChild(this.icon);
    }

    public destroy(): void
    {
        super.destroy(true);

        if (this.icon) { this.icon.destroy(true); }
        this.icon = null;
    }

}
