import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';
import Atlases from '../../../Data/Atlases';
import { Lanes } from '../../../Enums/Lanes';
import PerspectiveRenderer from '../../../Rendering/PerspectiveRenderer';
import Constants from '../../../Data/Constants';

/** A pickup you can pickup */
export default class Pickup extends ReactivePerspectiveObject
{
    constructor(game: Phaser.Game, renderer: PerspectiveRenderer) {
        super(game, renderer);

        //art assigning
        this.sprite = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'laying hexagon');
        this.addChild(this.sprite);

    }

    public reset(lane: Lanes): void {
        this.lane = lane;
        this.position.set(0, 0);
    }

    public reactToMusic(): void
    {
        //
    }

    //called when state is shutted down
    public destroy(): void {
        super.destroy();
        this.sprite.destroy();
        this.sprite = null;
    }

    public updateObject(): void
    {
        this.zPos -= .014 * Constants.GLOBAL_SPEED;
        if (this.scale.y < 0) {
            //out of screen/field of view (FOV)
            this.visible = false;
        }
    }
}
