/** Used to define separate states */
export default interface IGamePhase
{
    /** How many lanes there should be */
    amountOfLanes: number;
    /** How fast the pickups should move towards you. */
    pickupSpeed: number;
}
