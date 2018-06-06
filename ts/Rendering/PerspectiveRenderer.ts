import Renderer from './Renderer';
import PerspectiveObject from './Sprites/PerspectiveObject';
import Constants from '../Data/Constants';

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
    /** Render (position) the sprites in pseudo3d way */
    public render(): void
    {
        this.forEachObject(this.transformObject, this);
    }

    /** Update (position) the sprites in pseudo3d way */
    public updatePosition(): void
    {
        this.forEachObject(this.updateObject, this);
    }

    /** Apply transition to an object. */
    private transformObject(object: PerspectiveObject): void
    {
        if (object.positionShouldBeUpdated === false) { return; }
        object.positionShouldBeUpdated = false;

        let targetTransform: IScreenTransform = PerspectiveRenderer.worldToScreenPosition(this.game, object.xPos, object.yPos, object.zPos);

        object.scale.set(targetTransform.scale * object.scaleMultiplier);
        object.position.set(targetTransform.x, targetTransform.y);
    }

    private updateObject(object: PerspectiveObject): void {
        if (object.visible) {
            object.updatePosition();
        }
    }

    public resize(): void
    {
        this.forEachObject((child: PerspectiveObject) => { child.resize(); }, this );
    }

    /** Give a world position and get a screen position back. */
    public static worldToScreenPosition(
        game: Phaser.Game,
        xPos: number,
        yPos: number,
        zPos: number
    ): IScreenTransform
    {
        /* THE equation, calculating the perspective effect */
        return {
            x: Constants.HORIZON_POSITION.x * game.width + (xPos / zPos) * game.width,
            y: Constants.HORIZON_POSITION.y * game.height + (yPos / zPos) * game.height,
            scale: (1 / zPos) * 1.5
        };
    }
}
