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

    private getTopLine(offsetFromCenter: number, customWidth?: number): Phaser.Polygon
    {
        return this.getRoadLine(Constants.HORIZON_POSITION.x, 1 - Constants.HORIZON_POSITION.y, offsetFromCenter, customWidth ? customWidth : this._lineThickness, true);

    }

    private getBottomLine(offsetFromCenter: number, customWidth?: number): Phaser.Polygon
    {
        return this.getRoadLine(Constants.HORIZON_POSITION.x, Constants.HORIZON_POSITION.y, offsetFromCenter, customWidth ? customWidth : this._lineThickness);
    }

    public render(): void
    {

        /* The road borders */
        let topLeftRoadBorder: Phaser.Polygon = this.getTopLine(-.5);
        let topRightRoadBorder: Phaser.Polygon = this.getTopLine(.5);

        let bottomLeftRoadBorder: Phaser.Polygon = this.getBottomLine(-.5);
        let bottomRightRoadBorder: Phaser.Polygon = this.getBottomLine(.5);
        /* -- */

        /* The road lines */
        let amountOfLanes: number = Lanes.LanesInfo.AMOUNT_OF_ACTIVE_LANES;

        let topRoadLines: Phaser.Polygon[] = [];
        let bottomRoadLines: Phaser.Polygon[] = [];

        switch (amountOfLanes)
        {
            case 6:
                topRoadLines.push(this.getTopLine(-.2));
                topRoadLines.push(this.getTopLine(.2));
                bottomRoadLines.push(this.getBottomLine(-.2));
                bottomRoadLines.push(this.getBottomLine(.2));
                break;

            case 5:
                topRoadLines.push(this.getTopLine(0));
                bottomRoadLines.push(this.getBottomLine(-.2));
                bottomRoadLines.push(this.getBottomLine(.2));
                break;

            case 4:
                topRoadLines.push(this.getTopLine(0));
            case 3:
                bottomRoadLines.push(this.getBottomLine(0));
                break;

            default:
                break;
        }

        /* -- */

        let roadShapeBottom: Phaser.Polygon = this.getBottomLine(0, .5 + this._lineThickness);
        let roadShapeTop: Phaser.Polygon = this.getTopLine(0, .5 + this._lineThickness);
        let horizonShape: Phaser.Polygon = this.getHorizonLine(.5, .2, false);

        /* Horizontal lines */
        let topHorizontalLines: Phaser.Polygon[] = [];
        let bottomHorizontalLines: Phaser.Polygon[] = [];

        let topThickLine: Phaser.Polygon = this.getHorizonLine(-.9, .01);
        let bottomThickLine: Phaser.Polygon = this.getHorizonLine(.9, .01);

        if (this._offset >= -.1) { this._offset -= Constants.DELTA_TIME * Constants.GLOBAL_SPEED * 0.2; }
        else { this._offset = 0; }

        for (let i: number = 9; i--; )
        {
            bottomHorizontalLines.push(this.getHorizonLine((i + 1) / 10 + this._offset, this._lineThickness / 2));
            topHorizontalLines.push(this.getHorizonLine(-(i + 1) / 10 - this._offset, this._lineThickness / 2));
        }
        /* -- */

        this.clear();

        /* Horizon lines */
        this.beginFill(this._bottomOuterColor);
        for (let i: number = topHorizontalLines.length; i--; )
        {
            this.drawShape(topHorizontalLines[i]);
        }
        this.endFill();

        this.beginFill(this._topOuterColor);
        for (let i: number = bottomHorizontalLines.length; i--; )
        {
            this.drawShape(bottomHorizontalLines[i]);
        }
        this.endFill();

        this.beginFill(0x000000);
        this.drawShape(roadShapeBottom);
        this.drawShape(roadShapeTop);
        this.endFill();

        this.beginFill(this._topMiddleColor);
        for (let i: number = topRoadLines.length; i--; )
        {
            this.drawShape(topRoadLines[i]);
        }
        this.endFill();

        this.beginFill(this._bottomOuterColor);
        this.drawShape(topLeftRoadBorder);
        this.drawShape(topRightRoadBorder);
        this.drawShape(topThickLine);
        this.endFill();

        this.beginFill(this._bottomMiddleColor);
        for (let i: number = bottomRoadLines.length; i--; )
        {
            this.drawShape(bottomRoadLines[i]);
        }
        this.endFill();

        this.beginFill(this._topOuterColor);
        this.drawShape(bottomLeftRoadBorder);
        this.drawShape(bottomRightRoadBorder);
        this.drawShape(bottomThickLine);
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

    private getHorizonLine(y: number, height: number, usePerspective: boolean = true): Phaser.Polygon
    {
        let horizonY: number = Constants.HORIZON_POSITION.y;
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
