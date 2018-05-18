import 'phaser-ce';
import { Lanes } from '../Enums/Lanes';
import Constants from '../Data/Constants';

//interface that is the same of the json file it get recieved from
interface ILevelData {
    timings: ITiming[];
}

interface ITiming {
    time: number;
    lane: number;
}

/** Spawns pickups */
export default class Spawner
{
    private startTime: number;
    public spawnedLevelData: ILevelData;

    constructor() {
        this.spawnedLevelData = {timings: []};
    }

    public startRecording(): void
    {
        console.log('start recording');
        this.startTime = Date.now();
        window.addEventListener('keypress', this.keyFunction.bind(this));
    }
    public keyFunction(e: KeyboardEvent): void {
        console.log(e.key);
        switch (e.key) {
            case 'q':
            this.addPickup(1);
            break;
            case 'a':
            this.addPickup(2);
            break;
            case 'w':
            this.addPickup(3);
            break;
            case 's':
            this.addPickup(4);
            break;
            case 'e':
            this.addPickup(5);
            break;
            case 'd':
            this.addPickup(6);
            break;
            default:
            //
            break;
        }
    }
    public addPickup(lane: Lanes): void {
        console.log(Lanes[lane]);
        let time: number = (Date.now() - this.startTime - (Constants.SONG_DELAY / Constants.GLOBAL_SPEED)) / 1000 ;
        let pickup: ITiming = {time: time, lane};
        this.spawnedLevelData.timings.push(pickup);
        console.log(JSON.stringify(this.spawnedLevelData));
    }

    public destroy(): void {
        //
    }
}
