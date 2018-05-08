import { Lanes } from '../../../Enums/Lanes';
import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';


import AtlasImages from '../../../Data/Atlases';

/** The player controlled by the user */
export default class Player extends ReactivePerspectiveObject implements Phaser.Sprite
{
    private _currentLane: Lanes;
    private _playerSprite: Phaser.Sprite;

    public speed: number;
    public collectedPickup: Phaser.Signal;

    public changeLane( lane: Lanes ): void
    {
        /* So no tslint errors will be thrown */
        lane = lane;
        //
    }

    public reactToMusic(): void
    {
        //
    }

    constructor(game: Phaser.Game)
    {
       super(game);
       this._playerSprite = this.game.add.sprite(this.game.width / 3, this.game.height / 1.25, AtlasImages.Interface, 'Spacecraft_Main');
    }
}
