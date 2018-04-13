import Pickup from '../GameObjects/Interactable/Perspective/Pickup';
import Player from '../GameObjects/Interactable/Perspective/Player';

/** Checks collision */
export default class CollisionChecker
{
    public onPickupCollected: Phaser.Signal;

    public isColliding(player: Player, pickcup: Pickup): boolean
    {
        return false;
    }
}
