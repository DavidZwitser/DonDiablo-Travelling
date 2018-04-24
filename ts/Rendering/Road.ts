import 'phaser-ce';

/** Renders a road */
export default class Road extends Phaser.Graphics
{

    private _roadStripesWidth: number = .004;

    public renderRoad(horizonPoint: Phaser.Point, depthOfField: number): void
    {
         /** How much the width get's scaled at the horizon */
         let horizonPerspective: number = 1 - (horizonPoint.y * depthOfField) / horizonPoint.y;
         let horizonY: number = horizonPoint.y + horizonPerspective;

         let getBottomLine: Function = (offsetFromCenter: number) =>
         {
            return this.getRoadLine(horizonPoint, horizonY, horizonPerspective, offsetFromCenter, this._roadStripesWidth);
         };
         let getTopLine: Function = (offsetFromCenter: number) =>
         {
            return this.getRoadLine(horizonPoint, 1 - horizonY, horizonPerspective, offsetFromCenter, this._roadStripesWidth, true);
         };
         /* -- */

         /* The road borders */
         let bottomLeftRoadBorder: Phaser.Polygon = getBottomLine(-.48);
         let bottomRightRoadBorder: Phaser.Polygon = getBottomLine(.48);

         let topLeftRoadBorder: Phaser.Polygon = getTopLine(-.48);
         let topRightRoadBorder: Phaser.Polygon = getTopLine(.48);
         /* -- */

         /* The road lines */
         let bottomLeftRoadLine: Phaser.Polygon = getBottomLine(-.25);
         let bottomCenterRoadLine: Phaser.Polygon = getBottomLine(0);
         let bottomRightRoadLine: Phaser.Polygon = getBottomLine(.25);

         let topLeftRoadLine: Phaser.Polygon = getTopLine(-.25);
         let topCenterRoadLine: Phaser.Polygon = getTopLine(0);
         let topRightRoadLine: Phaser.Polygon = getTopLine(.25);
         /* -- */

         this.clear();

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

    private getRoadLine(horizonPoint: Phaser.Point, horizonY: number, hoirzonPerspective: number, offsetFromCenter: number, width: number, flipped: boolean = false): Phaser.Polygon
    {
        return new Phaser.Polygon([
            (horizonPoint.x + offsetFromCenter - width) * this.game.width, flipped === false ? this.game.height : 0,
            (horizonPoint.x + offsetFromCenter + width) * this.game.width, flipped === false ? this.game.height : 0,
            (horizonPoint.x + (offsetFromCenter + width) * hoirzonPerspective) * this.game.width, horizonY * this.game.height,
            (horizonPoint.x + (offsetFromCenter - width) * hoirzonPerspective) * this.game.width, horizonY * this.game.height
        ]);
    }
}
