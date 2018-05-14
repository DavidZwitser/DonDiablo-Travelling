
/** Defines the different lanes */
export enum Lanes
{
    bottomLeftLane,
    topLeftLane,

    bottomCenterLane,
    topCenterLane,

    bottomRightLane,
    topRightLane
}
export default Lanes;

/** Give a lane and get the position a perspective sprite should get, back from it. */
export function laneToPerspectivePosition(lane: Lanes): {x: number, y: number}
{
    let returnValue: {x: number, y: number} = {x: 0, y: 0};

    switch (lane)
    {
        case Lanes.bottomLeftLane:
            returnValue.x = -.3;
            returnValue.y = .5;
            break;

        case Lanes.bottomCenterLane:
            returnValue.x = 0;
            returnValue.y = .5;
            break;

        case Lanes.bottomRightLane:
            returnValue.x = .3;
            returnValue.y = .5;
            break;

        //

        case Lanes.topLeftLane:
            returnValue.x = -.3;
            returnValue.y = -.5;
            break;

        case Lanes.topCenterLane:
            returnValue.x = 0;
            returnValue.y = -.5;
            break;

        case Lanes.topRightLane:
            returnValue.x = .3;
            returnValue.y = -.5;
            break;

        default:
            return null;
    }

    return returnValue;
}
