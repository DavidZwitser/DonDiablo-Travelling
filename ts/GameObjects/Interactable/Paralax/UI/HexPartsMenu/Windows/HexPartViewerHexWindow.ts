import Window from './HexPartsViewerWindow';

import {HexBodyParts} from '../HexPartsData';

import HexPiecedTogether from './Content/HexPiecedTogether';

export default class HexWindow extends Window
{
    private _hex: HexPiecedTogether;
    private _breathingTween: Phaser.Tween;

    public onPartClick: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game, 'Hex', 'Hex_Collecting_UI_Screen');

        this.onPartClick = new Phaser.Signal();

        this._hex = new HexPiecedTogether(game);
        this._hex.y = this.game.height * .025;
        this.addChild(this._hex);

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

        this.resize();
    }

    public animateScale(targetScale: number, duration: number): Phaser.Tween
    {
        let superTween: Phaser.Tween = super.animateScale(targetScale, duration);

        this.tweens.push(
            this.game.add.tween(this._hex.scale)
                .to({x: targetScale, y: targetScale}, duration, Phaser.Easing.Cubic.Out)
                .start()
        );

        return superTween;
    }

    public recheckCollectedParts(): void
    {
        this._hex.recheckCollectedParts();
    }

    public resize(): void
    {
        super.resize();

        this._hex.y = this.game.height * .05;
        this._hex.resize();
    }

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
