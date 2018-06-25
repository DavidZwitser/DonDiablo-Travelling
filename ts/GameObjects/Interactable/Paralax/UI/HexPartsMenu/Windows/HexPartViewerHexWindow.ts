import Window from './HexPartsViewerWindow';

import {HexBodyParts} from '../HexPartsData';

import HexPiecedTogether from './Content/HexPiecedTogether';

/** The window showing hex where you can click on its individual parts */
export default class HexWindow extends Window
{
    /** The class where hex's sprites are peasedtothether into one group */
    private _hex: HexPiecedTogether;
    /** The tween that makes hex look like he is breathing */
    private _breathingTween: Phaser.Tween;

    /** The signal that fires when a part is clicked (will return which part it is) */
    public onPartClick: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game, 'Hex', 'Hex_Collecting_UI_Screen');

        /* Setting the part signal */
        this.onPartClick = new Phaser.Signal();

        /* Adding hex */
        this._hex = new HexPiecedTogether(game);
        this._hex.y = this.game.height * .025;
        this.addChild(this._hex);

        /* Starting the breathing tween */
        this._breathingTween = this.game.add.tween(this._hex)
            .to({y: this.game.height * .035}, 1800, Phaser.Easing.Cubic.InOut, true, 0, Infinity, true)
            .start();

        /** Setting up inputs! */
        this._hex.neck.inputEnabled = true;
        this._hex.neck.events.onInputUp.add( () => this.onPartClick.dispatch(HexBodyParts.neck));

        this._hex.torso.inputEnabled = true;
        this._hex.torso.events.onInputUp.add( () => this.onPartClick.dispatch(HexBodyParts.torso) );

        this._hex.head.inputEnabled = true;
        this._hex.head.events.onInputUp.add( () => this.onPartClick.dispatch(HexBodyParts.head) );

        this._hex.leftArm.inputEnabled = true;
        this._hex.leftArm.events.onInputUp.add( () => this.onPartClick.dispatch(HexBodyParts.leftArm) );

        this._hex.rightArm.inputEnabled = true;
        this._hex.rightArm.events.onInputUp.add( () => this.onPartClick.dispatch(HexBodyParts.rightArm) );

        this._hex.booster.inputEnabled = true;
        this._hex.booster.events.onInputUp.add( () => this.onPartClick.dispatch(HexBodyParts.booster) );

        /* Rest */
        this.resize();
    }

    /** Animate the window in or out */
    public animateWindow(targetScale: number, duration: number): Phaser.Tween
    {
        /* Calling super and saving what it returns */
        let superTween: Phaser.Tween = super.animateWindow(targetScale, duration);

        /* Starting the hex hide tween */
        this.tweens.push(
            this.game.add.tween(this._hex.scale)
                .to({x: targetScale, y: targetScale}, duration, Phaser.Easing.Cubic.Out)
                .start()
        );

        /* Returning the super tween */
        return superTween;
    }

    /** Resize all the elements */
    public resize(): void
    {
        super.resize();

        this._hex.y = this.game.height * .05;
        this._hex.resize();
    }

    /** Destroy all the elements */
    public destroy(): void
    {
        super.destroy();

        if (this._hex) { this._hex.destroy(); }
        this._hex = null;

        if (this._breathingTween) { this._breathingTween.stop(true); }
        this._breathingTween = null;

        if (this.onPartClick) { this.onPartClick.removeAll(); }
        this.onPartClick = null;
    }
}
