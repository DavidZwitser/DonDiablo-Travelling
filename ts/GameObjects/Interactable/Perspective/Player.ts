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

    private typeCar: number;

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game, renderer);

        this.sprite = new Phaser.Sprite(this.game, 0, 0, AtlasImages.INTERFACE, 'Spacecraft_Main');
        this.addChild(this.sprite);

        this.zPos = Constants.PLAYER_Z_POSITION;

        this.lane = Lanes.bottomLeftLane;

        this.typeCar = SaveData.SELECTED_CAR + 1;

        this.updateSprite();
    }

    public changeLane( lane: Lanes, overwriteOldPosition: boolean = false ): Phaser.Signal
    {
        let changeLaneTweenOnComplete: Phaser.Signal = super.changeLane(lane, overwriteOldPosition);

        if (!changeLaneTweenOnComplete) { return; }

        changeLaneTweenOnComplete.addOnce( () => {
            this.updateSprite();
        });
        requestAnimationFrame(this.updateSprite.bind(this));
        SoundManager.getInstance().play(Sounds.WOOSH);
        this.tapping();

        return changeLaneTweenOnComplete;
    }

    /** Called when tapping, this function let the car be in a special state where it can collect a pickup perfectly for duration miliseconds,
     * after that the untap() gets called
     */
    public tapping(duration: number = 200): void
    {
        if (this.tapped) { return; }

        this.tapped = true;
        this.changeSpriteBlink();
        this.tappedTimeoutID = setTimeout(this.unTap.bind(this), duration);
    }

    /** The car is in its normal state */
    public unTap(): void
    {
        this.updateSprite();
        this.tapped = false;
    }

    /** React to music */
    public react(): void
    {
        super.react(1.05, 160);
    }

    /** Updates the car sprite to match it state and surroundings */
    private updateSprite(): void
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

    /** Blinks the car sprite to blink */
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
