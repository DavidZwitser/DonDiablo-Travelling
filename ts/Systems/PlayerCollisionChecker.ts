/** Checks collision */
import Player from '../GameObjects/Interactable/Perspective/Player';
//import PickupCounter from '../GameObjects/Interactable/Paralax/UI/PickupCounter';
import { Lanes } from '../Enums/Lanes';

/**
 * Checks the collission between player and the pickups
 */
export default class PlayerCollisionChecker
{
    private _player: Player;
    private static instance: PlayerCollisionChecker = null;

    public onColliding: Phaser.Signal;
    public onCollidingPerfect: Phaser.Signal;
    public onMissing: Phaser.Signal;

    constructor(player: Player)
    {
        this._player = player;

        this.onColliding = new Phaser.Signal();
        this.onCollidingPerfect = new Phaser.Signal();
        this.onMissing = new Phaser.Signal();
    }

    /**
     * Returns true (1,2) if a pickup z and lane posittion matches the player.
     * Also checks whether the player is tapped for the perfect pickup
     */
    public isCollidingLanes(lane: Lanes): number
    {
        if ( this._player.lane !== lane) { return 0; }

        if (this._player.tapped)
        {
            //super pickup
            this._player.unTap();
            this.onCollidingPerfect.dispatch();
            return 2;
        }
        else
        {
            //Regular pickup
            this.onColliding.dispatch();
            return 1;
        }
    }

    /**
     * Destroys the collission checker class and removing all the signals
     */
    public destroy(): void
    {
        PlayerCollisionChecker.getInstance().onColliding.removeAll();
        PlayerCollisionChecker.getInstance().onCollidingPerfect.removeAll();
        PlayerCollisionChecker.getInstance().onMissing.removeAll();
    }

    /**
     * Instance of the object to make sure this object is the only one and can be called everywhere without scope defeinition.
     * @param player
     */
    public static getInstance(player?: Player): PlayerCollisionChecker
    {
        if (null === PlayerCollisionChecker.instance || player)
        {
            PlayerCollisionChecker.instance = new PlayerCollisionChecker(player);
        }

        return PlayerCollisionChecker.instance;
    }

    /**
     * Returns the playerposition
     */
    public get PlayerPos(): {x: number, y: number}
    {
        return {x: this._player.x, y: this._player.y};
    }

}
