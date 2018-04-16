import PerspectiveObject from './PerspectiveObject';

/** A sprite that get's rendered in a perspective and has the ability to react to music */
export default abstract class ReactivePerspectiveObject extends PerspectiveObject
{
    public abstract reactToMusic( positiveness: number): void;
}
