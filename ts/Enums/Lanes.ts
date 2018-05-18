import Constants from '../Data/Constants';

/** Defines the different lanes */
export enum Lanes
{
    none,

    topLeftLane,
    topCenterLane,
    topRightLane,

    bottomLeftLane,
    bottomCenterLane,
    bottomRightLane
}

export namespace Lanes
{
    interface ILane
    {
        x: number;
        y: number;
        lane: Lanes;
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
            enabled: false
        };

        /* Top lanes */
        public static readonly TOP_LEFT_LANE: ILane = {
            x: -.3,
            y: -.5,
            lane: Lanes.topLeftLane,
            enabled: true
        };
        public static readonly TOP_CENTER_LANE: ILane = {
            x: 0,
            y: -.5,
            lane: Lanes.topCenterLane,
            enabled: true
        };
        public static readonly TOP_RIGHT_LANE: ILane = {
            x: .3,
            y: -.5,
            lane: Lanes.topRightLane,
            enabled: true
        };

        /* Bottom lanes */
        public static readonly BOTTOM_LEFT_LANE: ILane = {
            x: -.3,
            y: .5,
            lane: Lanes.bottomLeftLane,
            enabled: true
        };
        public static readonly BOTTOM_CENTER_LANE: ILane = {
            x: 0,
            y: .5,
            lane: Lanes.bottomCenterLane,
            enabled: true
        };
        public static readonly BOTTOM_RIGHT_LANE: ILane = {
            x: .3,
            y: .5,
            lane: Lanes.bottomRightLane,
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
            for (let i: number = LanesInfo.LIST.length; i--; )
            {
                LanesInfo.LIST[i].enabled = false;
            }
        }

        /** A list of all the lanes */
        public static readonly LIST: ILane[] = [
            LanesInfo.NONE_LANE,

            LanesInfo.TOP_LEFT_LANE,
            LanesInfo.TOP_CENTER_LANE,
            LanesInfo.TOP_RIGHT_LANE,

            LanesInfo.BOTTOM_LEFT_LANE,
            LanesInfo.BOTTOM_CENTER_LANE,
            LanesInfo.BOTTOM_RIGHT_LANE
        ];
    }

    export namespace Conversions
    {
        /** Give a lane and get the position a perspective sprite should get, back from it. */
        export function laneToPerspectivePosition(lane: Lanes): ILane
        {
            for (let i: number = LanesInfo.LIST.length; i--; )
            {
                if (LanesInfo.LIST[i].lane === lane && LanesInfo.LIST[i].enabled === true) { return LanesInfo.LIST[i]; }
            }

            return LanesInfo.NONE_LANE;
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
}
