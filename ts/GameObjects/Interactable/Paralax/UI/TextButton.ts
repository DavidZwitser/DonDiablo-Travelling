import 'phaser-ce';
import Atlases from '../../../../Data/Atlases';

export default class TextButton extends Phaser.Button
{
    public label: Phaser.BitmapText;
    constructor(game: Phaser.Game, x: number, y: number, text: string, fontSize: number, imageKey: string, callback: Function, callbackContext: any)
    {
        super(game, x, y, Atlases.Interface, callback, callbackContext, imageKey, imageKey, imageKey);
        this.anchor.set(.5);

        this.label = new Phaser.BitmapText(game, 0, 0, 'myfont', text, fontSize);
        this.label.anchor.set(.5);
        this.label.align = 'center';

        this.addChild(this.label);
    }
}
