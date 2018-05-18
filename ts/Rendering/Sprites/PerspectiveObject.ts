import 'phaser-ce';

import PerspectiveRenderer from '../PerspectiveRenderer';
import { Lanes, LanesInfo, ILane } from '../../Enums/Lanes';

/** A sprite that get's rendered by the pseudo3d renderer */
export default class PerspectiveObject extends Phaser.Group
{
    protected sprite: Phaser.Sprite;

    private _zPos: number;
    private _xPos: number;
    private _yPos: number;

    private _lane: Lanes = Lanes.bottomCenterLane;

    public resizedScale: number = 1;
    public positionShouldBeUpdated: boolean = true;

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

        let desiredLane: ILane = LanesInfo.laneToILane(lane);

        /** Setting the lane to the closest enabled lane */
        this._lane = LanesInfo.perspectivePositionToRoundedLane(desiredLane.x, desiredLane.y);

        let targetPosition: {x: number, y: number} = LanesInfo.laneToILane(this._lane);

        this.yPos = targetPosition.y;
        this.xPos = this.yPos < 0 ? -targetPosition.x : targetPosition.x;

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
        this.resizedScale = this.game.width / GAME_WIDTH;
    }

    public updateObject(): void
    {
        //
    }
}
