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
        //
    }

    public reactToMusic(): void
    {
        //
    }
}
