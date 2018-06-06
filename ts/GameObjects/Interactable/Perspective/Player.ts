import { Lanes } from '../../../Enums/Lanes';
import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';
import PerspectiveRenderer from '../../../Rendering/PerspectiveRenderer';
import Constants from '../../../Data/Constants';
import AtlasImages from '../../../Data/Atlases';
import SoundManager from '../../../Systems/Sound/SoundManager';
import Sounds from '../../../Data/Sounds';
import SaveData from '../../../BackEnd/SaveData';

/** The player controlled by the user */
export default class Player extends ReactivePerspectiveObject
{
    public spine: any;
    public speed: number;
    public onPickupCollect: Phaser.Signal;
    public tapped: boolean = false;
    private tappedTimeoutID: number;

    public static ANIMATION_DRIVE: string = 'drive';
    public static ANIMATION_TURN: string = 'turn';
    public static ANIMATION_LOSE: string = 'defeat';

    private typeCar: number;

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game, renderer);

        this.sprite = new Phaser.Sprite(this.game, 0, 0, AtlasImages.INTERFACE, 'Spacecraft_Main');
        this.addChild(this.sprite);

        this.zPos = Constants.PLAYER_Z_POSITION;

        this.lane = Lanes.bottomLeftLane;

        this.typeCar = SaveData.SelectedCar + 1;

        this.changeSprite();
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

    public changeLane( lane: Lanes, overwriteOldPosition: boolean = false ): Phaser.Signal
    {
        let changeLaneTweenOnComplete: Phaser.Signal = super.changeLane(lane, overwriteOldPosition);

        if (!changeLaneTweenOnComplete) { return; }

        changeLaneTweenOnComplete.addOnce( () => {
            this.changeSprite();
        });
        requestAnimationFrame(this.changeSprite.bind(this));
        SoundManager.getInstance().play(Sounds.WOOSH);
        this.tapping();

        return changeLaneTweenOnComplete;
    }

    public tapping(duration: number = 200): void
    {
        if (this.tapped) { return; }

        this.tapped = true;
        this.changeSpriteBlink();
        this.tappedTimeoutID = setTimeout(this.unTap.bind(this), duration);
    }

    public unTap(): void
    {
        this.changeSprite();
        this.tapped = false;
    }

    public react(): void
    {
        super.react(1.05, 160);
    }

    private changeSprite(): void
    {
        if (this._lane === Lanes.bottomCenterLane || this._lane === Lanes.topCenterLane)
        {
            this.sprite.frameName = 'ingame_vehicle_' + this.typeCar + '_straight';
        }
        else if (this._lane === Lanes.bottomLeftLane || this._lane === Lanes.topLeftLane)
        {
            this.sprite.frameName = 'ingame_vehicle_' + this.typeCar + '_sideview_left';
        }
        else if (this._lane === Lanes.bottomRightLane || this._lane === Lanes.topRightLane)
        {
            this.sprite.frameName = 'ingame_vehicle_' + this.typeCar + '_sideview_right';
        }
    }

    private changeSpriteBlink(): void
    {
        if (this._lane === Lanes.bottomCenterLane || this._lane === Lanes.topCenterLane)
        {
            this.sprite.frameName = 'ingame_vehicle_' + this.typeCar + '_straight_blink';
        }
        else if (this._lane === Lanes.bottomLeftLane || this._lane === Lanes.topLeftLane)
        {
            this.sprite.frameName = 'ingame_vehicle_' + this.typeCar + '_sideview_left_blink';
        }
        else if (this._lane === Lanes.bottomRightLane || this._lane === Lanes.topRightLane)
        {
            this.sprite.frameName = 'ingame_vehicle_' + this.typeCar + '_sideview_right_blink';
        }
    }

    public destroy(): void
    {
        super.destroy();

        if (this.spine) { this.spine.destroy(true); }
        this.spine = null;

        clearTimeout(this.tappedTimeoutID);
        this.tappedTimeoutID = null;
    }

}
