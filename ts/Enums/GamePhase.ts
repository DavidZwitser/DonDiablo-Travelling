/** Used to define separate states */
export default interface IGamePhase
{
    /** How long this phase takes */
    phaseDuration: number;
    /** How many lanes there should be */
    amountOfLanes: number;
    /** How fast the pickups should move towards you. */
    pickupSpeed: number;
}
