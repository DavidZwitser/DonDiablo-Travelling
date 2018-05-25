/** Checks collision */
import Player from '../GameObjects/Interactable/Perspective/Player';
import { Lanes } from '../Enums/Lanes';
export default class PlayerCollisionChecker
{
    private _player: Player;
    private static instance: PlayerCollisionChecker = null;

    public onColliding: Phaser.Signal;
    public onMissing: Phaser.Signal;

    constructor(player: Player)
    {
        this._player = player;
        this.onColliding = new Phaser.Signal();
        this.onMissing = new Phaser.Signal();
    }
    public isCollidingLanes(lane: Lanes): number
    {
        if ( this._player.lane === lane)
        {
            if (this._player.tapped)
            {
                //super pickup
                this._player.unTap();
                return 2;
            }
            else
            {
                this.onColliding.dispatch();
                return 1;
            }
        }
        return 0;
    }

    public static getInstance(player?: Player): PlayerCollisionChecker
    {
        if (null === PlayerCollisionChecker.instance || player)
        {
            PlayerCollisionChecker.instance = new PlayerCollisionChecker(player);
        }

        return PlayerCollisionChecker.instance;
    }
}
