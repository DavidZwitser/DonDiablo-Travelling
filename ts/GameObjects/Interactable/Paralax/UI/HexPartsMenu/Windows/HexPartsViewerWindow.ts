import Atlases from '../../../../../../Data/Atlases';

export default class Window extends Phaser.Sprite
{
    private _closeButton: Phaser.Button;

    /** The name of the current content */
    protected contentName: Phaser.BitmapText;

    public onWindowClose: Phaser.Signal;

    constructor(game: Phaser.Game, contentName: string, frame: string)
    {
        super(game, 0, 0, Atlases.Interface, frame);

        this.onWindowClose = new Phaser.Signal();

        /** Close button */
        this._closeButton = new Phaser.Button(
            this.game, 0, 0,
            Atlases.Interface,
            this.onXButton.bind(this), this,
            'X_Knop',
            'X_Knop',
            'X_Knop',
            'X_Knop'
        );
        this._closeButton.anchor.set(1, 0);
        this.addChild(this._closeButton);

        /** Content name */
        this.contentName = new Phaser.BitmapText(this.game, 0, 0, 'myfont', contentName, 40);
        this.contentName.tint = 0xffffff;
        this.contentName.anchor.set(.5, 0);
        this.addChild(this.contentName);

    }

    public animateScale(targetScale: number, duration: number): Phaser.Signal
    {
        let contentHideTween: Phaser.Tween = this.game.add.tween(this.contentName)
            .to({alpha: targetScale}, duration, Phaser.Easing.Cubic.Out)
            .start();

        return contentHideTween.onComplete;
    }

    public onXButton(): void
    {
        this.onWindowClose.dispatch();
    }

    public resize(): void
    {
        this._closeButton.x = this.width * .5;
        this._closeButton.y = -this.height * .46;

        this.contentName.x = 0;
        this.contentName.y = -this.height * .44;
    }
}
