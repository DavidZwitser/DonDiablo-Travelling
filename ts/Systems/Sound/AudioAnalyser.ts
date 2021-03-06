//use strict;

/** Analyses the sound in the audio html object for frequency */
export default class AudioAnalyser
{

    private static instance: AudioAnalyser = null;

    public audioElement: HTMLMediaElement;
    public analyser: AnalyserNode;
    public dataArray: Uint8Array;
    public bufferLength: number;
    public context: AudioContext;
    private _src: MediaElementAudioSourceNode;

    private _alreadySetup: boolean = false;

    constructor ()
    {
        this.audioElement = <HTMLMediaElement>document.getElementById('musicPlayer');
    }

    /** music get's assigned and some data gets calculated needed for the visualizer before rendering */
    public setup(): boolean
    {
        try
        {
            console.log('its true!');
            this.context = new AudioContext();
        }
        catch
        {
            console.log('its false!');
            return false;
        }

        if (this._alreadySetup === true) { return true; }
        this._alreadySetup = true;

        this._src = this.context.createMediaElementSource(this.audioElement);
        this.analyser = this.context.createAnalyser();

        this._src.connect(this.analyser);
        this.analyser.connect(this.context.destination);

        this.analyser.fftSize = 256;

        this.bufferLength = this.analyser.frequencyBinCount;

        this.dataArray = new Uint8Array(this.bufferLength);
        return true;
    }

    /** Instance of tje object to make sure there is only one declaered and available in every class */
    public static getInstance(): AudioAnalyser
    {
        if (null === AudioAnalyser.instance)
        {
            AudioAnalyser.instance = new AudioAnalyser();
        }

        return AudioAnalyser.instance;
    }

}
