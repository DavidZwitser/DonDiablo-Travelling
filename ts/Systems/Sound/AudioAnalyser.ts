export default class AudioAnalyser
{

    public _audioElement: HTMLMediaElement;
    public _analyser: AnalyserNode;
    public _dataArray: any;
    public _bufferLength: number;

    constructor () {
        this._audioElement = <HTMLMediaElement>document.getElementById('musicPlayer');
    }

    //music get's assigned and some data gets calculated needed for the visualizer before rendering
    public Setup(): void {
        // let files: any = file.files;
        // audio.src = URL.createObjectURL(files[0]);
        //this._audioElement.load();

        let context: AudioContext = new AudioContext();
        let src: MediaElementAudioSourceNode = context.createMediaElementSource(this._audioElement);
        this._analyser = context.createAnalyser();

        src.connect(this._analyser);
        this._analyser.connect(context.destination);

        this._analyser.fftSize = 256;

        this._bufferLength = this._analyser.frequencyBinCount;

        this._dataArray = new Uint8Array(this._bufferLength);
    }

    public destroy(): void {
        this._analyser = null;
        this._dataArray = null;
        this._bufferLength = null;
    }
}
