import { Lanes } from '../Enums/Lanes';
import Pickup from '../GameObjects/Interactable/Perspective/Pickup';
import ObjectPool from './ObjectPool';
import Jason from '../Data/Jason';
import PerspectiveRenderer from '../Rendering/PerspectiveRenderer';

//interface that is the same of the json file it get recieved from
interface ILevelData {
    timings: ITiming[];
}

interface ITiming {
    time: number;
    lane: number;
}

/** Spawns pickups */
export default class PickupSpawner extends Phaser.Group
{
    private pickupPool: ObjectPool;

    private levelData: ILevelData;
    private timeOut: any;
    private spawnIndex: number = 0;
    private startTime: number;
    private passedTime: number;

    private perspectiveRenderer: PerspectiveRenderer;

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game);

        this.perspectiveRenderer = renderer;

        // pickup pooling gets defined
        this.pickupPool = new ObjectPool(() => {

            let pickup: Pickup = new Pickup(game, this.perspectiveRenderer);
            this.addChild(pickup);

            return pickup;
        });

        this.getLevelData(game, Jason.test);
        this.waitForNextSpawning(this.levelData.timings[0].time);
    }

    private getRandomLane(): Lanes
    {
        return Math.floor(Math.random() * Object.keys(Lanes).length / 2);
    }

    private spawnPickup(lanePos: Lanes = this.getRandomLane()): Pickup
    {
        let pickup: Pickup = <Pickup>this.pickupPool.getObject(true);

        if (pickup !== null)
        {
            pickup.lane = lanePos;
            pickup.zPos = 2;

            //TODO: settimeout can be removed, it basically is a way do deactivate the sprite automaticly
            setTimeout(() => {
                pickup.visible = false;
            }, 5000);
        }

        return pickup;
    }

    //level data is get from cache of a json file
    private getLevelData(game: Phaser.Game, key: string): void
    {
        this.levelData = game.cache.getJSON(key);
    }

    //this is the loop the spawning takes place from the leveldata
    private waitForNextSpawning(timeWaiting: number): void
    {
        this.startTime = Date.now();
        this.timeOut = setTimeout(() => {
            this.spawnPickup(this.levelData.timings[this.spawnIndex].lane);

            this.spawnIndex++;

            if (this.spawnIndex < this.levelData.timings.length - 1)
            {
                this.waitForNextSpawning(this.levelData.timings[this.spawnIndex].time - this.levelData.timings[this.spawnIndex - 1].time);
            }

        }, timeWaiting * 1000);
    }

    public pause(pause: boolean): void
    {
        if (pause)
        {
            clearTimeout(this.timeOut);
            this.passedTime = Date.now() - this.startTime;
        }
        else
        {
            this.waitForNextSpawning(this.levelData.timings[this.spawnIndex].time - (this.spawnIndex !== 0 ? this.levelData.timings[this.spawnIndex - 1].time : 0) - this.passedTime);
        }
    }

    // public spawnPickupIfNeeded(): void
    // {
    //     //
    // }

    //destroy function
    public destroy(): void
    {
        this.pickupPool.destroy();
        this.pickupPool = null;
        this.levelData = null;
        clearTimeout(this.timeOut);
        this.spawnIndex = 0;
    }
}
