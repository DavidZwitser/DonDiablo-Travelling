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
    public isCollidingLanes(lane: Lanes): boolean
    {
        if ( this._player.lane === lane)
        {
            this.onColliding.dispatch();
            return true;
        }
        return false;
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
