import PerspectiveObject from './PerspectiveObject';
import PlayerCollisionChecker from '../../Systems/PlayerCollisionChecker';
import PerspectiveRenderer from '../PerspectiveRenderer';

/** A sprite that get's rendered in a perspective and has the ability to react to music */
export default abstract class ReactivePerspectiveObject extends PerspectiveObject
{
    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game, renderer);

        PlayerCollisionChecker.getInstance().onColliding.add(this.react, this);
    }

    protected abstract react( positiveness: number): void;

    public destroy(): void
    {
        super.destroy(true);

        PlayerCollisionChecker.getInstance().onColliding.remove(this.react, this);
    }
}
