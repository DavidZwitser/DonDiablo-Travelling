import { Lanes } from '../Enums/Lanes';
import Pickup from '../GameObjects/Interactable/Perspective/Pickup';
import ObjectPool from './ObjectPool';

/** Spawns pickups */
export default class PickupSpawner
{
    private pickupPool: ObjectPool;

    constructor(game: Phaser.Game) {
        this.pickupPool = new ObjectPool(() => {
            let pickup: Pickup = new Pickup(game);
            game.add.existing(pickup);
            return pickup;
        });

        // setInterval(() => {
        //     let pickup: Pickup = this.spawnPickup();
        //     pickup.position.set(0, 0);
        //     setTimeout(() => {
        //         pickup.visible = false;
        //     }, 500);
        // }, 100);
    }
    private getRandomLane(): Lanes
    {
        return Math.floor(Math.random() * Object.keys(Lanes).length / 2);
    }

    public spawnPickup(lanePos: Lanes = this.getRandomLane()): Pickup
    {
        let pickup: Pickup = <Pickup>this.pickupPool.getObject(true);
        if (pickup !== null) {
            pickup._lanePosition = lanePos;
        }
        return pickup;
    }

    public destroy(): void {
        this.pickupPool.destroy();
        this.pickupPool = null;
    }

    // public spawnPickupIfNeeded(): void
    // {
    //     //
    // }
}
