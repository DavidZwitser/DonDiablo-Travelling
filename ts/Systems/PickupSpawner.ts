import { Lanes } from '../Enums/Lanes';
import PickupContainer from './PickupContainer';
import Constants from '../Data/Constants';
import ObjectPool from './ObjectPool';
import Pickup from '../GameObjects/Interactable/Perspective/Pickup';
import PerspectiveRenderer from '../Rendering/PerspectiveRenderer';

//interface that is the same of the json file it get recieved from
interface ILevelData {
    timings: ITiming[];
}

interface ITiming {
    time: number;
    lane: number;
}

// TODO: Seperate this in a pickup container and spawner
/** Spawns pickups */
export default class PickupSpawner extends Phaser.Group
{
    private _levelData: ILevelData;
    private _timeOut: NodeJS.Timer;
    private _spawnIndex: number = 0;
    private _startTime: number;
    private _passedTime: number;

    private _pool: ObjectPool;
    private _container: PickupContainer;

    constructor(game: Phaser.Game, container: PickupContainer, renderer: PerspectiveRenderer)
    {
        super(game);
        this._container = container;

        this._pool = new ObjectPool(() => {

            let pickup: Pickup = new Pickup(game, renderer);
            this._container.addPickup(pickup);

            return pickup;
        });
    }

    public setNewSong(json: string): void
    {
        this.pause(true);
        this.getLevelData(this.game, json);
        this.waitForNextSpawn(this._levelData.timings[0].time - Constants.SPAWN_DELAY / Constants.GLOBAL_SPEED);
    }

    private getRandomLane(): Lanes
    {
        return Math.floor(Math.random() * Object.keys(Lanes).length / 2);
    }

    //level data is get from cache of a json file
    private getLevelData(game: Phaser.Game, key: string): void
    {
        this._spawnIndex = 0;
        this._levelData = game.cache.getJSON(key);
        // let temp: ILevelData = this._levelData;
        // for (let i: number = 0; i < temp.timings.length; i++) {
        //     temp.timings[i].lane ++;
        // }
        // console.log(JSON.stringify(temp));
    }

    private spawnPickup(lanePos: Lanes = this.getRandomLane()): Pickup
    {
        let pickup: Pickup = <Pickup>this._pool.getObject(true);

        if (pickup !== null)
        {
            pickup.lane = lanePos;
            pickup.zPos = 5;
            pickup.scale.set(1);

            pickup.alpha = 0;
            this.game.add.tween(pickup).to({alpha: 1}, 500,  Phaser.Easing.Linear.None, true);

            this.sendToBack(pickup);
            pickup.changeSprite();
        }

        return pickup;
    }

    //this is the loop the spawning takes place from the leveldata
    private waitForNextSpawn(delay: number): void
    {
        this._startTime = Date.now();
        this._timeOut = setTimeout(() => {
            this.spawnPickup(this._levelData.timings[this._spawnIndex].lane);

            this._spawnIndex++;

            if (this._spawnIndex < this._levelData.timings.length)
            {
                this.waitForNextSpawn(this._levelData.timings[this._spawnIndex].time - this._levelData.timings[this._spawnIndex - 1].time);
            }
            else
            {
                return;
            }

        }, delay * 1000);
    }

    public pause(pause: boolean): void
    {
        if (pause)
        {
            clearTimeout(this._timeOut);
            this._timeOut = null;
            this._passedTime = (Date.now() - this._startTime) / 1000;
        }
        else
        {
            this.waitForNextSpawn(this._levelData.timings[this._spawnIndex].time - (this._spawnIndex !== 0 ? this._levelData.timings[this._spawnIndex - 1].time : 0) - this._passedTime);
        }
    }

    //destroy function
    public destroy(): void
    {
        if (this._pool) {
            this._pool.destroy();
        }
        this._pool = null;

        this._levelData = null;
        clearTimeout(this._timeOut);
        this._spawnIndex = 0;
    }
}
