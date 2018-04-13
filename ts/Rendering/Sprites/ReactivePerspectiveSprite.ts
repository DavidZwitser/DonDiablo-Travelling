import PerspectiveSprite from './PerspectiveSprite';

/** A sprite that get's rendered in a perspective and has the ability to react to music */
export default abstract class ReactivePerspectiveSprite extends PerspectiveSprite
{
    public abstract reactToMusic( positiveness: number): void;
}
