export default class AudioVisualizer extends Phaser.Graphics
{

    private _audioElement: HTMLMediaElement;
    private _analyser: AnalyserNode;
    private _xIndex: number;
    private _dataArray: any;
    private _bufferLength: number;

    private _barWidth: number;
    private _barHeight: number;

    public maxWidth: number = 1280;
    public maxHeight: number = 720 / 2;

    public ratioAmount: number;
    public amountOfBars: number = 100;
    public minimumBarHeight: number = 10;
    public barDistance: number = 1;

    constructor (game: Phaser.Game, x: number, y: number, maxWidth: number, maxHeight: number) {
        super(game, x, y);

        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;

        this._audioElement = <HTMLMediaElement>document.getElementById('musicPlayer');
        this.AssignMusic();
    }

    //graphics get drawn based on the frequency of the current state of the music
    public renderBar(): void {

        this.clear();
        this.lineStyle(this._barWidth, 0x33FF00);
        this._xIndex = this._barWidth / 2;

        //let max: number = 0;
        this._analyser.getByteFrequencyData(this._dataArray);
        for (let i: number = 0; i < this._bufferLength; i += this.ratioAmount) {
            this._barHeight = (this._dataArray[Math.round(i)] / 256 * this.maxHeight);
            this.moveTo(this._xIndex, 0);
            this.lineTo(this._xIndex, Math.min(-this._barHeight, -this.minimumBarHeight));
            this._xIndex += this._barWidth + this.barDistance;
            //max = Math.max(max, this._dataArray[Math.round(i)]);
        }
        //console.log(max);
    }

    //music get's assigned and some data gets calculated needed for the visualizer before rendering
    public AssignMusic(key?: string): void {
        // let files: any = file.files;
        // audio.src = URL.createObjectURL(files[0]);
        //this._audioElement.load();
        if (key) {
            this._audioElement.src = 'assets/music/' + key + '.wav';
        }

        let context: AudioContext = new AudioContext();
        let src: MediaElementAudioSourceNode = context.createMediaElementSource(this._audioElement);
        this._analyser = context.createAnalyser();

        src.connect(this._analyser);
        this._analyser.connect(context.destination);

        this._analyser.fftSize = 256;

        this._bufferLength = this._analyser.frequencyBinCount;
        this.ratioAmount = this._bufferLength / this.amountOfBars;

        this._dataArray = new Uint8Array(this._bufferLength);

        this._barWidth = (this.maxWidth * this.ratioAmount / this._bufferLength) - this.barDistance;
        this.clear();

        //this._audioElement.currentTime = 60;
        //this._audioElement.play();

        this.renderBar();
    }

    public destroy(): void {
        this.clear();
        super.destroy(true);
    }
}
