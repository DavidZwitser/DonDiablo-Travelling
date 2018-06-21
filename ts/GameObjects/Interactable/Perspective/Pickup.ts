import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';
import Atlases from '../../../Data/Atlases';
import { Lanes } from '../../../Enums/Lanes';
import PerspectiveRenderer from '../../../Rendering/PerspectiveRenderer';
import Constants from '../../../Data/Constants';

import PlayerCollisionChecker from '../../../Systems/PlayerCollisionChecker';

/** A pickup you can pickup */
export default class Pickup extends ReactivePerspectiveObject
{

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game, renderer);
         //art assigning
        this.sprite = new Phaser.Sprite(game, 0, 0, Atlases.INTERFACE, 'laying hexagon');
        this.addChild(this.sprite);
        this.constructSprite();
    }


    private constructSprite(): void
    {
         this.checkSecret();
    }

    private checkSecret(): void
    {
        if (Constants.HEX_COLLECTED)
        {
            this.sprite.tint = 0xff0000;
        }
    }

    /** Tell the collision class that it should check if the pickup is colliding with the player */
    private initiateCollision(): void
    {
        let collissionResult: number = PlayerCollisionChecker.getInstance().isCollidingLanes(this.lane);

        if (collissionResult === 0) { return; }

        this.visible = false;
        //Colision events go here
    }

    /** React to music */
    public react(): void
    {
        super.react(1.2);
    }

    /** The internal update loop used for updating its logic */
    public update(): void
    {
        if (this.visible === false) { return; }

        /** If it is out of the screen, hide it */
        if (this.scale.y < 0)
        {
            //out of screen/field of view (FOV)
            this.visible = false;
            // Call the "I am hidng" event
            PlayerCollisionChecker.getInstance().onMissing.dispatch();
        }

        /** If it is on a z position where it could be colliding, call that event */
        if (this.zPos > Constants.PLAYER_Z_POSITION - .2 && this.zPos < Constants.PLAYER_Z_POSITION + .2)
        {
            this.initiateCollision();
        }
    }

    public changeLane( lane: Lanes, overwriteOldPosition: boolean = false): Phaser.Signal
    {
        let changeLaneTweenOnComplete: Phaser.Signal = super.changeLane(lane, overwriteOldPosition);

        if (!changeLaneTweenOnComplete) { return; }

        changeLaneTweenOnComplete.addOnce( () => {
            this.changeSprite();
        });

        return changeLaneTweenOnComplete;
    }
    /** Updates the sprite to match it surroundings */
    public changeSprite(): void {
        if (this.lane === Lanes.topCenterLane || this.lane === Lanes.bottomCenterLane)
        {
            this.sprite.frameName = 'laying hexagon';
        } else if (this.lane === Lanes.topRightLane || this.lane === Lanes.bottomRightLane)
        {
            this.sprite.frameName = 'laying hexagon_side';
        } else
        {
            this.sprite.frameName = 'laying hexagon_side';
            this.sprite.scale.x = -this.sprite.scale.x;
        }
    }

    /** Update the position of the pickup */
    public updatePosition(): void
    {
        this.zPos -= Constants.DELTA_TIME * Constants.GLOBAL_SPEED;
    }

}
