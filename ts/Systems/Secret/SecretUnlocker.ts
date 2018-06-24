import Constants from '../../Data/Constants';

import HexParts from '../Secret/HexParts';
import HexEnemy from '../Secret/HexEnemy';

import BackgroundVisualizer from '../Secret/BackgroundVisualizer';
import RoadLighting from '../Secret/RoadLighting';

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

    private static instance: SecretUnlocker = null;

    private _backgroundVisualizer: BackgroundVisualizer;
    private _roadLighting: RoadLighting;

    private _hexParts: HexParts;
    private _hexEnemy: HexEnemy;

    private _levelData: ILevelData;

    public _secretSignal: Phaser.Signal;

    private _currentTime: number;

    private _signalSent: boolean;

    constructor(game: Phaser.Game)
    {
        super(game);

        if (Constants.HEX_COLLECTED)
        {
            this.createSignal();
            this.addIngredients();
            this.collectLevelData();
        }

    }

    public update(): void
    {
        if (Constants.HEX_COLLECTED && !this._signalSent)
        {
            this.countDownSecret();
        }
    }


    private collectLevelData(): void
    {

        this._levelData = this.game.cache.getJSON(Constants.LEVELS[12].json); // Grab the last song, Tunnel Vision
        this._currentTime = 0.001; // add exact timer
        this._signalSent = false; // Has the signal been sent?
    }

    private createSignal(): void
    {
        this._secretSignal = new Phaser.Signal(); // create Phaser.Signal for the secret
    }

    private createHexEnemy(): void
    {
        this._hexEnemy = new HexEnemy(this.game);
        this.game.add.existing(this._hexEnemy);
    }

    private addIngredients(): void
    {
              /* Create the background sprite */
              this._backgroundVisualizer = new BackgroundVisualizer(this.game);

             /* Create road lighting */
              this._roadLighting = new RoadLighting(this.game);

            /* Create hex parts */
              this._hexParts = new HexParts(this.game);

             /* Add to the game */
              this.game.add.existing(this._backgroundVisualizer);
              this.game.add.existing(this._roadLighting);
              this.game.add.existing(this._hexParts);

    }

  private countDownSecret(): void
  {
       // drop = [54]

    if (this._currentTime >= this._levelData.timings[2].time)
    {
        this._signalSent = true;

        this._secretSignal.dispatch();

        this._backgroundVisualizer.makeVisible();
        this.createHexEnemy();
    }

    if (!this._signalSent)
    {
        this._currentTime += 1 * 0.025;
    }
  }
  /*

  public static getInstance(game: Phaser.Game): SecretUnlocker
  {
      if (null === SecretUnlocker.instance)
      {
        SecretUnlocker.instance = new SecretUnlocker(game);
      }

      return SecretUnlocker.instance;
  }
*/

    public resize(): void
    {
        this._hexEnemy.resize();
    }

      /** destroys and clears all secret lockables */
      public destroy(): void
      {
         this._levelData = null;

         this._backgroundVisualizer.destroy();
         this._backgroundVisualizer = null;

         this._roadLighting.destroy();
         this._roadLighting = null;

         this._secretSignal.removeAll();
      }
  }