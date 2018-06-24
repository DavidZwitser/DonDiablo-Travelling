import 'phaser-ce';

import Atlases from '../../Data/Atlases';
import HexHealth from '../Secret/HexHealth';

/** The class where Hex shows up at the start */
export default class HexPartsSecret extends Phaser.Group
{

    private _hexHealth: HexHealth;

    private _HexSprite: Phaser.Sprite;
    private _hexString: string;


    constructor(game: Phaser.Game)
    {
        super(game);

        this.hexHealth();

        this.collectHexString();
        this.animateHex();

       

        /** Check through hex's data and see how the part should be displayed */
    }

    private repeatHexParts(): void
    {
     //   this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 10, this.animateHexPart, this);
    }

    private collectHexString(): void
    {
        this._hexString = 'Hex_Enemy';
    }


    private hexHealth(): void
    {
        this._hexHealth = new HexHealth(this.game);
        this.game.add.existing(this._hexHealth);
    }

    /** Go through the hex data and recheck if any parts are collected in which case hex should display the sprite which is not the silouette */
    private addHexPart(): void
    {
        /** Getting the data */
        
       this._HexSprite = this.game.add.sprite(0, 0, Atlases.INTERFACE, this._hexString);
       this._HexSprite.anchor.set(0.5);
       this.resize();
    }

    private animateHex(): void
    {
        this.addHexPart();

        this.game.add.tween(this._HexSprite).from( { y: -100 }, 2000, Phaser.Easing.Bounce.Out, true).onComplete.addOnce(() => 
        {
            setTimeout( () => {
                this.game.add.tween(this._HexSprite).to({x: 200}, 1500, Phaser.Easing.Cubic.In, true);
            }, 500);
        });

       // this.game.add.tween(this._HexSprite.position).to( {y: 100}, 2200, Phaser.Easing.Sinusoidal.InOut, true, 2000, 20, true).loop(true);
    }

    /** Resize all the parts into their position */
    public resize(): void
    {
        let vmin: number = Math.min(this.game.height, this.game.width);

        this._HexSprite.scale.set(vmin / GAME_WIDTH, vmin / GAME_WIDTH);
        this._HexSprite.position.set(this.game.width / 2, this.game.height / 2 + 1);

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
