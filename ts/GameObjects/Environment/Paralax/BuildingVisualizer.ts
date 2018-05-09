import 'phaser-ce';
import AudioAnalyser from '../../../Systems/Sound/AudioAnalyser';
import Atlases from '../../../Data/Atlases';

/** Visualizes songs */
/** Visualizes music */
export default class BuildingVisualizer extends Phaser.Graphics
{
    private _analyser: AudioAnalyser;

    private _xIndex: number;
    private _barWidth: number;
    private _barHeight: number;

    public maxWidth: number = 1280;
    public maxHeight: number = 720 / 2;

    public ratioAmount: number;
    public amountOfBars: number = 15;
    public minimumBarHeight: number = 10;
    public barDistance: number = 1;
    private _contextAvailable: boolean;

    //
    public buildings: Phaser.Sprite[];
    private glow: Phaser.Sprite;
    private backGlow: Phaser.Sprite;

    constructor (game: Phaser.Game, x: number, y: number, maxWidth: number, maxHeight: number) {
        super(game, x, y);

        this.buildings = [];

        this._analyser = new AudioAnalyser();
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.changeSong();

        this.glow = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Upper_glow_utopia');
        this.glow.anchor.set(0, 1);
        this.addChild(this.glow);

        this.backGlow = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Purple_glow_utopia');
        this.backGlow.anchor.set(0, 1);
        this.addChild(this.backGlow);

        let pos: number = 0;
        while (pos < maxWidth) {
            let building: Phaser.Sprite = new Phaser.Sprite(this.game, pos, 0, Atlases.Interface, 'building_good_' + Math.ceil(Math.random() * 14) );
            building.anchor.set(0);
            building.scale.set(2);
            this.addChild(building);
            this.buildings.push(building);
            pos += building.width + this.barDistance;
        }

    }

    /** Update the song the visualizer is using to visualize music */
    public changeSong(): void
    {
        this._contextAvailable = this._analyser.Setup();
        if (this._contextAvailable) {
            this.ratioAmount = this._analyser._bufferLength / this.amountOfBars;
            this._barWidth = (this.maxWidth * this.ratioAmount / this._analyser._bufferLength) - this.barDistance;
            this.clear();
        }

        //this._audioElement.currentTime = 60;
        //this._audioElement.play();

        this.render();
    }

    /** Umpdate the visualizer so it's values can update */
    public render(): void
    {
        if (!this._contextAvailable) {
            return;
        }

        this.clear();
        this.lineStyle(this._barWidth, 0x33FF00);
        this._xIndex = this._barWidth / 2;

        //let max: number = 0;

        this._analyser._analyser.getByteFrequencyData(this._analyser._dataArray);
        for (let i: number = this.buildings.length; i--;) {
            let height: number = this._analyser._dataArray[Math.round(this.buildings[i].x / this.maxWidth * this._analyser._bufferLength)] / 256 * this.buildings[i].height;
            console.log(height);
            this.buildings[i].y =  -height;
        }

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
