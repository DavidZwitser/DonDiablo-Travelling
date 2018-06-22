import 'phaser-ce';

import Atlases from '../../Data/Atlases';
import PlayerCollisionChecker from '../PlayerCollisionChecker';

// constants
//secret

/** The class where Hex shows up at the start */
export default class HexHealth extends Phaser.Group
{

    private _HexHealth: number;


    constructor(game: Phaser.Game)
    {
        super(game);

        this.addPlayerCollision();
        this.setHexHealth();
        this.adjustHexHealth();
       //this.repeatHexParts();

        /** Check through hex's data and see how the part should be displayed */
    }


    private setHexHealth(): void
    {
        this._HexHealth = 50;
    }

    private addPlayerCollision(): void
    {
    }

    private adjustHexHealth(): void
    {
     
        PlayerCollisionChecker.getInstance().onColliding.add(() => {
            console.log('work on health');
            //this.gameOver();
        });
        PlayerCollisionChecker.getInstance().onMissing.add(() => {
         //   this.score = Math.max(-5, this.score - 5);
        });
        
        PlayerCollisionChecker.getInstance().onColliding.add( () => {
         //   this._userInterface.scoreBar.value += 1;
        });
        
    }

   

    /** Go through the hex data and recheck if any parts are collected in which case hex should display the sprite which is not the silouette */


    /** Resize all the parts into their position */
    public resize(): void
    {
        
    }

    /** Destroy all the parts */
    public destroy(): void
    {
        //TODO: you know what to do here
        super.destroy(true);

    }
}


