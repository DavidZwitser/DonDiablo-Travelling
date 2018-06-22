import 'phaser-ce';

import Atlases from '../../Data/Atlases';
import PlayerCollisionChecker from '../PlayerCollisionChecker';

import SoundManager from '../../Systems/Sound/SoundManager';
import Sounds from '../../Data/Sounds'; // might have other script

// constants
//secret

/** The class where Hex shows up at the start */
export default class HexHealth extends Phaser.Group
{

    private _HexHealth: number;


    constructor(game: Phaser.Game)
    {
        super(game);

        this.setHexHealth();
        this.hexCollision();

        /** Check through hex's data and see how the part should be displayed */
    }


    private setHexHealth(): void
    {
        if (this._HexHealth >= 50)
        {
            this._HexHealth = 50;
        }

    }

    private hexCollision(): void
    {
     
        PlayerCollisionChecker.getInstance().onColliding.add(() => {
            this.adjustHexHealth(5);
            console.log('added health ' + this._HexHealth);
        });
        PlayerCollisionChecker.getInstance().onMissing.add(() => {
         //   this.score = Math.max(-5, this.score - 5);
        });
        
        PlayerCollisionChecker.getInstance().onCollidingPerfect.add( () => {
        this.adjustHexHealth(-5);
        this.hexHit();
        console.log('gotcha ' + this._HexHealth);
        });
        
    }

    private adjustHexHealth(amount: number): void
    {
        this._HexHealth += amount;
    }

    private hexHit(): void
    {
        SoundManager.getInstance().play(Sounds.LOW_SOUND);
        this.game.camera.flash(0xff0000, 300, true, 0.1);
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


