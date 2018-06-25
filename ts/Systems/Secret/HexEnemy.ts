import 'phaser-ce';

import Atlases from '../../Data/Atlases';

import HexHealth from '../Secret/HexHealth';
import HexAnimations from '../Secret/HexAnimations';

/** The class where Hex shows up at the start */
export default class HexEnemy extends Phaser.Group
{

    private _hexHealth: HexHealth;
    private _hexAnimations: HexAnimations;

    private _hexString: string;

    public static _HexSprite: Phaser.Sprite;
    public static defeated: boolean;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.collectHexString();

        this.addHexPart();
        this.animateHex();

        this.hexHealth();
        /** Check through hex's data and see how the part should be displayed */
    }

    private collectHexString(): void
    {
        this._hexString = 'Hex_Enemy';
    }


    private hexHealth(): void
    {
        this._hexHealth = new HexHealth(this.game);
        this.game.add.existing(this._hexHealth);

        this.defeatHex();
    }

    /** Go through the hex data and recheck if any parts are collected in which case hex should display the sprite which is not the silouette */
    private addHexPart(): void
    {
        /** Getting the data */ 
       HexEnemy._HexSprite = this.game.add.sprite(0, 0, Atlases.INTERFACE, this._hexString);
       HexEnemy._HexSprite.anchor.set(0.5);
       this.resize();
    }

    private animateHex(): void
    {
        this._hexAnimations = new HexAnimations(this.game);
        this.game.add.existing(this._hexAnimations);
    }

    private defeatHex(): void
    {
        this._hexHealth.onDeath.add(() =>
        {
            HexEnemy._HexSprite.visible = false;
            HexEnemy.defeated = true;
        });
    }

    /** Resize all the parts into their position */
    public resize(): void
    {
        let vmin: number = Math.min(this.game.height, this.game.width);

        HexEnemy._HexSprite.scale.set(vmin / GAME_WIDTH, vmin / GAME_WIDTH);
        HexEnemy._HexSprite.position.set(this.game.width / 2, this.game.height / 2 + 1);

        HexEnemy._HexSprite.scale.x = .25;
        HexEnemy._HexSprite.scale.y = .25;
    }

    /** Destroy all the parts */
    public destroy(): void
    {
        //TODO: you know what to do here
        super.destroy(true);

    }
}
