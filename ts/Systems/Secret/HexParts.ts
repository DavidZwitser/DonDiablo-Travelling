import 'phaser-ce';

import Atlases from '../../Data/Atlases';

/** The class where Hex shows up at the start */
export default class HexParts extends Phaser.Group
{
    private _hexSpriteParts: string[];
    private _hexPartCounter: number = 0;

    public static currentHexSprite: Phaser.Sprite;


    constructor(game: Phaser.Game)
    {
        super(game);

        this.collectHexSprites();
        this.repeatHexParts();

        /** Check through hex's data and see how the part should be displayed */
    }

    private repeatHexParts(): void
    {
        this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 8, this.animateHexPart, this);
    }

    private collectHexSprites(): void
    {

        /** Here we will be collecting the data of all hex parts. 
         * 8 pieces will be put into the array of strings.
         */

        this._hexSpriteParts = new Array<string>();

        this._hexSpriteParts[0] = 'Chip';
        this._hexSpriteParts[1] = 'Hearth';
        this._hexSpriteParts[2] = 'Left_arm';
        this._hexSpriteParts[3] = 'Battery';
        this._hexSpriteParts[4] = 'Screws';
        this._hexSpriteParts[5] = 'Booster';
        this._hexSpriteParts[6] = 'Wires';
        this._hexSpriteParts[7] = 'Torso';
        this._hexSpriteParts[8] = 'Head';
    }

    /** Go through the hex data and recheck if any parts are collected in which case hex should display the sprite which is not the silouette */
    public addHexPart(random: boolean): void
    {
        /** adding the specific part onto the screen */

        if (!random)
        {
            HexParts.currentHexSprite = this.game.add.sprite(0, 0, Atlases.INTERFACE, this._hexSpriteParts[this._hexPartCounter]);
            this.countHexPart();
        }

        else
        {
            HexParts.currentHexSprite = this.game.add.sprite(0, 0, Atlases.INTERFACE, this._hexSpriteParts[this.game.rnd.integerInRange(0, 6)]);
        }

        HexParts.currentHexSprite.anchor.set(0.5);
        this.resize();
    }

    /** Counts the current hex part */

    private countHexPart(): void
    {
        this._hexPartCounter += 1;
    }

    private animateHexPart(): void
    {
        this.addHexPart(false);

        HexParts.currentHexSprite.scale.x = .5;
        HexParts.currentHexSprite.scale.y = .5;

        HexParts.currentHexSprite.x -= 200;

        this.game.add.tween(HexParts.currentHexSprite).to({alpha: .5, x: HexParts.currentHexSprite.position.x + 200}, 2000, Phaser.Easing.Cubic.Out, true)
        .onComplete.addOnce(() => {
            setTimeout( () => {
                this.game.add.tween(HexParts.currentHexSprite).to({alpha: 0, x: HexParts.currentHexSprite.position.x + 200}, 1500, Phaser.Easing.Cubic.In, true);
            }, 500);

        });
    }

    /** Resize all the parts into their position */
    public resize(): void
    {
        let vmin: number = Math.min(this.game.height, this.game.width);

        HexParts.currentHexSprite.position.set(this.game.width / 2, this.game.height / 2);
        HexParts.currentHexSprite.scale.set(vmin / GAME_WIDTH);
    }

    /** Destroy all the parts */
    public destroy(): void
    {
        //TODO: you know what to do here
        super.destroy(true);
    }
}
