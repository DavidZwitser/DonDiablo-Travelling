import 'phaser-ce';

import Atlases from '../../Data/Atlases';
import PlayerCollisionChecker from '../PlayerCollisionChecker';

import HexEnemy from '../Secret/HexEnemy';
import HexParts from '../Secret/HexParts';

/** The class where Hex shows up at the start */
export default class HexAnimations extends Phaser.Group
{

    private _hexSprite: Phaser.Sprite;
    private _brokenHexSprite: any;

    constructor(game: Phaser.Game)
    {
        super(game);
        this.entryHex();

        this.signalHex();

        /** Check through hex's data and see how the part should be displayed */
    }

    private signalHex(): void
    {

         /** Normal Hit */

        PlayerCollisionChecker.getInstance().onColliding.add(() => {
            this.hurtHex();
        });

         /** Super Hit */

        PlayerCollisionChecker.getInstance().onCollidingPerfect.add( () => {
            this.hurtHex();
        });

         /** Recovery Hex */

        PlayerCollisionChecker.getInstance().onMissing.add(() => {
         //   this.adjustHexHealth(5);
        });

        
    }

    private entryHex(): void
    {
        this._hexSprite = HexEnemy._HexSprite;

        this.game.add.tween(this._hexSprite).from( { y: -100 }, 2000, Phaser.Easing.Bounce.Out, true).onComplete.addOnce(() => 
        {
            this.movingHex();
        });

       // this.game.add.tween(this._HexSprite.position).to( {y: 100}, 2200, Phaser.Easing.Sinusoidal.InOut, true, 2000, 20, true).loop(true);
    }

    private movingHex(): void
    {

    }

    private hurtHex(): void
    {
        this.lightUpHex(0xff0000);
        this.addDamageParticle();
    }

    private recoveryHex(): void
    {
        this.lightUpHex(0x00ff00);
    }

    private lightUpHex(color: Phaser.Color): void
    {
        this.game.add.tween(this._hexSprite).to({
            tint: color,
        }, 100, Phaser.Easing.Exponential.Out, true, 0, 0, true);

    }

    private addDamageParticle(): Phaser.Particles.Arcade.Emitter 
    {

        let emitter: Phaser.Particles.Arcade.Emitter = new Phaser.Particles.Arcade.Emitter(this.game, 0, 0, 50);

        this.game.add.emitter(0, 0, 100);
        emitter.makeParticles(Atlases.INTERFACE, 'Chip');

        emitter.gravity.y = 500;

        emitter.x = this._hexSprite.x;
        emitter.y = this._hexSprite.y;

        emitter.start(true, 4000, null, 5);

        // this.game.time.events.add(3000, destroyEmitter, this);

        return emitter;
    }


    private defeatHex(): void
    {

    }

    /** Resize all the parts into their position */
    public resize(): void
    {
        let vmin: number = Math.min(this.game.height, this.game.width);

        this._HexSprite.scale.set(vmin / GAME_WIDTH, vmin / GAME_WIDTH);

        this._HexSprite.scale.x = .25;
        this._HexSprite.scale.y = .25;
    }

    /** Destroy all the parts */
    public destroy(): void
    {
        //TODO: you know what to do here
        super.destroy(true);

    }
}
