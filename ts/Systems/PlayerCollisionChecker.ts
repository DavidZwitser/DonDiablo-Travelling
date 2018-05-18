/** Checks collision */
import Player from '../GameObjects/Interactable/Perspective/Player';
import { Lanes } from '../Enums/Lanes';
export default class PlayerCollisionChecker
{
    private _player: Player;
    private static instance: PlayerCollisionChecker = null;
    constructor(player: Player)
    {
        this._player = player;
    }
    public isCollidingLanes(lane: Lanes): boolean
    {
        if ( this._player.lane === lane)
        {
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
