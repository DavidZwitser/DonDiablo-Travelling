import PerspectiveObject from './PerspectiveObject';
import PlayerCollisionChecker from '../../Systems/PlayerCollisionChecker';
import PerspectiveRenderer from '../PerspectiveRenderer';

/** A sprite that get's rendered in a perspective and has the ability to react to music */
export default abstract class ReactivePerspectiveObject extends PerspectiveObject
{
    private _reactTween: Phaser.Tween;

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer, setUpReactingAtStart: boolean = true)
    {
        super(game, renderer);

        if (setUpReactingAtStart === true) { this.setupReacting(); }
    }

    public setupReacting(): void
    {
        PlayerCollisionChecker.getInstance().onColliding.add(this.react, this);

    }

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

    public destroy(): void
    {
        super.destroy(true);

        PlayerCollisionChecker.getInstance().onColliding.remove(this.react, this);
    }
}
