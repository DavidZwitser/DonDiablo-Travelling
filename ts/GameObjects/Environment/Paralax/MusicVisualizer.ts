import AudioAnalyser from '../../../Systems/Sound/AudioAnalyser';

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
    public amountOfBars: number = 20;
    public minimumBarHeight: number = 10;
    public barDistance: number = 1;

    constructor (game: Phaser.Game, x: number, y: number, maxWidth: number, maxHeight: number) {
        super(game, x, y);

        this._analyser = new AudioAnalyser();
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.changeSong();
    }

    /** Update the song the visualizer is using to visualize music */
    public changeSong(): void
    {
        this._analyser.Setup();
        this.ratioAmount = this._analyser.bufferLength / this.amountOfBars;
        this._barWidth = (this.maxWidth * this.ratioAmount / this._analyser.bufferLength) - this.barDistance;
        this.clear();

        //this._audioElement.currentTime = 60;
        //this._audioElement.play();

        this.render();
    }

    /** Umpdate the visualizer so it's values can update */
    public render(): void
    {
        this.clear();
        this.lineStyle(this._barWidth, 0x33FF00);
        this._xIndex = this._barWidth / 2;

        //let max: number = 0;
        this._analyser.analyser.getByteFrequencyData(this._analyser.dataArray);
        for (let i: number = 0; i < this._analyser.bufferLength; i += this.ratioAmount) {
            this._barHeight = (this._analyser.dataArray[Math.round(i)] / 256 * this.maxHeight);
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
