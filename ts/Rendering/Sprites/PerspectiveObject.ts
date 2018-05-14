import 'phaser-ce';

import PerspectiveRenderer from '../PerspectiveRenderer';
import { Lanes, laneToPerspectivePosition } from '../../Enums/Lanes';

/** A sprite that get's rendered by the pseudo3d renderer */
export default class PerspectiveObject extends Phaser.Group
{
    protected sprite: Phaser.Sprite;

    private _zPos: number;
    private _xPos: number;
    private _yPos: number;

    private _lane: Lanes = Lanes.bottomCenterLane;

    public positionShouldBeUpdated: boolean = true;

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer, xPos: number, yPos: number)
    {
        super(game);
        renderer.addObject(this);

        this._zPos = 0;
        this._xPos = xPos;
        this._yPos = yPos;
    }

    public get lane(): Lanes
    {
        return this._lane;
    }
    public set lane(lane: Lanes)
    {
        let targetPosition: {x: number, y: number} = laneToPerspectivePosition(lane);

        this.xPos = targetPosition.x;
        this.yPos = targetPosition.y;

        this._lane = lane;
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
        if (this.sprite) { this.sprite.anchor.set(.5, value > 0 ? 1 : 0); }

        this._yPos = value;
        this.positionShouldBeUpdated = true;
    }
}
