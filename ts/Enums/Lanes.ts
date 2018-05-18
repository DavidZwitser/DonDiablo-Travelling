import Constants from '../Data/Constants';

/** Defines the different lanes */
export enum Lanes
{
    none = 0,

    topLeftLane = 4,
    topCenterLane = 5,
    topRightLane = 6,

    bottomLeftLane = 1,
    bottomCenterLane = 2,
    bottomRightLane = 3
}

export interface ILane
{
    x: number;
    y: number;
    lane: Lanes;
    onTop: boolean;
    enabled: boolean;
}

export class LanesInfo
{
    private static _AMOUNT_OF_ENABLED_LANES: number = 6;

    /* None */
    public static readonly NONE_LANE: ILane = {
        x: 0,
        y: 0,
        lane: Lanes.none,
        onTop: false,
        enabled: false
    };

    /* Top lanes */
    public static readonly TOP_LEFT_LANE: ILane = {
        x: -.3,
        y: -.5,
        lane: Lanes.topLeftLane,
        onTop: true,
        enabled: true
    };
    public static readonly TOP_CENTER_LANE: ILane = {
        x: 0,
        y: -.5,
        lane: Lanes.topCenterLane,
        onTop: true,
        enabled: true
    };
    public static readonly TOP_RIGHT_LANE: ILane = {
        x: .3,
        y: -.5,
        lane: Lanes.topRightLane,
        onTop: true,
        enabled: true
    };

    /* Bottom lanes */
    public static readonly BOTTOM_LEFT_LANE: ILane = {
        x: -.3,
        y: .5,
        lane: Lanes.bottomLeftLane,
        onTop: false,
        enabled: true
    };
    public static readonly BOTTOM_CENTER_LANE: ILane = {
        x: 0,
        y: .5,
        lane: Lanes.bottomCenterLane,
        onTop: false,
        enabled: true
    };
    public static readonly BOTTOM_RIGHT_LANE: ILane = {
        x: .3,
        y: .5,
        lane: Lanes.bottomRightLane,
        onTop: false,
        enabled: true
    };

    /** Get the amount of active lanes */
    public static get AMOUNT_OF_ACTIVE_LANES(): number
    {
        return this._AMOUNT_OF_ENABLED_LANES;
    }

    public static set AMOUNT_OF_ACTIVE_LANES(amount: number)
    {
        if (amount > 6 || amount < 1) { return; }

        this.DISABLE_ALL_LANES();

        switch (amount)
        {
            case 6:
                LanesInfo.TOP_CENTER_LANE.enabled = true;
            case 5:
                LanesInfo.BOTTOM_CENTER_LANE.enabled = true;
            case 4:
                LanesInfo.TOP_LEFT_LANE.enabled = true;
                LanesInfo.TOP_RIGHT_LANE.enabled = true;
                LanesInfo.BOTTOM_LEFT_LANE.enabled = true;
                LanesInfo.BOTTOM_RIGHT_LANE.enabled = true;
                break;

            case 3:
                LanesInfo.TOP_CENTER_LANE.enabled = true;
                LanesInfo.BOTTOM_LEFT_LANE.enabled = true;
                LanesInfo.BOTTOM_RIGHT_LANE.enabled = true;
                break;

            case 2:
                LanesInfo.TOP_CENTER_LANE.enabled = true;
            case 1:
                LanesInfo.BOTTOM_CENTER_LANE.enabled = true;
                break;

            default:
                break;
        }

        this._AMOUNT_OF_ENABLED_LANES = amount;
    }

    private static DISABLE_ALL_LANES(): void
    {
        Object.keys(LanesInfo.LIST).forEach((key: any) => {
            LanesInfo.LIST[key].enabled = false;
        });
    }

    /** Returns all the lanes that are enabled */
    public static GET_ENABLED_LANES(callback: (lane: ILane) => void): void
    {
        Object.keys(LanesInfo.LIST).forEach((key: any) => {

            if (LanesInfo.LIST[key].enabled === false) { return; }

            callback(LanesInfo.LIST[key]);
        });
    }

    /** A list of all the lanes */
    public static readonly LIST: {[index: number]: ILane} = {
        [Lanes.none]: LanesInfo.NONE_LANE,

        [Lanes.topLeftLane]: LanesInfo.TOP_LEFT_LANE,
        [Lanes.topCenterLane]: LanesInfo.TOP_CENTER_LANE,
        [Lanes.topRightLane]: LanesInfo.TOP_RIGHT_LANE,

        [Lanes.bottomLeftLane]: LanesInfo.BOTTOM_LEFT_LANE,
        [Lanes.bottomCenterLane]: LanesInfo.BOTTOM_CENTER_LANE,
        [Lanes.bottomRightLane]: LanesInfo.BOTTOM_RIGHT_LANE
    };

    /* Conversions */

    /** Give a lane and get the position a perspective sprite should get, back from it. */
    public static laneToILane(lane: Lanes): ILane
    {
        return LanesInfo.LIST[lane];
    }

    public static perspectivePositionToRoundedLane(x: number, y: number): Lanes
    {
        let currentSmallestDistance: number = Infinity;
        let smallestDistanceLane: Lanes = Lanes.none;

        LanesInfo.GET_ENABLED_LANES((lane: ILane) => {

            let a: number = lane.x - x;
            let b: number = lane.y - y;

            let distance: number = Math.abs(a * a + b * b);

            if (distance > currentSmallestDistance) { return; }
            currentSmallestDistance = distance;

            smallestDistanceLane = lane.lane;
        });

        return smallestDistanceLane;
    }

    /** Give a screen position and get the coresponding lane back */
    public static  screenPositionToLane(game: Phaser.Game, x: number, y: number): Lanes
    {
        /* So the "getting smaller of the road in the distance" can be accounted for */
        let perspectiveOffset: number = ((y / game.height - Constants.HORIZON_POSITION.y) * 2);
        /* The xPosition on the screen from -.5 on the left to .5 on the right */
        let xScreen: number = (x / game.width - Constants.HORIZON_POSITION.x) / perspectiveOffset;
        let yScreen: number = y / game.height - Constants.HORIZON_POSITION.y;

        return LanesInfo.perspectivePositionToRoundedLane(xScreen, yScreen);

    }
}
