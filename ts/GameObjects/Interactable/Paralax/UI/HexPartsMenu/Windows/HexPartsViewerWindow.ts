import Atlases from '../../../../../../Data/Atlases';

export default class Window extends Phaser.Sprite
{
    private _closeButton: Phaser.Button;

    /** The name of the current content */
    protected contentName: Phaser.BitmapText;

    public onWindowClose: Phaser.Signal;

    protected tweens: Phaser.Tween[];

    constructor(game: Phaser.Game, contentName: string, frame: string)
    {
        super(game, 0, 0, Atlases.Interface, frame);

        this.tweens = [];

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

    public animateScale(targetScale: number, duration: number): Phaser.Tween
    {
        this.clearAllTweens();

        let contentHideTween: Phaser.Tween = this.game.add.tween(this.contentName)
            .to({alpha: targetScale}, duration, Phaser.Easing.Cubic.Out)
            .start();

        this.tweens.push(contentHideTween);

        return contentHideTween;
    }

    public onXButton(): void
    {
        this.onWindowClose.dispatch();
    }

    protected clearAllTweens(): void
    {
        for (let i: number = this.tweens.length; i--; )
        {
            let tween: Phaser.Tween = this.tweens[i];

            tween.stop(true);
            tween = null;
        }
    }

    public resize(): void
    {
        this._closeButton.x = this.width * .5;
        this._closeButton.y = -this.height * .46;

        this.contentName.x = 0;
        this.contentName.y = -this.height * .44;
    }

    public destroy(): void
    {
        if (this._closeButton) { this._closeButton.destroy(true); }
        this._closeButton = null;

        if (this.contentName) { this.contentName.destroy(true); }
        this.contentName = null;

        if (this.onWindowClose) { this.onWindowClose.removeAll(); }
        this.onWindowClose = null;

        this.clearAllTweens();
        this.tweens = null;
    }

}
