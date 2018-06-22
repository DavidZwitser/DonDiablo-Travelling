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

        this.collectHexString();
        this.animateHex();

        this.hexHealth();

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
        this.hexHealth = new HexHealth(this.game);
        this.game.add.existing(this.hexHealth);
    }

    /** Go through the hex data and recheck if any parts are collected in which case hex should display the sprite which is not the silouette */
    public addHexPart(): void
    {
        /** Getting the data */
       // this.game.add.existing(this._hexSpriteParts[this._hexPartCounter]);
       this._HexSprite = this.game.add.sprite(0, 0, Atlases.INTERFACE, this._hexString);
       this.resize();
    }

    private animateHex(): void
    {
        this.addHexPart();

        this.game.add.tween(this._HexSprite.position).to( {y: 100}, 2200, Phaser.Easing.Sinusoidal.InOut, true, 2000, 20, true).loop(true);
    }

    /** Resize all the parts into their position */
    public resize(): void
    {
        let vmin: number = Math.min(this.game.height, this.game.width);

        this._HexSprite.position.set(this.game.width / 3.5, this.game.height / 2);
        this._HexSprite.scale.set(vmin / GAME_WIDTH);

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
