import Constants from '../Data/Constants';
import BackgroundVisualizer from '../Systems/BackgroundVisualizer';
import RoadLighting from '../Systems/RoadLighting';

/** interface that is the same of the json file it get recieved from */
export default interface ILevelData {
    timings: ITiming[];
}
/** Interface for each timing with an according lane */
interface ITiming {
    time: number;
    lane: number;
}


export default class SecretUnlocker extends Phaser.Group
{

    private _levelData: ILevelData;
    public _lightingSignal: Phaser.Signal;

    private _backgroundVisualizer: BackgroundVisualizer;
    private _roadLighting: RoadLighting;
    

    private _backgroundSprite: Phaser.Sprite;

    private _currentTime: number;

    constructor(game: Phaser.Game)
    {
        super(game);

        this._lightingSignal = new Phaser.Signal();

        this._levelData = game.cache.getJSON(Constants.LEVELS[12].json);
        this._currentTime = 0.001;


        if (Constants.hexCollected)
        {
            this.changeSurroundings();
        }

    }


    private update(): void
    {
        // drop = [55]

        if (Constants.hexCollected)
        {
            this._currentTime += 1 * 0.025;

            if (this._currentTime >= this._levelData.timings[1].time)
            {
                this.addScripts();
                this._lightingSignal.dispatch();
    
            }
        }
        
    }


    private changeSurroundings(): void
    {
        /* Create the background sprite */
        this._backgroundVisualizer = new BackgroundVisualizer(this.game);

        this._backgroundSprite = this._backgroundVisualizer.getBackgroundSprite;
        this._backgroundSprite.visible = false;

        // bool runningHex  = true;
      

    }

    private addScripts(): void
    {
        this.game.add.existing(this._backgroundVisualizer);
        this.game.add.existing(this._roadLighting);
    }

      /** destroys and clears all secret lockables */
      public destroy(): void
      {
         this._backgroundVisualizer.destroy();
         this._backgroundVisualizer = null;

         this._roadLighting.destroy();
         this._roadLighting = null;
      }
  }
}