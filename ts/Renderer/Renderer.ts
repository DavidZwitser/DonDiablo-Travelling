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

    /** This turns out to be this number, should be fixed to be 1 later */
    private _roadZLength: number = 6.2;

    constructor(game: Phaser.Game)
    {
        super(game);

        /* Setting values */
        this._roadWidth = .9;
        this._roadBordersWidth = .04;
        this._roadStripesWidth = .02;

        this._depthOfField = .96;
        this.horizonPoint = new Phaser.Point(.5, .45);
        
        this._rendererdBackground = new Phaser.Graphics(this.game);
        this.addChild(this._rendererdBackground);

        for (let i: number = 6; i--; )
        {
            let xPos: number = i % 2 === 0 ? this._roadWidth + this._roadStripesWidth : -(this._roadWidth + this._roadStripesWidth) * 1.5

            let testPerspectiveSprite: PerspectiveSprite = new PerspectiveSprite(this.game, i, xPos);
            testPerspectiveSprite.anchor.set(0, 1);

            this.addChild(testPerspectiveSprite);
            this.perspectiveSprites.push(testPerspectiveSprite);
        }
    }

    public placeItems(): void
    {
        for (let i: number = this.perspectiveSprites.length; i--; )
        {
            let currentSprite: PerspectiveSprite = this.perspectiveSprites[i];

            let worldCoordinates: {x: number, y: number, scale: number} = this.screenToWorld(currentSprite.zPos, currentSprite.xPos);

            currentSprite.scale.set(worldCoordinates.scale * currentSprite.scaleMultiplier);
            currentSprite.position.set(worldCoordinates.x, worldCoordinates.y);

            if (currentSprite.zPos <= 0)
            {
                currentSprite.zPos = this._roadZLength; 
                currentSprite.moveDown(); 
            }
            currentSprite.zPos -= .008;
        }
    }

    public update(): void
    {
        this.placeItems();        
    }

    private screenToWorld(zPos: number, xPos: number): {x: number, y: number, scale: number}
    {
        let perspectiveOffset: number = this.horizonPoint.y / zPos;
        // console.log(this.horizonPoint.y, zPos, perspectiveOffset);

        let projectedX: number = (this.horizonPoint.x + xPos * perspectiveOffset) * this.game.width;
        let projectedY: number = (this.horizonPoint.y + (1 - this.horizonPoint.y) * perspectiveOffset) * this.game.height;
        let projectedScale: number = perspectiveOffset;

        // if (zPos > 1) { return; }

        return {
            x: projectedX,
            y: projectedY,
            scale: projectedScale
        };
    }

    public renderRoad(): void
    {

        /** How much the width get's scaled at the horizon */
        let horizonPerspective: number = 1 - (this.horizonPoint.y * this._depthOfField) / this.horizonPoint.y;
        let horizonY: number = this.game.height * this.horizonPoint.y + this.game.height * horizonPerspective;

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

        let polygonPoints: number[] = [];
        for (let x: number = 3; x--; )
        {
            for (let y: number = 6; y--; )
            {
                let perspectiveOffset: number = this.horizonPoint.y / x;

                polygonPoints.push(
                    (this.horizonPoint.x + x * perspectiveOffset) * this.game.width
                );

                polygonPoints.push(
                    y * this.game.height
                );
            }
        }

        let leftGrassGraphics: Phaser.Polygon = new Phaser.Polygon(polygonPoints);
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