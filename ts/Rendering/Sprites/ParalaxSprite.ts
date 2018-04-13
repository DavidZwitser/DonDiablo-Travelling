import 'phaser-ce';

/** A sprite that reacts to the paralax effect of the game */
export default class ParalaxSprite extends Phaser.Sprite
{
    private _offsetMultiplier: number;

    /** How much the sprite will get offset by the renderer */
    public get offsetMultiplier(): number
    {
        return this._offsetMultiplier;
    }
    public set offsetMultiplier(value: number)
    {
        this._offsetMultiplier = value;
    }
}
