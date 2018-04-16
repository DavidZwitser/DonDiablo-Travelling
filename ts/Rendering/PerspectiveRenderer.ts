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
    private _horizonPoint: Phaser.Point;
    private _depthOfField: number;

    constructor(game: Phaser.Game)
    {
        super(game);

        this._depthOfField = .96;
        this._horizonPoint = new Phaser.Point(.5, .45);
    }

    /** Render the sprites in pseudo3d way */
    public render(): void
    {
        this.forEachObject(this.eachObject, this);
    }

    private eachObject(object: PerspectiveObject): void
    {
        let targetTransform: IScreenTransform = this.screenToWorldPosition(object.xPos, object.zPos);
    }

    public screenToWorldPosition(xPos: number, zPos: number): IScreenTransform
    {

        let perspectiveOffset: number = this._horizonPoint.y / zPos;

        let projectedX: number = (this._horizonPoint.x + xPos * perspectiveOffset) * this.game.width;
        let projectedY: number = (this._horizonPoint.y + (1 - this._horizonPoint.y) * perspectiveOffset) * this.game.height;
        let projectedScale: number = perspectiveOffset;

        return {
            x: projectedX,
            y: projectedY,
            scale: projectedScale
        };
    }
}
