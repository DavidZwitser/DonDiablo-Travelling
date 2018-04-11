import 'phaser-ce';

export default class TextButton extends Phaser.Button 
{
    private label: Phaser.Text;
    private maxWidth: number;
    private maxHeight: number;
    constructor(game: Phaser.Game, x: number, y: number, text: string, textStyle: any, callback: Function, callbackContext: any, maxWidth?: number, maxHeight?: number, bgColor?: number) 
    {
        super(game, x, y, '', callback, callbackContext);
        this.maxHeight = maxHeight;
        this.maxWidth = maxWidth;
        this.anchor.set(.5);
        this.label = new Phaser.Text(game, 0, 0, text, textStyle);
        this.label.anchor.set(.5);
        this.addChild(this.label);
        this.game.add.existing(this);
        this.createTexture(bgColor);
    }

    public createTexture(bgColor: number): void {
        //Create a texture with shadow and use it as the texture of the button.
        let graphics: Phaser.Graphics = this.game.make.graphics(0, 0);
        graphics.beginFill(0x000000, 0.3)
            .drawRoundedRect(5, 5 , this.maxWidth - 10 , this.maxHeight, 15)
            .beginFill(bgColor)
            .drawRoundedRect(0, 0, this.maxWidth, this.maxHeight, 15)
            .lineStyle(3, 0xffffff)
            .drawRoundedRect(0, 0, this.maxWidth - 2, this.maxHeight - 2, 15)
            .endFill();
        this.texture = graphics.generateTexture();

        graphics.destroy(true);
    }
}

interface IRenderer<T extends Phaser.Sprite>
{
    addSprite(child: T): void;
}