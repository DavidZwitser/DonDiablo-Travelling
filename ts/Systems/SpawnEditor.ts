import 'phaser-ce';
import { Lanes } from '../Enums/Lanes';

/** Interface for each timing with an according lane */
interface ITiming {
    time: number;
    lane: number;
}

/** interface that is the same of the json file it get recieved from */
interface ILevelData {
    timings: ITiming[];
}

/** Spawn editor for the pickup spawner */
export default class Spawner
{
    private startTime: number;
    public spawnedLevelData: ILevelData;

    constructor()
    {
        this.spawnedLevelData = {timings: []};
    }

    /**
     * Starts recording by Date.now and applying event systems.
     */
    public startRecording(): void
    {
        console.log('start recording');
        this.startTime = Date.now();
        window.addEventListener('keypress', this.keyFunction.bind(this));
    }

    public keyFunction(e: KeyboardEvent): void
    {
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

    /**
     * Adds a ITimimng object with the according lane and time that is defined by the start of its recording.
     */
    public addPickup(lane: Lanes): void {
        console.log(Lanes[lane]);
        let time: number = (Date.now() - this.startTime) / 1000;
        let pickup: ITiming = {time: time, lane};
        this.spawnedLevelData.timings.push(pickup);
        console.log(JSON.stringify(this.spawnedLevelData));
    }
}
