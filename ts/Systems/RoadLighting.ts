import Constants from '../Data/Constants';
import SecretUnlocker from '../Systems/SecretUnlocker';
import Road from '../Rendering/Road';



/** Choose at what time to light up the road */
export default class RoadLighting extends Phaser.Group
{

/*
    HighlightLayer: Middle Colour
    */
   private _secretUnlocker: SecretUnlocker;
   private _roadLayers: Road;

   private _redColor: Phaser.Color;
   private _whiteColor: Phaser.Color;

   private _secretHighLight: Phaser.Graphics;
   private _secretRoadLines: Phaser.Graphics;

    public create(): void
    {
       this._redColor = 0xaa0000; // highlightLayer, middle screen
       this._whiteColor = 0xffffff; // roadLayer, colours on the road
    }

    constructor(game: Phaser.Game)
    {
        super(game);
        this._secretUnlocker._lightingSignal.add(this.changeRoad);
    }

   private changeRoad()
   {
    this._roadLayers = new Road(this.game);
    //this._secretHighLight = this._roadLayers.gethighlightLayer;
   // this._roadLayers.sethighlightLayer.beginFill(0xaa0000);

   // this._secretHighLight.beginFill(0xaa0000);

    this._roadLighting = new RoadLighting(this.game); 
    this._roadLighting._lightingSignal.add (() =>
    {
        

        this.game.add.tween(this._backgroundSprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        this._backgroundSprite.visible = true;

    });
   }

      /** destroys and clears the timeout */
      public destroy(): void
      {
          this._levelData = null;
      }
  }
}