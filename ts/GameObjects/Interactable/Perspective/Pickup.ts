import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';
import Atlases from '../../../Data/Atlases';
import Lanes from '../../../Enums/Lanes';

/** A pickup you can pickup */
export default class Pickup extends ReactivePerspectiveObject
{
    private _sprite: Phaser.Sprite;
    private _lanePosition: Lanes;
    constructor(game: Phaser.Game, lanePos: Lanes) {
        super(game);

        this._lanePosition = lanePos;

        //art assigning
        this._sprite = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Hex_Coins');
        this._sprite.anchor.set(.5);
        this.addChild(this._sprite);

        //TODO: remove this
        console.log(this._lanePosition);
    }

    public reactToMusic(): void
    {
        //
    }

    //called when state is shutted down
    public destroy(): void {
        this.destroy();
        this._sprite.destroy();
        this._sprite = null;
        this._lanePosition = null;
    }
}
