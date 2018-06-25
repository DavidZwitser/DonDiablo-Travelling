import Window from './HexPartsViewerWindow';
import {IHexBodyPart, IHexPart} from '../HexPartsData';
import Atlases from '../../../../../../Data/Atlases';

/** Shows the window of the parts */
export default class PartsWindow extends Window
{
    /** The part displayed in the center of the window */
    private _centerImage: Phaser.Sprite;
    /** The tween that makes the center image look like its breathing */
    private _breathingTween: Phaser.Tween;

    /** The mask for the sub parts so they can disapear below the window nicely */
    private _mask: Phaser.Graphics;

    /** The pickups */
    private _subParts: Phaser.Sprite[];

    constructor(game: Phaser.Game)
    {
        super(game, 'a part', 'Hex_Collecting_UI_Screen');

        /* Initializeing the center image */
        this._centerImage = new Phaser.Sprite(game, 0, 0, Atlases.INTERFACE, '');
        this._centerImage.anchor.set(.5);
        this.addChild(this._centerImage);

        /* Starting the breathing tween for the center image */
        this._centerImage.y = this.game.height * -.005;
        this._breathingTween = this.game.add.tween(this._centerImage)
            .to({y: this.game.height * .005}, 1800, Phaser.Easing.Cubic.InOut, true, 0, Infinity, true)
            .start();

        /* Initializing the mask for the sub pickups */
        this._mask = new Phaser.Graphics(this.game);
        this.addChild(this._mask);

        this._subParts = [];

        /* Adding all the sub pickups */
        for (let i: number = 0; i < 4; i++ )
        {
            console.log(i);
            this._subParts.push(new Phaser.Sprite(game, 0, 0, Atlases.INTERFACE, ''));

            let currentPickup: Phaser.Sprite = this._subParts[i];

            currentPickup.anchor.set(.5);
            currentPickup.mask = this._mask;
            this.addChild(currentPickup);

        }

        /* Hiding the window by default */
        this.visible = false;
    }

    /** Animate this window in or out */
    public animateWindow(targetScale: number, duration: number): Phaser.Tween
    {
        /* Showing the window */
        this.visible = true;

        /* Calling and saving the super tween */
        let superTween: Phaser.Tween = super.animateWindow(targetScale, duration);

        /* Staring the center image scale tween */
        this.tweens.push(
            this.game.add.tween(this._centerImage.scale)
                .to({x: targetScale, y: targetScale}, duration, Phaser.Easing.Cubic.Out)
                .start()
        );

        /* Starting the sub pickups hide tween */
        let targetY: number = targetScale > 0 ? this.height * .38 : this.height * .6;

        for (let i: number = this._subParts.length; i--; )
        {
            this.tweens.push(

                this.game.add.tween(this._subParts[i])
                    .to({y: targetY}, duration, Phaser.Easing.Cubic.Out)
                    .start()
            );
        }

        /* Returning the super tween */
        return superTween;
    }

    /** Pre load the part that you want to show */
    public loadPart(data: IHexBodyPart): void
    {
        /** The boolean noting if all the sub parts are collected */
        let allSubPartsAreCollected: boolean = true;

        /* Looping through all the sub parts */
        for (let i: number = this._subParts.length; i--; )
        {
            /* Saving the sub part */
            let currentSubPart: Phaser.Sprite = this._subParts[i];
            currentSubPart.visible = false;

            /* Checking if the sub part data exists */
            let subPartData: IHexPart = null;
            try
            {
                subPartData = data.subParts[ <any>Object.keys( data.subParts )[i] ];
            } catch (e) { console.log('did not find sub part: ' + i); }

            /* If not, go to next part */
            if (!subPartData) { continue; }

            /* If a part is not collected, set all parts as not collected */
            if (subPartData.collected === false) { allSubPartsAreCollected = false; }

            /* If it is collected, show the full image, otherwise only show the silhouette */
            currentSubPart.frameName = subPartData.frameName + (subPartData.collected ? '' :  '_silhouette');

            /* Show this sub part */
            currentSubPart.visible = true;
        }

        /* Set the name to the name of the center image */
        this.contentName.text = data.name;
        /* Set the center image's frame name to the part being collected or not */
        this._centerImage.frameName = data.frameName + (allSubPartsAreCollected ? '' : '_silhouette');

    }

    /** Resize all its components */
    public resize(): void
    {
        super.resize();

        /* Redraw the mask */
        this._mask.beginFill(0xff0ff0);
        this._mask.drawRect(0, 0, this.width, this.height * .98);
        this._mask.endFill();

        /* Position the mask */
        this._mask.x = this.width * -.5;
        this._mask.y = this.height * -.5;

        /* Set the center image's scale to 0 by default */
        this._centerImage.scale.set(0);

        /* Reposition the sub pickups to their default position */
        for (let i: number = this._subParts.length; i--; )
        {
            let currentPart: Phaser.Sprite = this._subParts[i];

            currentPart.x = this.game.width * (-.3 + (2 * i / 10) );
            currentPart.y = this.game.height * 6;
        }

    }

    /** Destroy all the components */
    public destroy(): void
    {
        super.destroy();

        /* Destroy center image */
        if (this._centerImage) { this._centerImage.destroy(true); }
        this._centerImage = null;

        /* Destroy the breathing tween */
        if (this._breathingTween) { this._breathingTween.stop(true); }
        this._breathingTween = null;

        /* Destroy the mask */
        if (this._mask) { this._mask.destroy(true); }
        this._mask = null;

        if (this._subParts)
        {
            /* Destroy the sub pickups */
            for (let i: number = this._subParts.length; i--; )
            {
                let currentPart: Phaser.Sprite = this._subParts[i];

                currentPart.destroy(true);
                currentPart = null;
            }
        }
        this._subParts = null;
    }
}
