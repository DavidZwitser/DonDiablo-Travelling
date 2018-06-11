
import 'phaser-ce';
import { LaneIndexer } from '../Enums/Lanes';
import Constants from '../Data/Constants';
import {IRoadColors} from '../Data/Constants';

/** Renders a road */
export default class Road extends Phaser.Group
{
    /** How thick the lines should be */
    private _lineThickness: number = .008;
    /** This is used for the horizon lines to offset them a bit every frame */
    private _offset: number = 0;

    /** The colors for the lines */
    private colorIndex: number = 0;
    private _roadColors: IRoadColors;

    /** The layers where the lines on the horion are drawn */
    private _horizonLinesLayer: Phaser.Graphics;
    /** The layer where the clear behind the road and the roadline themself are drawn */
    private _roadLinesLayer: Phaser.Graphics;
    /** The layer where the horizon clear and the highlights around the road are drawn */
    private _highlightLayer: Phaser.Graphics;

    private _roadLineAlpha: number = 0;
    private _roadAmountTransitionTween: Phaser.Tween;

    constructor(game: Phaser.Game)
    {
        super(game);

        this._horizonLinesLayer = new Phaser.Graphics(game);
        this.addChild(this._horizonLinesLayer);

        this._roadLinesLayer = new Phaser.Graphics(game);
        this.addChild(this._roadLinesLayer);

        this._highlightLayer = new Phaser.Graphics(game);
        this.addChild(this._highlightLayer);

        this.setRoadColors(this.colorIndex);
    }

    public render(redrawEverything: boolean = false): void
    {
        /* The road lines */
        LaneIndexer.AMOUNT_OF_ACTIVE_LANES;

        /* Drawing the lines on the sides that give the movement effect */
        this.drawSideLines();

        /** Should I redraw the highlights */
        if (redrawEverything === false) { return; }

        /* Drawing the lines that represent the road */
        this.drawRoadLine();

        /* Drawing the highlights around the sides */
        this.drawHighlights();

    }

    /** Draws the lines on the side giving the feel of movement */
    private drawSideLines(): void
    {
        this._horizonLinesLayer.clear();

        /** Where the top horizon lines are stored */
        let topHorizontalLines: Phaser.Polygon[] = [];
        /** Where the bottom horizon lines are stored */
        let bottomHorizontalLines: Phaser.Polygon[] = [];

        /* Changin the horizon lines offset so they move */
        if (this._offset >= -.1)
        {
            this._offset -= Constants.DELTA_TIME * Constants.GLOBAL_SPEED * 0.2;
        }
        else
        {
            this._offset = -.0001;
        }

        /** Adding 9 top and bottom horizon lines so they can be drawn */
        for (let i: number = 9; i--; )
        {
            bottomHorizontalLines.push(this.getHorizonLine((i + 1) / 10 + this._offset, this._lineThickness / 2));
            topHorizontalLines.push(this.getHorizonLine(-(i + 1) / 10 - this._offset, this._lineThickness / 2));
        }

        /** Drawing the top horizon lines */
        this._horizonLinesLayer.beginFill(this._roadColors.bottomOuterColor);
        for (let i: number = topHorizontalLines.length; i--; )
        {
            this._horizonLinesLayer.drawShape(topHorizontalLines[i]);
        }
        this._horizonLinesLayer.endFill();

        /** Drawing the bottom horizon lines */
        this._horizonLinesLayer.beginFill(this._roadColors.topOuterColor);
        for (let i: number = bottomHorizontalLines.length; i--; )
        {
            this._horizonLinesLayer.drawShape(bottomHorizontalLines[i]);
        }
        this._horizonLinesLayer.endFill();
    }

    public hideExistingRoadLines(transitionDuration?: number): void
    {
        this._roadLineAlpha = 1;

        this._roadAmountTransitionTween =
            this.game.add.tween(this)
                .to({_roadLineAlpha: 0}, transitionDuration / 2, Phaser.Easing.Cubic.InOut, true, 0, 1, false)
                .start();

        this._roadAmountTransitionTween.onUpdateCallback( () => {
            this.drawRoadLine(this._roadLineAlpha);
        });

    }

    public fadeInNewRoadLines(): void
    {
        this._roadLineAlpha = 0;

        if (this._roadAmountTransitionTween) { this._roadAmountTransitionTween.stop(false); }
        this._roadAmountTransitionTween = null;

        this._roadAmountTransitionTween =
            this.game.add.tween(this)
                .to({_roadLineAlpha: 1}, 1200, Phaser.Easing.Cubic.Out, true, 0, 0, false)
                .start();

        this._roadAmountTransitionTween.onUpdateCallback( () => {
            this.drawRoadLine(this._roadLineAlpha);
        });
    }

    /** Draws the lines that represent the road */
    private drawRoadLine(alpha: number = 1): void
    {
        this._roadLinesLayer.clear();

        /* Shapes for clearing lines that shouldn't be there */
        let roadShapeBottom: Phaser.Polygon = this.getBottomLine(0, .5 + this._lineThickness);
        let roadShapeTop: Phaser.Polygon = this.getTopLine(0, .5 + this._lineThickness);

        /* Clearing the side lines that are drawn over the road */
        this._roadLinesLayer.beginFill(0x000000);
        this._roadLinesLayer.drawShape(roadShapeBottom);
        this._roadLinesLayer.drawShape(roadShapeTop);
        this._roadLinesLayer.endFill();

        /** All the roads on the top side */
        let topRoadLines: Phaser.Polygon[] = [];
        /** All the lanes on the bottom side */
        let bottomRoadLines: Phaser.Polygon[] = [];

        /** Adding the specific amount of road lines that should be drawn */
        switch (LaneIndexer.AMOUNT_OF_ACTIVE_LANES)
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

        /** Drawing all the top road lines */
        this._roadLinesLayer.beginFill(this._roadColors.topMiddleColor, alpha);
        for (let i: number = topRoadLines.length; i--; )
        {
            this._roadLinesLayer.drawShape(topRoadLines[i]);
        }
        this._roadLinesLayer.endFill();

        /** Drawing all the bottom road lines */
        this._roadLinesLayer.beginFill(this._roadColors.bottomMiddleColor, alpha);
        for (let i: number = bottomRoadLines.length; i--; )
        {
            this._roadLinesLayer.drawShape(bottomRoadLines[i]);
        }
        this._roadLinesLayer.endFill();

    }

    /** Draws the highlights around the road and horizon */
    private drawHighlights(): void
    {
        this._highlightLayer.clear();

        /* The road borders */
        let topLeftRoadBorder: Phaser.Polygon = this.getTopLine(-.5);
        let topRightRoadBorder: Phaser.Polygon = this.getTopLine(.5);

        let bottomLeftRoadBorder: Phaser.Polygon = this.getBottomLine(-.5);
        let bottomRightRoadBorder: Phaser.Polygon = this.getBottomLine(.5);

        /* Horizontal lines */
        let topThickLine: Phaser.Polygon = this.getHorizonLine(-.9, .01);
        let bottomThickLine: Phaser.Polygon = this.getHorizonLine(.9, .01);

        /** Drawing the top hightlights */
        this._highlightLayer.beginFill(this._roadColors.bottomOuterColor);
        this._highlightLayer.drawShape(topLeftRoadBorder);
        this._highlightLayer.drawShape(topRightRoadBorder);
        this._highlightLayer.drawShape(topThickLine);
        this._highlightLayer.endFill();

        /** Drawing the bottom highlights */
        this._highlightLayer.beginFill(this._roadColors.topOuterColor);
        this._highlightLayer.drawShape(bottomLeftRoadBorder);
        this._highlightLayer.drawShape(bottomRightRoadBorder);
        this._highlightLayer.drawShape(bottomThickLine);
        this._highlightLayer.endFill();

        let horizonShape: Phaser.Polygon = this.getHorizonLine(.5, .2, false);

        /* Clearing the road lines that are drawn over the horizon */
        this._highlightLayer.beginFill(0x000000);
        this._highlightLayer.drawShape(horizonShape);
        this._highlightLayer.endFill();
    }

    public nextColor(index: number): void
    {
        this.setColors(index);
    }

    private setColors(index: number, time: number = 1000): void
    {
        let colorBlend: any = {step: 0};
        // create the tween on this object and tween its step property to 100
        let colorTween: Phaser.Tween = this.game.add.tween(colorBlend).to({step: 100}, time).start();
        // run the interpolateColor function every time the tween updates, feeding it the
        // updated value of our tween each time, and set the result as our tint
        colorTween.onUpdateCallback(() => {
            this._roadColors.bottomMiddleColor = Phaser.Color.interpolateColor(Constants.ROAD_COLORS[this.colorIndex].bottomMiddleColor,
                Constants.ROAD_COLORS[index].bottomMiddleColor, 100, colorBlend.step);

            this._roadColors.bottomOuterColor = Phaser.Color.interpolateColor(Constants.ROAD_COLORS[this.colorIndex].bottomOuterColor,
                Constants.ROAD_COLORS[index].bottomOuterColor, 100, colorBlend.step);

            this._roadColors.topMiddleColor = Phaser.Color.interpolateColor(Constants.ROAD_COLORS[this.colorIndex].topMiddleColor,
                Constants.ROAD_COLORS[index].topMiddleColor, 100, colorBlend.step);

            this._roadColors.topOuterColor = Phaser.Color.interpolateColor(Constants.ROAD_COLORS[this.colorIndex].topOuterColor,
                Constants.ROAD_COLORS[index].topOuterColor, 100, colorBlend.step);
            this.drawRoadLine();
            this.drawHighlights();
        });
        colorTween.onComplete.addOnce(() => {
            this.setRoadColors(index);
        });
    }

    private setRoadColors(index: number): void
    {
        this._roadColors = {
            bottomMiddleColor: Number(Constants.ROAD_COLORS[index].bottomMiddleColor),
            bottomOuterColor: Number(Constants.ROAD_COLORS[index].bottomOuterColor),
            topMiddleColor: Number(Constants.ROAD_COLORS[index].topMiddleColor),
            topOuterColor: Number(Constants.ROAD_COLORS[index].topOuterColor),
            topSprite: '',
            bottomSprite: ''
        };
        this.colorIndex = index;

    }

    /** Get a road line for the top side of the screen */
    private getTopLine(offsetFromCenter: number, customWidth?: number): Phaser.Polygon
    {
        return this.getRoadLine(Constants.HORIZON_POSITION.x, 1 - Constants.HORIZON_POSITION.y, offsetFromCenter, customWidth ? customWidth : this._lineThickness, true);
    }

    /** Get a road line for the bottom side of the screen */
    private getBottomLine(offsetFromCenter: number, customWidth?: number): Phaser.Polygon
    {
        return this.getRoadLine(Constants.HORIZON_POSITION.x, Constants.HORIZON_POSITION.y, offsetFromCenter, customWidth ? customWidth : this._lineThickness);
    }

    /** Get a road line */
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

    /** Get a horizno line */
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
