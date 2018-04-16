import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';
import Atlases from '../../../Data/Atlases';
import Lanes from '../../../Enums/Lanes';

/** A pickup you can pickup */
export default class Pickup extends ReactivePerspectiveObject
{
    private _sprite: Phaser.Sprite;
    public _lanePosition: Lanes;
    constructor(game: Phaser.Game) {
        super(game);

        //art assigning
        this._sprite = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Hex_Coins');
        this._sprite.anchor.set(.5);
        this.addChild(this._sprite);

    }
    public reset(lane: Lanes): void {
        this._lanePosition = lane;
        this.position.set(0, 0);
    }

    public update(): void {
        if (!this.visible) {
            return;
        }
        super.update();
        this.x += 10;
        this.y += 10;
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
