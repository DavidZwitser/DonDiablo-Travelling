import Renderer from './Renderer';
import PerspectiveObject from './Sprites/PerspectiveObject';

/** The interface which describes a sprite's dimensions on the screen. */
interface IScreenTransform
{
    x: number;
    y: number;
    scale: number;
}

/** Renders sprites in a pseudo 3d way */
export default class PerspectiveRenderer extends Renderer<PerspectiveObject>
{
    /** The point at which the sprites aim to go */
    public horizonPoint: Phaser.Point;

    constructor(game: Phaser.Game, horizonPoint: Phaser.Point)
    {
        super(game);

        this.horizonPoint = horizonPoint;
    }

    /** Render (position) the sprites in pseudo3d way */
    public render(): void
    {
        this.forEachObject(this.transformObject, this);
    }

    /** Apply transition to an object. */
    private transformObject(object: PerspectiveObject): void
    {
        if (object.positionShouldBeUpdated === false) { return; }
        object.positionShouldBeUpdated = false;

        let targetTransform: IScreenTransform = this.screenToWorldPosition(object.xPos, object.zPos, object.yPos);

        object.scale.set(targetTransform.scale);
        object.position.set(targetTransform.x, targetTransform.y);
    }

    /** Give a world position and get a screen position back. */
    public screenToWorldPosition(xPos: number, zPos: number, yPos: number): IScreenTransform
    {
        let projectedPosision: number = 1 / Math.pow(2, zPos);

        return {
            x: this.horizonPoint.x * this.game.width + projectedPosision * xPos * this.game.width,
            y: this.horizonPoint.y * this.game.height + projectedPosision * yPos * this.game.height,
            scale: projectedPosision
        };
    }
}
