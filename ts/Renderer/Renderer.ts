import 'phaser-ce';
import PerspectiveSprite from './PerspectiveSprite';

export default class Renderer extends Phaser.Group
{
    public horizonPoint: Phaser.Point;

    private _rendererdBackground: Phaser.Graphics;

    private _roadWidth: number;
    private _roadBordersWidth: number;
    private _roadStripesWidth: number;

    private _horizonHieght: number;
    private _depthOfField: number;

    private perspectiveSprites: PerspectiveSprite[] = [];

    constructor(game: Phaser.Game)
    {
        super(game);

        /* Setting values */
        this._roadWidth = .9;
        this._roadBordersWidth = .04;
        this._roadStripesWidth = .02;

        this._depthOfField = .92;
        this.horizonPoint = new Phaser.Point(.5, .45);
        
        this._rendererdBackground = new Phaser.Graphics(this.game);
        this.addChild(this._rendererdBackground);

        let testPerspectiveSprite: PerspectiveSprite = new PerspectiveSprite(this.game, 20);
        this.addChild(testPerspectiveSprite);
        this.perspectiveSprites.push(testPerspectiveSprite);
        this.placeItems();
    }

    
    public placeItems(): void
    {
        for (let i: number = this.perspectiveSprites.length; i--; )
        {
            let currentSprite: PerspectiveSprite = this.perspectiveSprites[i];

            let spritesHorizonPerspective: number = 1 - currentSprite.zPos / this.horizonPoint.y;
            let nextToRoadX: number = (this._roadWidth * spritesHorizonPerspective) * this.game.width;

            currentSprite.scale.set(1 - currentSprite.zPos / this.horizonPoint.y);
            currentSprite.position.set(nextToRoadX, this.game.height * .75);

            // console.log(nextToRoadX);
        }
    }

    public renderRoad(): void
    {

        /** How much the width get's scaled at the horizon */
        let horizonPerspective: number = 1 - (this.horizonPoint.y * this._depthOfField) / this.horizonPoint.y;
        let horizonY: number = this.game.height * this.horizonPoint.y;

        /* Drawing the road */
        let leftStartOfTheRoad: number = (this.horizonPoint.x - this._roadWidth / 2) * this.game.width;
        let rightStartOfTheRoad: number = (this.horizonPoint.x + this._roadWidth / 2) * this.game.width;

        let leftEndOfTheRoad: number = (this.horizonPoint.x - horizonPerspective / 2) * this.game.width;
        let rightEndOfTheRoad: number = (this.horizonPoint.x + horizonPerspective / 2) * this.game.width;

        let road: Phaser.Polygon = new Phaser.Polygon([
            leftStartOfTheRoad, this.game.height,
            rightStartOfTheRoad, this.game.height,
            rightEndOfTheRoad, horizonY,
            leftEndOfTheRoad, horizonY
        ]);
        /* -- */

        /* The road borders */
        let leftRoadBorder: Phaser.Polygon = new Phaser.Polygon([
            leftStartOfTheRoad - (this._roadBordersWidth * this.game.width), this.game.height,
            leftStartOfTheRoad, this.game.height,
            leftEndOfTheRoad, horizonY,
            leftEndOfTheRoad - (this._roadBordersWidth * this.game.width * horizonPerspective), horizonY
        ]);
        let rightRoadBorder: Phaser.Polygon = new Phaser.Polygon([
            rightStartOfTheRoad, this.game.height,
            rightStartOfTheRoad + (this._roadBordersWidth * this.game.width), this.game.height,
            rightEndOfTheRoad + (this._roadBordersWidth * horizonPerspective * this.game.width), horizonY,
            rightEndOfTheRoad, horizonY
        ]);
        /* -- */

        /* The road lines */
        let leftRoadLine: Phaser.Polygon = new Phaser.Polygon([
            (leftStartOfTheRoad + (this._roadWidth / 4 * this.game.width)) - (this._roadStripesWidth / 2 * this.game.width), this.game.height,
            (leftStartOfTheRoad + (this._roadWidth / 4 * this.game.width)) + (this._roadStripesWidth / 2 * this.game.width), this.game.height,
            (leftEndOfTheRoad + (this._roadWidth / 4 * horizonPerspective * this.game.width)) + (this._roadStripesWidth / 2 * horizonPerspective * this.game.width), horizonY,
            (leftEndOfTheRoad + (this._roadWidth / 4 * horizonPerspective * this.game.width)) - (this._roadStripesWidth / 2 * horizonPerspective * this.game.width), horizonY
        ]);
        let rightRoadLine: Phaser.Polygon = new Phaser.Polygon([
            (rightStartOfTheRoad - (this._roadWidth / 4 * this.game.width)) - (this._roadStripesWidth / 2 * this.game.width), this.game.height,
            (rightStartOfTheRoad - (this._roadWidth / 4 * this.game.width)) + (this._roadStripesWidth / 2 * this.game.width), this.game.height,
            (rightEndOfTheRoad - (this._roadWidth / 4 * horizonPerspective * this.game.width)) + (this._roadStripesWidth / 2 * horizonPerspective * this.game.width), horizonY,
            (rightEndOfTheRoad - (this._roadWidth / 4 * horizonPerspective * this.game.width)) - (this._roadStripesWidth / 2 * horizonPerspective * this.game.width), horizonY
        ]);
        /* -- */

        /* Drawing the grass */
        let leftGrass: Phaser.Polygon = new Phaser.Polygon([
            0, this.game.height,
            leftStartOfTheRoad, this.game.height,
            leftEndOfTheRoad, horizonY,
            0, horizonY
        ]);
        let rightGrass: Phaser.Polygon = new Phaser.Polygon([
            rightStartOfTheRoad, this.game.height,
            this.game.width, this.game.height,
            this.game.width, horizonY,
            rightEndOfTheRoad, horizonY
        ]);
        /* -- */

        this._rendererdBackground.clear();

        this._rendererdBackground.beginFill(0xcccccc);
        this._rendererdBackground.drawShape(road);
        this._rendererdBackground.endFill();

        this._rendererdBackground.beginFill(0x00ff00);
        this._rendererdBackground.drawShape(leftGrass);
        this._rendererdBackground.drawShape(rightGrass);
        this._rendererdBackground.endFill();

        this._rendererdBackground.beginFill(0xff0000);
        this._rendererdBackground.drawShape(leftRoadBorder);
        this._rendererdBackground.drawShape(rightRoadBorder);
        this._rendererdBackground.endFill();

        this._rendererdBackground.beginFill(0xffffff);
        this._rendererdBackground.drawShape(leftRoadLine);
        this._rendererdBackground.drawShape(rightRoadLine);
        this._rendererdBackground.endFill();

        
    }

}