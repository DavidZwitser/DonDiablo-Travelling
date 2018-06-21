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
    private _backgroundVisualizer: BackgroundVisualizer;
    private _roadLighting: RoadLighting;

    private _levelData: ILevelData;
    public _secretSignal: Phaser.Signal;

    private _currentTime: number;
    
    private _signalSent: boolean;


    constructor(game: Phaser.Game)
    {
        super(game);

        this._levelData = game.cache.getJSON(Constants.LEVELS[12].json); // Grab the last song, Tunnel Vision
        this._currentTime = 0.001; // add exact timer
        this._signalSent = false;

        this.addIngredients(this.game);
    }

    

    private update(): void
    {
        if (Constants.hexCollected && !this._signalSent)
        {
            this.countDownSecret();
        }
    }

    private createSignal(): void
    {
        this._secretSignal = new Phaser.Signal(); // create Phaser.Signal for the secret
    }

    private addIngredients(game: Phaser.Game): void
    {
       /* Create the background sprite */

        this._backgroundVisualizer = new BackgroundVisualizer(this.game);
     //   this._roadLighting = new RoadLighting(this.game);

        this.game.add.existing(this._backgroundVisualizer);
     //  this.game.add.existing(this._roadLighting);
    }

  private countDownSecret(): void
  {
       // drop = [55]

    if (this._currentTime >= this._levelData.timings[1].time)
    {

        this._signalSent = true;

        this.createSignal();
        this._secretSignal.dispatch();
        console.log('works step 1');
    }

    if (!this._signalSent)
    {
        this._currentTime += 1 * 0.025;
    }
  }

      /** destroys and clears all secret lockables */
      public destroy(): void
      {
         this._levelData = null;

         this._backgroundVisualizer.destroy();
         this._backgroundVisualizer = null;

         this._roadLighting.destroy();
         this._roadLighting = null;
      }
  }
}