import Constants from '../../Data/Constants';
import SecretUnlocker from '../Secret/SecretUnlocker';
import Road from '../../Rendering/Road';
import { QuadTree } from 'phaser-ce';

/** Choose at what time to light up the road */
export default class RoadLighting extends Phaser.Group
{

    private _secretUnlocker: SecretUnlocker;
    private _roadLayers: Road;
     /*
    HighlightLayer: Middle Colour
    */
   private _redColor: number;
   private _blackColor: number;
   private _whiteColor: number;

   private _secretHighLight: Phaser.Graphics;
   private _secretRoadLines: Phaser.Graphics;

    public create(): void
    {
       this._redColor = 0xaa0000; // highlightLayer, middle screen
       this._blackColor = 0x000000; // roadLayer, colours on the road
       this._whiteColor = 0xffffff; // roadLayer, colours on the road

         //this._secretHighLight = this._roadLayers.gethighlightLayer;
       // this._roadLayers.sethighlightLayer.beginFill(0xaa0000);

       // this._secretHighLight.beginFill(0xaa0000);

    }

    constructor(game: Phaser.Game)
    {
        super(game);
    }

    public changeHighlight(): void
    {
        this._roadLayers = new Road(this.game);
        this._roadLayers.secretRoadColors(this._whiteColor, this._whiteColor, this._whiteColor, 0);

        
    }
}