import { Lanes, LaneConverter, ILane, LaneIndexer } from '../../../Enums/Lanes';
import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';
import PerspectiveRenderer from '../../../Rendering/PerspectiveRenderer';
import Constants from '../../../Data/Constants';
import AtlasImages from '../../../Data/Atlases';

/** The player controlled by the user */
export default class Player extends ReactivePerspectiveObject
{
    public spine: any;
    public speed: number;
    public collectedPickup: Phaser.Signal;

    public static ANIMATION_DRIVE: string = 'drive';
    public static ANIMATION_TURN: string = 'turn';
    public static ANIMATION_LOSE: string = 'defeat';

    private laneTween: Phaser.Tween;
    private rotationTween: Phaser.Tween;

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game, renderer);

        this.sprite = new Phaser.Sprite(this.game, 0, 0, AtlasImages.Interface, 'Spacecraft_Main');
        this.addChild(this.sprite);

        this.zPos = Constants.PLAYER_Z_POSITION;

        this.lane = Lanes.bottomLeftLane;

       /*
       this.spine = new PhaserSpine.Spine(<PhaserSpine.SpineGame>(this.game), 'Character');
       this.addChild(this.spine);

        SPINE / ANIMATIONS TEMPORARILY DISABLED.
        NO ANIMATIONS AVAILABLE
      */
    }

    private setAnimation(animation: string, loop: boolean = false): void
    {
        this.spine.setAnimationByName(0, animation, loop);

        this.spine.onComplete.addOnce( () => { if (!loop) {
            this.setAnimation(Player.ANIMATION_DRIVE, true);
        }});
    }

    public turn(): void
    {
        this.setAnimation(Player.ANIMATION_TURN, false);
    }

    public lose(): void
    {
        this.setAnimation(Player.ANIMATION_LOSE, false);
    }

    public pause( pause: boolean): void
    {
        this.spine.autoUpdate = !pause;
    }

    /** Reset lane, so the player moves to the nearest lane (used when a new lane is added). */
    public reposition(): void
    {
        this.changeLane(this.lane);
    }

    public changeLane( lane: Lanes ): void
    {
        this.rotation = 0;
        let desiredLane: ILane = LaneIndexer.LANE_TO_ILANE(lane);
        /* So no tslint errors will be thrown */
        let targetPosition: {x: number, y: number} = LaneIndexer.LANE_TO_ILANE( LaneConverter.PERSPECTIVE_POSITION_TO_CLOSEST_LANE(desiredLane.x, desiredLane.y));
        let targetRotation: number;
        if (this.xPos > targetPosition.x)
        {
            targetRotation = - (Math.PI / 12);
        }
        else if (this.xPos < targetPosition.x)
        {
            targetRotation =  (Math.PI / 12);
        }
        else if (this.xPos === targetPosition.x)
        {
            targetRotation = 0;
        }
        if (this.yPos === -0.5)
        {
            targetRotation *= -1;
        }
        this.laneTween = this.game.add.tween(this)
            .to({xPos: targetPosition.x, yPos: targetPosition.y}, 100, Phaser.Easing.Cubic.InOut)
            .start();
        this.laneTween.onComplete.addOnce(() => this.laneEnd(lane), this);
        this.rotationTween = this.game.add.tween(this)
            .to({rotation: targetRotation}, 100, Phaser.Easing.Cubic.InOut, true)
            .start();
        this.rotationTween.onComplete.addOnce(() => {
            this.rotationTween = this.game.add.tween(this)
            .to({rotation: 0}, 500, Phaser.Easing.Cubic.InOut, true)
            .start();
        });

        // To quickly fix the tslint error
        this.rotationTween = this.rotationTween;
    }

    private laneEnd(lane: Lanes ): void
    {
        this.lane = lane;
    }
    public reactToMusic(): void
    {
        //
    }

    public destroy(): void
    {
        super.destroy(true);

        if (this.spine) { this.spine.destroy(true); }
        this.spine = null;

        if (this.rotationTween) { this.rotationTween.pause(); }
        this.rotationTween = null;

        if (this.laneTween) { this.laneTween.pause(); }
        this.laneTween = null;
    }
}
