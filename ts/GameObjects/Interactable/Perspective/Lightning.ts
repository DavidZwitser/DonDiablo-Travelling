import 'phaser-ce';
import IGame from '../../../PluginManagers/IGame';
import ReactivePerspectiveObject from '../../../Rendering/Sprites/ReactivePerspectiveObject';
import PerspectiveRenderer from '../../../Rendering/PerspectiveRenderer';
import Spines from '../../../Data/Spines';
import Constants from '../../../Data/Constants';
import { Lanes } from '../../../Enums/Lanes';

export default class Lightning extends ReactivePerspectiveObject
{
    /** The character as a spine object */
    public spine: PhaserSpine.Spine;

    /** A reference to the game */
    public game: IGame;

    /** The animations in the character */
    public static ANIMATION_LIGHTNING: string = 'animation';
    public static ANIMATION_LIGHTNING2: string = 'animation2';

    constructor(game: Phaser.Game, renderer: PerspectiveRenderer)
    {
        super(game, renderer);

        //art assigning
        this.spine = new PhaserSpine.Spine(<PhaserSpine.SpineGame>(this.game), Spines.Lightning);
        this.spine.alpha = 0.8;
        this.addChild(this.spine);

        this.zPos = Constants.PLAYER_Z_POSITION;
        this.lane = Lanes.bottomLeftLane;
        this.alpha = 0;
        this.setAnimation(Lightning.ANIMATION_LIGHTNING, false);
        setTimeout(() => {
            this.alpha = 1;
        }, 500);
    }

    /** Animation is set for the character spine */
    private setAnimation(animation: string, loop: boolean = false): void
    {
        this.spine.setAnimationByName(0, animation, loop);
    }

    public initiateThunder(lane: Lanes): void {
        this.lane = lane;
        if (this.lane === Lanes.topLeftLane || this.lane === Lanes.topCenterLane || this.lane === Lanes.topRightLane) {
            this.spine.scale.y = -1;
            this.spine.y = 100;

        } else {
            this.spine.scale.y = 1;
            this.spine.y = -100;
        }
        let str: string = Math.random() > 0.5 ? Lightning.ANIMATION_LIGHTNING : Lightning.ANIMATION_LIGHTNING2;
        this.setAnimation(str);
    }

    /** spine animation is paused */
    public pause( pause: boolean): void
    {
        this.spine.autoUpdate = !pause;
    }

    /** destroys the character spine and shadow spine */
    public destroy(): void
    {
        super.destroy();

        if (this.spine) { this.spine.destroy(true); }
        this.spine = null;

    }
}
