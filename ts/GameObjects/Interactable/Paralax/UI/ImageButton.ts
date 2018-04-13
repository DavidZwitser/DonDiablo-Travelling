import 'phaser-ce';
import Atlases from '../../../../Data/Atlases';

export default class ImageButton extends Phaser.Button
{
    public icon: Phaser.Sprite;
    constructor(game: Phaser.Game, x: number, y: number, backdropFrameName: string, iconFrameName: string, callback: Function, callbackContext: any)
    {
        super(game, x, y, Atlases.Interface, callback, callbackContext, backdropFrameName, backdropFrameName);
        this.anchor.set(.5);

        this.icon = new Phaser.Sprite(game, 0, 0, Atlases.Interface, iconFrameName);
        this.icon.anchor.set(.5);
        this.addChild(this.icon);
    }
}
