import { Lanes } from '../../../Enums/Lanes';
import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';

import AtlasImages from '../../../Data/Atlases';

/** The player controlled by the user */
export default class Player extends ReactivePerspectiveObject implements Phaser.Sprite
{
    private _currentLane: Lanes;

    private _playerSprite: Phaser.Sprite;

    public spine: any;
    public speed: number;
    public collectedPickup: Phaser.Signal;

    public static ANIMATION_DRIVE: string = 'drive';
    public static ANIMATION_TURN: string = 'turn';
    public static ANIMATION_LOSE: string = 'defeat';

    constructor(game: Phaser.Game)
    {
       super(game);

       this._playerSprite = this.game.add.sprite(this.game.width / 3, this.game.height / 1.25, AtlasImages.Interface, 'Spacecraft_Main');

       this.spine = new PhaserSpine.Spine(<PhaserSpine.SpineGame>(this.game), 'Character');
      // this.addChild(this.spine);

      /*
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
        /* So no tslint errors will be thrown */
        lane = lane;
        //
    }

    public reactToMusic(): void
    {
        //
    }

    public destroy(): void
    {
        super.destroy(true);

        if (this.spine) { this.spine.destroy(true); }
        this.spine = null;
    }

}
