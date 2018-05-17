import 'phaser-ce';
import { Lanes } from '../Enums/Lanes';
import Constants from '../Data/Constants';

/** Renders a road */
export default class Road extends Phaser.Graphics
{
    private _lineThickness: number = .008;
    private _offset: number = 0;

    //colors
    private _bottomMiddleColor: number = 0xf4091a;
    private _bottomOuterColor: number = 0x66090f;
    private _topMiddleColor: number = 0x8bf2d6;
    private _topOuterColor: number = 0x148694;

    public render(): void
    {
        /** How much the width get's scaled at the horizon */
        let horizonY: number = Constants.HORIZON_POSITION.y;

        let getBottomLine: Function = (offsetFromCenter: number, customWidth?: number) =>
        {
            return this.getRoadLine(Constants.HORIZON_POSITION.x, horizonY, offsetFromCenter, customWidth ? customWidth : this._lineThickness);
        };
        let getTopLine: Function = (offsetFromCenter: number, customWidth?: number) =>
        {
            return this.getRoadLine(Constants.HORIZON_POSITION.x, 1 - horizonY, offsetFromCenter, customWidth ? customWidth : this._lineThickness, true);
        };

        let getHorizonLine: Function = (y: number, height: number, renderInPerspective?: boolean) =>
        {
            return this.getHorizonLine(Constants.HORIZON_POSITION.y, y, height, renderInPerspective);
        };
        /* -- */

        /* The road borders */
        let bottomLeftRoadBorder: Phaser.Polygon = getBottomLine(-.5);
        let bottomRightRoadBorder: Phaser.Polygon = getBottomLine(.5);

        let topLeftRoadBorder: Phaser.Polygon = getTopLine(-.5);
        let topRightRoadBorder: Phaser.Polygon = getTopLine(.5);
        /* -- */

        /* The road lines */
        let bottomLeftRoadLine: Phaser.Polygon = getBottomLine( Lanes.Conversions.laneToPerspectivePosition( Lanes.bottomLeftLane ).x );
        let bottomCenterRoadLine: Phaser.Polygon = getBottomLine( Lanes.Conversions.laneToPerspectivePosition( Lanes.bottomCenterLane ).x );
        let bottomRightRoadLine: Phaser.Polygon = getBottomLine( Lanes.Conversions.laneToPerspectivePosition( Lanes.bottomRightLane ).x );

        let topLeftRoadLine: Phaser.Polygon = getTopLine( Lanes.Conversions.laneToPerspectivePosition( Lanes.topLeftLane ).x );
        let topCenterRoadLine: Phaser.Polygon = getTopLine( Lanes.Conversions.laneToPerspectivePosition( Lanes.topCenterLane ).x );
        let topRightRoadLine: Phaser.Polygon = getTopLine( Lanes.Conversions.laneToPerspectivePosition( Lanes.topRightLane ).x );
        /* -- */

        let roadShapeBottom: Phaser.Polygon = getBottomLine(0, .5 + this._lineThickness);
        let roadShapeTop: Phaser.Polygon = getTopLine(0, .5 + this._lineThickness);
        let horizonShape: Phaser.Polygon = getHorizonLine(.5, .2, false);

        /* Horizontal lines */
        let bottomHorizontalLines: Phaser.Polygon[] = [];
        let topHorizontalLines: Phaser.Polygon[] = [];

        let bottomThickLine: Phaser.Polygon = getHorizonLine(.9, .01);
        let topThickLine: Phaser.Polygon = getHorizonLine(-.9, .01);

        if (this._offset >= -.1) { this._offset -= .0028 * Constants.GLOBAL_SPEED; }
        else { this._offset = 0; }

        for (let i: number = 9; i--; )
        {
            bottomHorizontalLines.push(getHorizonLine((i + 1) / 10 + this._offset, this._lineThickness / 2));
            topHorizontalLines.push(getHorizonLine(-(i + 1) / 10 - this._offset, this._lineThickness / 2));
        }
        /* -- */

        this.clear();

        /* Horizon lines */
        this.beginFill(this._topOuterColor);
        for (let i: number = bottomHorizontalLines.length; i--; )
        {
            this.drawShape(bottomHorizontalLines[i]);
        }
        this.endFill();

        this.beginFill(this._bottomOuterColor);
        for (let i: number = topHorizontalLines.length; i--; )
        {
            this.drawShape(topHorizontalLines[i]);
        }
        this.endFill();

        this.beginFill(0x000000);
        this.drawShape(roadShapeBottom);
        this.drawShape(roadShapeTop);
        this.endFill();

        this.beginFill(this._topMiddleColor);
        this.drawShape(bottomLeftRoadLine);
        this.drawShape(bottomCenterRoadLine);
        this.drawShape(bottomRightRoadLine);
        this.endFill();

        this.beginFill(this._topOuterColor);
        this.drawShape(bottomLeftRoadBorder);
        this.drawShape(bottomRightRoadBorder);
        this.drawShape(bottomThickLine);
        this.endFill();

        this.beginFill(this._bottomMiddleColor);
        this.drawShape(topLeftRoadLine);
        this.drawShape(topCenterRoadLine);
        this.drawShape(topRightRoadLine);
        this.endFill();

        this.beginFill(this._bottomOuterColor);
        this.drawShape(topLeftRoadBorder);
        this.drawShape(topRightRoadBorder);
        this.drawShape(topThickLine);
        this.endFill();

        this.beginFill(0x000000);
        this.drawShape(horizonShape);
        this.endFill();

    }

    private getRoadLine(
        horizonX: number,
        horizonY: number,
        offsetFromCenter: number,
        width: number,
        flipped: boolean = false
    ): Phaser.Polygon
    {
        return new Phaser.Polygon([
            (horizonX + offsetFromCenter - width) * this.game.width, flipped === false ? this.game.height : 0,
            (horizonX + offsetFromCenter + width) * this.game.width, flipped === false ? this.game.height : 0,
            horizonX * this.game.width, horizonY * this.game.height,
            horizonX * this.game.width, horizonY * this.game.height
        ]);
    }

    private getHorizonLine(horizonY: number, y: number, height: number, usePerspective: boolean = true): Phaser.Polygon
    {
        /* Making the lines smaller the further away they are */
        if (y >= 0)
        {
            height *= 1 - y;
        }
        else
        {
            height *= 1 + y;
        }

        /* Offsetting their y in a persepctive kind of way */
        if (usePerspective === true) { y = horizonY / y * horizonY / 2.75 + horizonY; }

        return new Phaser.Polygon([
            0, (y - height) * this.game.height,
            0, (y + height) * this.game.height,
            this.game.width, (y + height) * this.game.height,
            this.game.width, (y - height) * this.game.height
        ]);
    }
}
