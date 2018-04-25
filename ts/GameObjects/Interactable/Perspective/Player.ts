import { Lanes } from '../../../Enums/Lanes';
import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';

/** The player controlled by the user */
export default class Player extends ReactivePerspectiveObject
{
    private currentLane: Lanes;

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

        /* So no tslint errors will be thrown */
        this.currentLane = this.currentLane;
       // this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'Spacecraft_Main');
    }
}
