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
    private _pickupPool: ObjectPool;

    private _levelData: ILevelData;
    private _timeOut: any;
    private _spawnIndex: number = 0;
    private _startTime: number;
    private _passedTime: number;

    private _perspectiveRenderer: PerspectiveRenderer;

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game);

        this._perspectiveRenderer = renderer;

        // pickup pooling gets defined
        this._pickupPool = new ObjectPool(() => {

            let pickup: Pickup = new Pickup(game, this._perspectiveRenderer);
            this.addChild(pickup);

            return pickup;
        });

        this.getLevelData(game, Jason.test);
        this.waitForNextSpawning(this._levelData.timings[0].time);
    }

    private getRandomLane(): Lanes
    {
        return Math.floor(Math.random() * Object.keys(Lanes).length / 2);
    }

    private spawnPickup(lanePos: Lanes = this.getRandomLane()): Pickup
    {
        let pickup: Pickup = <Pickup>this._pickupPool.getObject(true);

        if (pickup !== null)
        {
            pickup.lane = lanePos;
            pickup.zPos = 5;
            pickup.scale.set(1);

            pickup.alpha = 0;
            this.game.add.tween(pickup).to({alpha: 1}, 500,  Phaser.Easing.Linear.None, true);

            this.sendToBack(pickup);
        }

        return pickup;
    }

    /** Reposition all the pickups, so they get alligned well after a road is added. */
    public repositionAllPickups(): void
    {
        for (let i: number = this._pickupPool.objects.length; i--; )
        {
            this._pickupPool.objects[i].reposition();
        }
    }

    //level data is get from cache of a json file
    private getLevelData(game: Phaser.Game, key: string): void
    {
        this._levelData = game.cache.getJSON(key);
        // let temp: ILevelData = this._levelData;
        // for (let i: number = 0; i < temp.timings.length; i++) {
        //     temp.timings[i].lane ++;
        // }
        // console.log(JSON.stringify(temp));
    }

    //this is the loop the spawning takes place from the leveldata
    private waitForNextSpawning(timeWaiting: number): void
    {
        this._startTime = Date.now();
        this._timeOut = setTimeout(() => {
            this.spawnPickup(this._levelData.timings[this._spawnIndex].lane);

            this._spawnIndex++;

            if (this._spawnIndex < this._levelData.timings.length)
            {
                this.waitForNextSpawning(this._levelData.timings[this._spawnIndex].time - this._levelData.timings[this._spawnIndex - 1].time);
            }

        }, timeWaiting * 1000);
    }

    public pause(pause: boolean): void
    {
        if (pause)
        {
            clearTimeout(this._timeOut);
            this._passedTime = Date.now() - this._startTime;
        }
        else
        {
            this.waitForNextSpawning(this._levelData.timings[this._spawnIndex].time - (this._spawnIndex !== 0 ? this._levelData.timings[this._spawnIndex - 1].time : 0) - this._passedTime);
        }
    }

    //destroy function
    public destroy(): void
    {
        if (this._pickupPool) {
            this._pickupPool.destroy();
        }
        this._pickupPool = null;
        this._levelData = null;
        clearTimeout(this._timeOut);
        this._spawnIndex = 0;
    }
}
