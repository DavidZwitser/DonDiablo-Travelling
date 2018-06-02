import Window from './HexPartsViewerWindow';
import {IHexBodyPart, IHexPart} from '../HexPartsData';
import Atlases from '../../../../../../Data/Atlases';

export default class PartsWindow extends Window
{
    /** The part displayed in the center of the window */
    private _centerImage: Phaser.Sprite;
    /** The tween that makes the center image look like its breathing */
    private _breathingTween: Phaser.Tween;

    /** The mask for the sub parts so they can disapear below the window nicely */
    private _mask: Phaser.Graphics;

    /** The 1st sub pickup */
    private _subPickup1: Phaser.Sprite;
    /** The 2nd sub pickup */
    private _subPickup2: Phaser.Sprite;
    /** The 3rd sub pickup */
    private _subPickup3: Phaser.Sprite;

    constructor(game: Phaser.Game)
    {
        super(game, 'a part', 'Hex_Collecting_UI_Screen');

        /* Initializeing the center image */
        this._centerImage = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
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

        /* Creating the sub pickups */
        this._subPickup1 = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
        this._subPickup1.anchor.set(.5);
        this._subPickup1.mask = this._mask;
        this.addChild(this._subPickup1);

        this._subPickup2 = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
        this._subPickup2.anchor.set(.5);
        this._subPickup2.mask = this._mask;
        this.addChild(this._subPickup2);

        this._subPickup3 = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
        this._subPickup3.anchor.set(.5);
        this._subPickup3.mask = this._mask;
        this.addChild(this._subPickup3);

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

        this.tweens.push(

            this.game.add.tween(this._subPickup1)
                .to({y: targetY}, duration, Phaser.Easing.Cubic.Out)
                .start(),

            this.game.add.tween(this._subPickup2)
                .to({y: targetY}, duration, Phaser.Easing.Cubic.Out)
                .start(),

            this.game.add.tween(this._subPickup3)
                .to({y: targetY}, duration, Phaser.Easing.Cubic.Out)
                .start()

        );

        /* Returning the super tween */
        return superTween;
    }

    /** Pre load the part that you want to show */
    public loadPart(data: IHexBodyPart): void
    {
        /* Hiding all the sub pickups by default */
        this._subPickup1.visible = false;
        this._subPickup2.visible = false;
        this._subPickup3.visible = false;

        /** The boolean noting if all the pickups are collected */
        let allSubPartsAreCollected: boolean = true;

        /* Looping through the sub pickups to set their frame names and or showing them or not */
        Object.keys(data.subParts).forEach( (key: any, index: number) => {

            let currentPart: IHexPart = data.subParts[key];
            /* If it is collected, show the full image, otherwise only show the silhouette */
            let newFrameName: string = currentPart.frameName + (currentPart.collected ? '' :  '_silhouette');

            /* If it is not collected, set the "everything collected" boolean to false */
            if (currentPart.collected === false) { allSubPartsAreCollected = false; }

            /** Check which sub pickups it is and set the according sprite in the class to its values */
            switch (index)
            {
                case 0:
                    this._subPickup1.frameName = newFrameName;
                    this._subPickup1.visible = true;
                    break;

                case 1:
                    this._subPickup2.frameName = newFrameName;
                    this._subPickup2.visible = true;
                    break;

                case 2:
                    this._subPickup3.frameName = newFrameName;
                    this._subPickup3.visible = true;
                    break;

                default:
                    break;
            }

        });

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
        this._subPickup1.x = this.width * -.3;
        this._subPickup1.y = this.game.height * .6;

        this._subPickup2.y = this.game.height * .6;

        this._subPickup3.x = this.width * .3;
        this._subPickup3.y = this.game.height * .6;

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

        /* Destroy the sub pickups */
        if (this._subPickup1) { this._subPickup1.destroy(true); }
        this._subPickup1 = null;

        if (this._subPickup2) { this._subPickup2.destroy(true); }
        this._subPickup2 = null;

        if (this._subPickup3) { this._subPickup3.destroy(true); }
        this._subPickup3 = null;
    }
}
