import PerspectiveObject from './PerspectiveObject';
import PerspectiveRenderer from '../PerspectiveRenderer';

/** A group that get's rendered in a perspective and has the ability to react to music */
export default abstract class ReactivePerspectiveObject extends PerspectiveObject
{
    private _reactTween: Phaser.Tween;

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game, renderer);
    }

    /**
     * the object reacts by growing big and small
     * @param grothMultiplier the grow multiplier the object scale tweens to
     * @param duration how long the animation will last
     */
    public react(grothMultiplier: number = 1.1, duration: number = 200): void
    {
        if (this._reactTween)
        {
            this._reactTween.stop(true);
            this._reactTween = null;
        }

        let startScale: number = this.scaleMultiplier;

        this._reactTween = this.game.add.tween(this)
            .to({scaleMultiplier: this.scaleMultiplier * grothMultiplier}, duration, Phaser.Easing.Cubic.Out, true, 0, 0, true)
            .start();

        this._reactTween.onComplete.addOnce( () => {
            this.scaleMultiplier = startScale;
        });
    }

    /** Destroys the object and pauses the tweens */
    public destroy(): void
    {
        super.destroy(true);

        if (this._reactTween) { this._reactTween.stop(true); }
        this._reactTween = null;
    }
}
