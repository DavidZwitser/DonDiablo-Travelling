import 'phaser-ce';

/** Renders a road */
export default class Road extends Phaser.Graphics
{
    private _lineThickness: number = .008;
    private _offset: number = 0;

    public renderRoad(horizonPoint: Phaser.Point, depthOfField: number): void
    {
         /** How much the width get's scaled at the horizon */
         let horizonPerspective: number = 1 - horizonPoint.y * depthOfField / horizonPoint.y;
         let horizonY: number = horizonPoint.y + horizonPerspective;

         let getBottomLine: Function = (offsetFromCenter: number, customWidth?: number) =>
         {
            return this.getRoadLine(horizonPoint.x, horizonY, horizonPerspective, offsetFromCenter, customWidth ? customWidth : this._lineThickness);
         };
         let getTopLine: Function = (offsetFromCenter: number, customWidth?: number) =>
         {
            return this.getRoadLine(horizonPoint.x, 1 - horizonY, horizonPerspective, offsetFromCenter, customWidth ? customWidth : this._lineThickness, true);
         };

         let getHorizonLine: Function = (y: number, height: number) =>
         {
            return this.getHorizonLine(horizonPoint.y, y, height);
         };
         /* -- */

         /* The road borders */
         let bottomLeftRoadBorder: Phaser.Polygon = getBottomLine(-.6);
         let bottomRightRoadBorder: Phaser.Polygon = getBottomLine(.6);

         let topLeftRoadBorder: Phaser.Polygon = getTopLine(-.6);
         let topRightRoadBorder: Phaser.Polygon = getTopLine(.6);
         /* -- */

         /* The road lines */
         let bottomLeftRoadLine: Phaser.Polygon = getBottomLine(-.3);
         let bottomCenterRoadLine: Phaser.Polygon = getBottomLine(0);
         let bottomRightRoadLine: Phaser.Polygon = getBottomLine(.3);

         let topLeftRoadLine: Phaser.Polygon = getTopLine(-.3);
         let topCenterRoadLine: Phaser.Polygon = getTopLine(0);
         let topRightRoadLine: Phaser.Polygon = getTopLine(.3);
         /* -- */

         let roadShapeBottom: Phaser.Polygon = getBottomLine(0, .6 + this._lineThickness);
         let roadShapeTop: Phaser.Polygon = getTopLine(0, .6 + this._lineThickness);

         /* Horizontal lines */
         let horizontalLines: Phaser.Polygon[] = [];

         let bottomThickLine: Phaser.Polygon = getHorizonLine(.9, .01);
         let topThickLine: Phaser.Polygon = getHorizonLine(-.9, .01);

         if (this._offset >= -.1) { this._offset -= .0033; }
         else { this._offset = 0; }

         for (let i: number = 9; i--; )
         {
            horizontalLines.push(getHorizonLine((i + 1) / 10 + this._offset, this._lineThickness / 2));
            horizontalLines.push(getHorizonLine(-(i + 1) / 10 - this._offset, this._lineThickness / 2));
         }
         /* -- */

         this.clear();

         /* Horizon lines */
         this.beginFill(0xE754B1);
         for (let i: number = horizontalLines.length; i--; )
         {
            this.drawShape(horizontalLines[i]);
         }
         this.drawShape(bottomThickLine);
         this.drawShape(topThickLine);
         this.endFill();
         /* -- */

         this.beginFill(0x000000);
         this.drawShape(roadShapeBottom);
         this.drawShape(roadShapeTop);
         this.endFill();

         this.beginFill(0xff0000);
         this.drawShape(bottomLeftRoadBorder);
         this.drawShape(bottomRightRoadBorder);

         this.drawShape(topLeftRoadBorder);
         this.drawShape(topRightRoadBorder);
         this.endFill();

         this.beginFill(0xffffff);
         this.drawShape(bottomLeftRoadLine);
         this.drawShape(bottomCenterRoadLine);
         this.drawShape(bottomRightRoadLine);

         this.drawShape(topLeftRoadLine);
         this.drawShape(topCenterRoadLine);
         this.drawShape(topRightRoadLine);
         this.endFill();

    }

    private getRoadLine(
        horizonX: number,
        horizonY: number,
        horizonPerspective: number,
        offsetFromCenter: number,
        width: number,
        flipped: boolean = false
    ): Phaser.Polygon
    {
        return new Phaser.Polygon([
            (horizonX + offsetFromCenter - width) * this.game.width, flipped === false ? this.game.height : 0,
            (horizonX + offsetFromCenter + width) * this.game.width, flipped === false ? this.game.height : 0,
            (horizonX + (offsetFromCenter + width) * horizonPerspective) * this.game.width, horizonY * this.game.height,
            (horizonX + (offsetFromCenter - width) * horizonPerspective) * this.game.width, horizonY * this.game.height
        ]);
    }

    private getHorizonLine(horizonY: number, y: number, height: number): Phaser.Polygon
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
        y = horizonY / y * horizonY / 2.8 + horizonY;

        return new Phaser.Polygon([
            0, (y - height) * this.game.height,
            0, (y + height) * this.game.height,
            this.game.width, (y + height) * this.game.height,
            this.game.width, (y - height) * this.game.height
        ]);
    }
}