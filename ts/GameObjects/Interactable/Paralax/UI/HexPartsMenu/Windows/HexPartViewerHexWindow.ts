import Window from './HexPartsViewerWindow';

import {HexBodyParts} from '../HexPartsData';

import HexPiecedTogether from './Content/HexPiecedTogether';

export default class HexWindow extends Window
{
    private _hex: HexPiecedTogether;

    public onPartClick: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game, 'Hex', 'Hex_Collecting_UI_Screen');

        this.onPartClick = new Phaser.Signal();

        this._hex = new HexPiecedTogether(game);
        this.addChild(this._hex);

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

    public animateScale(targetScale: number, duration: number): Phaser.Signal
    {
        this.game.add.tween(this._hex.scale)
            .to({x: targetScale, y: targetScale}, duration, Phaser.Easing.Cubic.Out)
            .start();

        return super.animateScale(targetScale, duration);
    }

    public recheckCollectedParts(): void
    {
        this._hex.recheckCollectedParts();
    }

    public resize(): void
    {
        super.resize();

        this._hex.resize();
    }
}
