/** Checks collision */
import Player from '../GameObjects/Interactable/Perspective/Player';
//import PickupCounter from '../GameObjects/Interactable/Paralax/UI/PickupCounter';
import { Lanes } from '../Enums/Lanes';
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

    public destroy(): void
    {
        PlayerCollisionChecker.getInstance().onColliding.removeAll();
        PlayerCollisionChecker.getInstance().onMissing.removeAll();
    }

    public static getInstance(player?: Player): PlayerCollisionChecker
    {
        if (null === PlayerCollisionChecker.instance && player)
        {
            PlayerCollisionChecker.instance = new PlayerCollisionChecker(player);
        }

        return PlayerCollisionChecker.instance;
    }

}
