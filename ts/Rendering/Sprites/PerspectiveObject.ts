import 'phaser-ce';

/** A sprite that get's rendered by the pseudo3d renderer */
export default class PerspectiveObject extends Phaser.Group
{
    private _zPos: number;
    private _xPos: number;

    /** What z position the sprite is currently on */
    public get zPos(): number
    {
        return this._zPos;
    }
    public set zPos(value: number)
    {
        if (this.zPos < 0) { return; }

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
}
