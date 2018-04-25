import { Lanes } from '../../../Enums/Lanes';
import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';
import { Sprite } from 'phaser-ce';

/** The player controlled by the user */
export default class Player extends ReactivePerspectiveObject implements Sprite
{
    private currentLane: Lanes;

    public speed: number;
    public collectedPickup: Phaser.Signal;

    public changeLane( lane: Lanes ): void
    {
        //
    }

    public reactToMusic(): void
    {
        //
    }

    constructor(game: Phaser.Game)
    {
        super(game);
       // this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'Spacecraft_Main');
    }
}
