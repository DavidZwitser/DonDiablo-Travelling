import { Lanes } from '../../../Enums/Lanes';
import ReactivePerspectiveSprite from '../../../Rendering/Sprites/ReactivePerspectiveSprite';

/** The player controlled by the user */
export default class Player extends ReactivePerspectiveSprite
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
