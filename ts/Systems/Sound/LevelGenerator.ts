import 'phaser-ce';
import AudioAnalyser from './AudioAnalyser';

/** Visualizes songs */
/** Visualizes music */
export default class MusicVisualizer extends Phaser.Graphics
{
    private _analyser: AudioAnalyser;

    private _xIndex: number;
    private _barWidth: number;
    private _barHeight: number;

    public maxWidth: number = 1280;
    public maxHeight: number = 720 / 2;

    public ratioAmount: number;
    public amountOfBars: number = 100;
    public minimumBarHeight: number = 10;
    public barDistance: number = 1;

    //itteration skip
    private itterationSkipDuration: number = 0.2;
    private currentTime: number = 0;

    //level generation
    private frequencyVelocityList: number[];
    private inBeat: boolean = false;
    private outBeat: boolean = false;
    private previousFrequency: number[];

    private beatIndex: number = 0;

    constructor (game: Phaser.Game, x: number, y: number, maxWidth: number, maxHeight: number) {
        super(game, x, y);

        this._analyser = new AudioAnalyser();
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.generate();
    }

    public generate(): void
    {
        this._analyser.Setup();
        this.ratioAmount = this._analyser._bufferLength / this.amountOfBars;
        this._barWidth = (this.maxWidth * this.ratioAmount / this._analyser._bufferLength) - this.barDistance;
        this.clear();

        this.frequencyVelocityList = [];
        this.previousFrequency = [];
        for (let i: number; i < this._analyser._bufferLength / this.ratioAmount; i++) {
            this.frequencyVelocityList.push(0);
            this.previousFrequency.push(0);
        }

        this.render();
    }
    public getPrecentageOfFreqGoingUp(minPrecent: number, maxPrecent: number): number {
        let amount: number = 0;
        let numberlist: number[] = this.frequencyVelocityList;
        // for (let i: number = Math.round(numberlist.length); i--;) {
        //     if (numberlist[i] !== 0) {
        //         break;
        //     }
        //     numberlist.splice(i);
        // }
        for (let i: number = Math.round(numberlist.length * maxPrecent); i--;) {
            if (i < Math.round(numberlist.length * minPrecent)) {
                break;
            }
            if (numberlist[i] > 0) {
                amount++;
            }
        }
        let precentage: number = Math.round(amount / (numberlist.length * (maxPrecent - minPrecent)) * 100);
        return precentage || 0;
    }

    public render(): void
    {
        //this.currentTime += this.itterationSkipDuration;
        if (this.currentTime > this._analyser._audioElement.duration) { return; }

        //this._analyser._audioElement.currentTime = this.currentTime;

        this._analyser._analyser.getByteFrequencyData(this._analyser._dataArray);

        for (let i: number = 0; i < this._analyser._bufferLength; i += this.ratioAmount) {
            this.frequencyVelocityList[Math.round(i / this.ratioAmount)] = this._analyser._dataArray[Math.round(i)] - this.previousFrequency[Math.round(i / this.ratioAmount)];
            this.previousFrequency[Math.round(i / this.ratioAmount)] = this._analyser._dataArray[Math.round(i)];
        }
        console.log(this.getPrecentageOfFreqGoingUp(0, 1));

        let positives: number = 0;
        let negatives: number = 0;
        for (let i: number = this.frequencyVelocityList.length; i--;) {
            if (this.frequencyVelocityList[i] > 0) {
                positives++;
            } else if (this.frequencyVelocityList[i] < 0) {
                negatives++;
            }
        }

        //console.log(this.frequencyVelocityList[0]);

        if (positives / (positives + negatives) * 100 > 90) {
            //console.log('still in beat');
            if (!this.inBeat) {
                console.log('in beat!', this.beatIndex);
                this.beatIndex++;
                this.inBeat = true;
            }
        } else if (!this.outBeat){
            //console.log('out of beat');
            this.outBeat = true;
            setTimeout(() => {
                this.outBeat = false;
                this.inBeat = false;
            }, 100);
        }

        setTimeout(() => {
            this.render();
        }, 1);

        this.clear();
        this.lineStyle(this._barWidth, 0x33FF00);
        this._xIndex = this._barWidth / 2;

        //let max: number = 0;
        for (let i: number = 0; i < this._analyser._bufferLength; i += this.ratioAmount) {
            this._barHeight = (this._analyser._dataArray[Math.round(i)] / 256 * this.maxHeight);
            this.moveTo(this._xIndex, 0);
            this.lineTo(this._xIndex, Math.min(-this._barHeight, -this.minimumBarHeight));
            this._xIndex += this._barWidth + this.barDistance;
            //max = Math.max(max, this._dataArray[Math.round(i)]);
        }
        //console.log(max);
    }

    public destroy(): void {
        this.clear();
        super.destroy(true);
    }
}
