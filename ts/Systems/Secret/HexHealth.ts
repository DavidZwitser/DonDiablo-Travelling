import 'phaser-ce';

import PlayerCollisionChecker from '../PlayerCollisionChecker';

import SoundManager from '../../Systems/Sound/SoundManager';
import Sounds from '../../Data/Sounds';


/** The class where Hex shows up at the start */
export default class HexHealth extends Phaser.Group
{
    public onDeath: Phaser.Signal;

    private _HexHealth: number;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.setSignal();
        this.hexCollision();

        /** Check through hex's data and see how the part should be displayed */
    }

    private setSignal(): void
    {
        this.onDeath = new Phaser.Signal();
    }

    private setHexHealth(): void
    {
        if (this._HexHealth >= 200)
        {
            this._HexHealth = 200;
        }
        else if (this._HexHealth <= 0)
        {
            this._HexHealth = 0;

            this.onDeath.dispatch();
        }
    }

    private hexCollision(): void
    {
        this._HexHealth  = 200;

        PlayerCollisionChecker.getInstance().onColliding.add(() => {
            this.adjustHexHealth(-1);
            this.hexHit();
        });
        PlayerCollisionChecker.getInstance().onMissing.add(() => {
            this.adjustHexHealth(5);
        });

        PlayerCollisionChecker.getInstance().onCollidingPerfect.add( () => {

        this.adjustHexHealth(-5);
        this.hexHit();
        });

    }

    private adjustHexHealth(amount: number): void
    {
        this._HexHealth += amount;
    }

    /** Make Hex flash when hit and adjusts health */

    private hexHit(): void
    {
        this.setHexHealth();

        SoundManager.getInstance().play(Sounds.LOW_SOUND);
        this.game.camera.flash(0xff0000, 300, true, 0.1);
    }

    /** Destroy all the parts */
    public destroy(): void
    {
        super.destroy(true);
    }
}
