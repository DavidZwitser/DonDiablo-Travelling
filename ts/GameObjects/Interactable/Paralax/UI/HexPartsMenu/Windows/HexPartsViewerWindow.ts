import Atlases from '../../../../../../Data/Atlases';

/** A generic window for showing hex information */
export default class Window extends Phaser.Sprite
{
    /** The button that closes the window */
    private _closeButton: Phaser.Button;
    /** When the window close button is clicked */
    public onWindowClose: Phaser.Signal;

    /** The name of the current content */
    protected contentName: Phaser.BitmapText;

    /** All the tweens used in the window */
    protected tweens: Phaser.Tween[];

    constructor(game: Phaser.Game, contentName: string, frame: string)
    {
        super(game, 0, 0, Atlases.INTERFACE, frame);

        /** Setting tweens to a value */
        this.tweens = [];

        /** Close singnal */
        this.onWindowClose = new Phaser.Signal();

        /** Setting up close button */
        this._closeButton = new Phaser.Button(
            this.game, 0, 0,
            Atlases.INTERFACE,
            this.onCloseButtonPressed.bind(this), this,
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

    /** Animate the window elements */
    public animateWindow(targetScale: number, duration: number): Phaser.Tween
    {
        /* Clear all the tweens to prevent them from interfearing with eachother */
        this.clearAllTweens();

        /* Fading in/out the window title */
        let contentHideTween: Phaser.Tween = this.game.add.tween(this.contentName)
            .to({alpha: targetScale}, duration, Phaser.Easing.Cubic.Out)
            .start();

        /* Adding it to the tween array */
        this.tweens.push(contentHideTween);

        return contentHideTween;
    }

    /** Stop and destroy all the tweens */
    protected clearAllTweens(): void
    {
        for (let i: number = this.tweens.length; i--; )
        {
            let tween: Phaser.Tween = this.tweens[i];

            tween.stop(true);
            tween = null;
        }
    }

    /** When the close button is pressed */
    private  onCloseButtonPressed(): void
    {
        this.onWindowClose.dispatch();
    }

    /** Resize all its elements */
    public resize(): void
    {
        this._closeButton.x = this.width * .5;
        this._closeButton.y = -this.height * .46;

        this.contentName.x = 0;
        this.contentName.y = -this.height * .44;
    }

    /** Destroy all its elements */
    public destroy(): void
    {
        super.destroy(true);

        /* Close button */
        if (this._closeButton) { this._closeButton.destroy(true); }
        this._closeButton = null;

        /* Content name */
        if (this.contentName) { this.contentName.destroy(true); }
        this.contentName = null;

        /* Window close signal */
        if (this.onWindowClose) { this.onWindowClose.removeAll(); }
        this.onWindowClose = null;

        /* All tweens */
        if (this.tweens) { this.clearAllTweens(); }
        this.tweens = null;
    }

}
