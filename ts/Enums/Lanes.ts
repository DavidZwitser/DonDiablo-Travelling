import Constants from '../Data/Constants';

/** Defines the different lanes */
export enum Lanes
{
    none,

    bottomLeftLane,
    topLeftLane,

    bottomCenterLane,
    topCenterLane,

    bottomRightLane,
    topRightLane
}

export namespace Lanes.Conversions
{

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
                returnValue.x = 0;
                returnValue.y = 0;
        }

        return returnValue;
    }

    /** Give a screen position and get the coresponding lane back */
    export function screenPositionToLane(game: Phaser.Game, x: number, y: number): Lanes
    {
        let onBottom: boolean = y > game.height / 2;

        /* So the "getting smaller of the road in the distance" can be accounted for */
        let perspectiveOffset: number = ((y / game.height - Constants.HORIZON_POSITION.y) * 2);
        /* The xPosition on the screen from -.5 on the left to .5 on the right */
        let xScreen: number = (x / game.width - Constants.HORIZON_POSITION.x) / perspectiveOffset;

        /* The distances from the paramater to the specific lanes on the x-axis */
        let leftXDistance: number = Math.abs( this.laneToPerspectivePosition( Lanes.bottomLeftLane ).x - xScreen );
        let centerXDistance: number = Math.abs( this.laneToPerspectivePosition( Lanes.bottomCenterLane ).x - xScreen );
        let rightXDistance: number = Math.abs( this.laneToPerspectivePosition( Lanes.bottomRightLane ).x - xScreen );

        /* Checking which distance is the smallest */
        let smallest: number = Math.min(leftXDistance, centerXDistance, rightXDistance);

        /* Filtering out which outcome belongs to which lane */
        if (onBottom === true)
        {
            if (smallest === leftXDistance) { return Lanes.bottomLeftLane; }
            if (smallest === centerXDistance) { return Lanes.bottomCenterLane; }
            if (smallest === rightXDistance) { return Lanes.bottomRightLane; }
        }
        else
        {
            /* These are flipped, since everything on the top is mirrored */
            if (smallest === rightXDistance) { return Lanes.topLeftLane; }
            if (smallest === centerXDistance) { return Lanes.topCenterLane; }
            if (smallest === leftXDistance) { return Lanes.topRightLane; }
        }

        return Lanes.none;
    }
}
