import 'phaser-ce';

import Atlases from '../../Data/Atlases';
import AtlasImages from '../../Data/AtlasImages';
// constants
//secret

/** The class where Hex shows up at the start */
export default class HexPartsSecret extends Phaser.Group
{

    private _hexSpriteParts: string[];
    private _hexPartCounter: number = 0;

    private _currentHexSprite: Phaser.Sprite;

    private _hexChipSprite: string = 'Chip';

    constructor(game: Phaser.Game)
    {
        super(game);

        this.collectHexSprites();
        this.repeatHexParts();

        /** Check through hex's data and see how the part should be displayed */
    }

    private repeatHexParts(): void
    {
        this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 10, this.animateHexPart, this);
    }

    private collectHexSprites(): void
    {

        this._hexSpriteParts = new Array<string>();

        this._hexSpriteParts[0] = 'Chip';
        this._hexSpriteParts[1] = 'Hearth';
        this._hexSpriteParts[2] = 'Left_arm';
        this._hexSpriteParts[3] = 'Battery';
        this._hexSpriteParts[4] = 'Screws';
        this._hexSpriteParts[5] = 'Booster';
        this._hexSpriteParts[6] = 'Wires';
        this._hexSpriteParts[7] = 'Neck';
        this._hexSpriteParts[8] = 'Metal';
        this._hexSpriteParts[9] = 'Torso';
        this._hexSpriteParts[10] = 'Head';
    }

    /** Go through the hex data and recheck if any parts are collected in which case hex should display the sprite which is not the silouette */
    public addHexPart(): void
    {
        /** Getting the data */
       // this.game.add.existing(this._hexSpriteParts[this._hexPartCounter]);
       this._currentHexSprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, Atlases.INTERFACE, this._hexSpriteParts[this._hexPartCounter]);
       this.countHexPart();
    }

    /** Counts the current hex part */

    private countHexPart(): void
    {
        this._hexPartCounter += 1;
    }

    private animateHexPart(): void
    {
        this.addHexPart();

        this.game.add.tween(this._currentHexSprite).to({alpha: .5, x: this._currentHexSprite.position.x + 200}, 2000, Phaser.Easing.Cubic.Out, true)
        .onComplete.addOnce(() => {
            setTimeout( () => {
                this.game.add.tween(this._currentHexSprite).to({alpha: 0, x: this._currentHexSprite.position.x + 200}, 1500, Phaser.Easing.Cubic.In, true);
            }, 500);

        });
    }

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
