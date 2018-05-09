import Renderer from './Renderer';
import PerspectiveObject from './Sprites/PerspectiveObject';

interface IScreenTransform
{
    x: number;
    y: number;
    scale: number;
}

/** Renders sprites in a pseudo 3d way */
export default class PerspectiveRenderer extends Renderer<PerspectiveObject>
{
    public horizonPoint: Phaser.Point;

    constructor(game: Phaser.Game, horizonPoint: Phaser.Point)
    {
        super(game);

        this.horizonPoint = horizonPoint;
    }

    /** Render the sprites in pseudo3d way */
    public render(): void
    {
        this.forEachObject(this.eachObject, this);
    }

    private eachObject(object: PerspectiveObject): void
    {
        let targetTransform: IScreenTransform = this.screenToWorldPosition(object.xPos, object.zPos, object.yPos);

        object.scale.set(targetTransform.scale);
        object.position.set(targetTransform.x, targetTransform.y);
    }

    public screenToWorldPosition(xPos: number, zPos: number, yPos: number): IScreenTransform
    {
        let projectedPosision: number = 1 / (Math.pow(2, zPos));

        return {
            x: this.horizonPoint.x * this.game.width + projectedPosision * xPos * this.game.width,
            y: this.horizonPoint.y * this.game.height + projectedPosision * yPos * this.game.height,
            scale: projectedPosision
        };
    }
}
