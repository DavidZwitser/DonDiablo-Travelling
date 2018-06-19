import 'phaser-ce';
import Atlases from '../../../../Data/Atlases';
import SoundManager from '../../../../Systems/Sound/SoundManager';
import Sounds from '../../../../Data/Sounds';

/**
 * Phaser button with a bitmap text object at the center of the button.
 */
export default class TextButton extends Phaser.Button
{
    public label: Phaser.BitmapText;
    constructor(game: Phaser.Game, x: number, y: number, text: string, fontSize: number, imageKey: string, callback: Function, callbackContext: any)
    {
        super(game, x, y, Atlases.INTERFACE, callback, callbackContext, imageKey, imageKey, imageKey);
        this.anchor.set(.5);

        this.label = new Phaser.BitmapText(game, 0, 0, 'futura', text, fontSize);
        this.label.anchor.set(.5);
        this.label.align = 'center';

        this.addChild(this.label);

        this.inputEnabled = true;
        this.events.onInputDown.add(() => {
            SoundManager.getInstance().play(Sounds.UI_CLICK);
        });
    }
}
