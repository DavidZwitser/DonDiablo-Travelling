import Constants from '../Data/Constants';
import Road from '../Rendering/Road';





/** Choose at what time to light up the road */
export default class RoadLighting extends Phaser.Group
{

    private _roadLayers: Road;
     /*
    HighlightLayer: Middle Colour
    */
   private _redColor: Phaser.Color;
   private _whiteColor: Phaser.Color;

   private _secretHighLight: Phaser.Graphics;
   private _secretRoadLines: Phaser.Graphics;

   


    public create(): void
    {
       this._redColor = 0xaa0000; // highlightLayer, middle screen
       this._whiteColor = 0xffffff; // roadLayer, colours on the road

         //this._secretHighLight = this._roadLayers.gethighlightLayer;
       // this._roadLayers.sethighlightLayer.beginFill(0xaa0000);

       // this._secretHighLight.beginFill(0xaa0000);

    }

    constructor(game: Phaser.Game)
    {
        super(game);

    }

}