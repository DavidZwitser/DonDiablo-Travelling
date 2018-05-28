import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';
import Atlases from '../../../Data/Atlases';
import { Lanes } from '../../../Enums/Lanes';
import PerspectiveRenderer from '../../../Rendering/PerspectiveRenderer';
import Constants from '../../../Data/Constants';

import PlayerCollisionChecker from '../../../Systems/PlayerCollisionChecker';

/** A pickup you can pickup */
export default class Pickup extends ReactivePerspectiveObject
{
    private _reactTween: Phaser.Tween;

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

    private initiateCollision(): void
    {
        let collissionResult: number = PlayerCollisionChecker.getInstance().isCollidingLanes(this.lane);
        if (collissionResult)
        {
            this.visible = false;
            if (collissionResult === 1)
            {
                // console.log('puckup collect');
            }
            else {
                // console.log('puckup super collect');
            }
            //Colision events go here
        }
    }

    public react(): void
    {
        // if (Math.abs(this.zPos) > 4 || this.scale.x > .9) { return; }

        if (this._reactTween)
        {
            this._reactTween.stop();
            this._reactTween = null;
        }

        this._reactTween = this.game.add.tween(this)
            .to({scaleMultiplier: this.scaleMultiplier * 1.1}, 200, Phaser.Easing.Cubic.Out, true, 0, 0, true)
            .start();
    }

    public updateObject(): void
    {
        this.zPos -= Constants.DELTA_TIME * Constants.GLOBAL_SPEED;

        if (this.scale.y < 0) {
            //out of screen/field of view (FOV)
            this.visible = false;
            PlayerCollisionChecker.getInstance().onMissing.dispatch();
        }
        if (this.zPos > 1 && this.zPos < 1.4)
        {
            this.initiateCollision();
        }
    }

    //called when state is shutted down
    public destroy(): void {
        super.destroy();
        this.sprite.destroy();
        this.sprite = null;
    }
}
