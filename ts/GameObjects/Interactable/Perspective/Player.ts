import { Lanes } from '../../../Enums/Lanes';
import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';
import PerspectiveRenderer from '../../../Rendering/PerspectiveRenderer';
import Constants from '../../../Data/Constants';
import AtlasImages from '../../../Data/Atlases';

/** The player controlled by the user */
export default class Player extends ReactivePerspectiveObject
{
    public spine: any;
    public speed: number;
    public collectedPickup: Phaser.Signal;
    public tapped: boolean = false;
    private tappedTimeout: any;

    private _collectTween: Phaser.Tween;

    public static ANIMATION_DRIVE: string = 'drive';
    public static ANIMATION_TURN: string = 'turn';
    public static ANIMATION_LOSE: string = 'defeat';

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game, renderer, false);

        this.sprite = new Phaser.Sprite(this.game, 0, 0, AtlasImages.Interface, 'Spacecraft_Main');
        this.addChild(this.sprite);

        this.zPos = Constants.PLAYER_Z_POSITION;

        this.lane = Lanes.bottomLeftLane;

       /*
       this.spine = new PhaserSpine.Spine(<PhaserSpine.SpineGame>(this.game), 'Character');
       this.addChild(this.spine);

        SPINE / ANIMATIONS TEMPORARILY DISABLED.
        NO ANIMATIONS AVAILABLE
      */
    }

    private setAnimation(animation: string, loop: boolean = false): void
    {
        this.spine.setAnimationByName(0, animation, loop);

        this.spine.onComplete.addOnce( () => { if (!loop) {
            this.setAnimation(Player.ANIMATION_DRIVE, true);
        }});
    }

    public turn(): void
    {
        this.setAnimation(Player.ANIMATION_TURN, false);
    }

    public lose(): void
    {
        this.setAnimation(Player.ANIMATION_LOSE, false);
    }

    public pause( pause: boolean): void
    {
        this.spine.autoUpdate = !pause;
    }
    public changeLane( lane: Lanes ): void
    {
        if (this._lane === lane) {
            return;
        }
        super.changeLane(lane);
        this.tapping();
    }

    public tapping(duration: number = 150): void {
        if (this.tapped) {
            return;
        }
        this.tapped = true;
        this.sprite.frameName = 'Spacecraft_Main_Blink';
        this.tappedTimeout = setTimeout(this.unTap.bind(this), duration);
    }
    public unTap(): void
    {
        this.sprite.frameName = 'Spacecraft_Main';
        this.tapped = false;
    }

    public react(): void
    {
        if (this._collectTween)
        {
            this._collectTween.stop(true);
            this._collectTween = null;
        }

        let desiredScale: number = Math.min(this.scale.x, this.scale.y) * 1.05;

        this._collectTween = this.game.add.tween(this.scale)
            .to({x: desiredScale, y: desiredScale}, 160, Phaser.Easing.Cubic.Out, true, 0, 0, true)
            .start();
    }

    public destroy(): void
    {
        super.destroy();

        if (this.spine) { this.spine.destroy(true); }
        this.spine = null;

        clearTimeout(this.tappedTimeout);
        this.tappedTimeout = null;
    }
}
