import 'phaser-ce';

import PerspectiveRenderer from '../PerspectiveRenderer';
import { Lanes, ILane, LaneConverter, LaneIndexer } from '../../Enums/Lanes';

/** A sprite that get's rendered by the pseudo3d renderer */
export default class PerspectiveObject extends Phaser.Group
{
    protected sprite: Phaser.Sprite;

    private _zPos: number;
    private _xPos: number;
    private _yPos: number;

    protected _lane: Lanes = Lanes.bottomCenterLane;

    private _resizedScale: number = 1;
    public positionShouldBeUpdated: boolean = true;

    private laneTween: Phaser.Tween;
    private rotationTween: Phaser.Tween;

    public changingLane: boolean = false;

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game);
        renderer.addObject(this);
    }

    public get lane(): Lanes
    {
        return this._lane;
    }
    public set lane(lane: Lanes)
    {
        if (lane === Lanes.none)
        {
            this.visible = false;
        }

        let desiredLane: ILane = LaneIndexer.LANE_TO_ILANE(lane);

        /** Setting the lane to the closest enabled lane */
        this._lane = LaneConverter.PERSPECTIVE_POSITION_TO_CLOSEST_LANE(desiredLane.x, desiredLane.y);

        let targetPosition: {x: number, y: number} = LaneIndexer.LANE_TO_ILANE(this._lane);

        this.yPos = targetPosition.y;
        this.xPos = targetPosition.x;

        this.changingLane = false;

    }

    /** Reset lane, so the object moves to the nearest lane (used when a new lane is added). */
    public reposition(): void
    {
        this.changeLane(this.lane, true);
    }

    public changeLane( lane: Lanes, overwriteOldPosition: boolean = false ): void
    {
        //only move when the lane is different that its own lane
        if (this._lane === lane && overwriteOldPosition === false || this.changingLane === true)
        {
            return;
        }

        console.log('changing lane');

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

        //canceling the tween if they are running
        if (this.laneTween) {
            if (this.laneTween.isRunning) {
                this.laneTween.pause();
            }
        }
        if (this.rotationTween) {
            if (this.rotationTween.isRunning) {
                this.rotationTween.pause();
            }
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

        this.changingLane = true;
    }

    private laneEnd(lane: Lanes ): void
    {
        this.lane = lane;
    }

    /** The object's scale, indipendent of the renderer. Use this to change the scale without interfearing with the perspective rendering */
    public set scaleMultiplier(newSize: number)
    {
        this._resizedScale = newSize;

        this.positionShouldBeUpdated = true;
    }

    public get scaleMultiplier(): number
    {
        return this._resizedScale;
    }

    /** What z position the sprite is currently on */
    public get zPos(): number
    {
        return this._zPos;
    }
    public set zPos(value: number)
    {
        this._zPos = value;
        this.positionShouldBeUpdated = true;
    }

    /** What x position the sprite is currently on */
    public get xPos(): number
    {
        return this._xPos;
    }
    public set xPos(value: number)
    {
        this._xPos = value;
        this.positionShouldBeUpdated = true;
    }

    /** What y position the sprite is currently on */
    public get yPos(): number
    {
        return this._yPos;
    }
    public set yPos(value: number)
    {
        this._yPos = value;

        if (this.sprite)
        {
            this.sprite.anchor.set(.5, 1);
            this.sprite.rotation = value > 0 ? 0 : Math.PI;
        }

        this.positionShouldBeUpdated = true;
    }

    public resize(): void
    {
        this.positionShouldBeUpdated = true;
        this.scaleMultiplier = this.game.width / GAME_WIDTH;
    }

    public updatePosition(): void
    {
        //
    }

    public destroy(destroyChildren: boolean = true): void
    {
        super.destroy(destroyChildren);

        if (this.rotationTween) { this.rotationTween.pause(); }
        this.rotationTween = null;

        if (this.laneTween) { this.laneTween.pause(); }
        this.laneTween = null;

        if (this.sprite) { this.sprite.destroy(true); }
        this.sprite = null;
    }
}
