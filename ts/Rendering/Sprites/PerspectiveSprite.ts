import 'phaser-ce';

/** A sprite that get's rendered by the pseudo3d renderer */
export default class PerspectiveSprite extends Phaser.Sprite
{
    private _zPos: number;

    /** What z position the sprite is currently on */
    public get zPos(): number
    {
        return this._zPos;
    }
    public set zPos(value: number)
    {
        this._zPos = value;
    }
}
