import 'phaser-ce';

import PerspectiveRenderer from '../PerspectiveRenderer';

/** A sprite that get's rendered by the pseudo3d renderer */
export default class PerspectiveObject extends Phaser.Group
{
    private _zPos: number;
    private _xPos: number;
    private _yPos: number;

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer, xPos: number, yPos: number)
    {
        super(game);
        renderer.addObject(this);

        this._zPos = 1;
        this._xPos = xPos;
        this._yPos = yPos;
    }

    /** What z position the sprite is currently on */
    public get zPos(): number
    {
        return this._zPos;
    }
    public set zPos(value: number)
    {
        this._zPos = value;
    }

    /** What x position the sprite is currently on */
    public get xPos(): number
    {
        return this._xPos;
    }
    public set xPos(value: number)
    {
        this._xPos = value;
    }

    /** What y position the sprite is currently on */
    public get yPos(): number
    {
        return this._yPos;
    }
    public set yPos(value: number)
    {
        this._yPos = value;
    }
}
