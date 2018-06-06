import 'phaser-ce';
import AudioAnalyser from '../../../Systems/Sound/AudioAnalyser';
import Atlases from '../../../Data/Atlases';
import Constants from '../../../Data/Constants';

/** Visualizes songs */
/** Visualizes music */
export default class BuildingVisualizer extends Phaser.Group
{
    private _maxWidth: number;
    private _maxHeight: number;

    private _barDistance: number = 1;
    private _contextAvailable: boolean;

    //bottom buildings
    private _bottomHalf: Phaser.Group;
    private _buildings: Phaser.Sprite[];
    private _glow: Phaser.Sprite;
    private _backGlow: Phaser.Sprite;

    //top buildings
    private _topHalf: Phaser.Group;
    private _topBuildings: Phaser.Sprite[];
    private _topGlow: Phaser.Sprite;
    private _topBackGlow: Phaser.Sprite;

    private _topIsActive: boolean = false;
    private _switchTime: number = 300;

    private _maskGraphic: Phaser.Graphics;

    private reactTween: Phaser.Tween;

    constructor (game: Phaser.Game, maxWidth: number, maxHeight: number)
    {
        super(game);

        this._buildings = [];
        this._topBuildings = [];

        this._contextAvailable = AudioAnalyser.getInstance().Setup();
        this._maxWidth = maxWidth;
        this._maxHeight = maxHeight;

        this._topHalf = new Phaser.Group(game);
        this.addChild(this._topHalf);

        this._bottomHalf = new Phaser.Group(game);
        this.addChild(this._bottomHalf);

        //mask setup
        this._maskGraphic = new Phaser.Graphics(this.game, 0, 0);
        this.addChild(this._maskGraphic);
        this._maskGraphic.beginFill(0xFF3300);
        this._maskGraphic.drawRect(0, -this._maxHeight, this._maxWidth, maxHeight);
        this._maskGraphic.endFill();

        this.setUp();
        //this.deactivateHalf();

        this.mask = this._maskGraphic;
    }

    private setUp(): void
    {
        //bottom half
        this._backGlow = new Phaser.Sprite(this.game, 0, 0, Atlases.Interface, 'building_glow');
        this._backGlow.anchor.set(0, 1);
        this._backGlow.alpha = 0;
        this._bottomHalf.addChild(this._backGlow);

        this.setUpBuildings(false, 'Blue');

        this._glow = new Phaser.Sprite(this.game, 0, 0, Atlases.Interface, 'building_glow');
        this._glow.anchor.set(0, 1);
        this._bottomHalf.addChild(this._glow);

        //top half
        this._topBackGlow = new Phaser.Sprite(this.game, 0, 0, Atlases.Interface, 'building_glow');
        this._topBackGlow.anchor.set(0, 1);
        this._topHalf.addChild(this._topBackGlow);

        this.setUpBuildings(true, 'Red');

        this._topGlow = new Phaser.Sprite(this.game, 0, 0, Atlases.Interface, 'building_glow');
        this._topGlow.anchor.set(0, 1);
        this._topHalf.addChild(this._topGlow);
        this._topHalf.y = -this._maxHeight * 1;
        this._topHalf.scale.set(1, -1);

        this._topBackGlow.tint = this._topGlow.tint = Constants.ROAD_COLORS[0]._bottomOuterColor;
        this._backGlow.tint = this._glow.tint = Constants.ROAD_COLORS[0]._topOuterColor;

    }

    private setUpBuildings(top: boolean, type: string): void
    {
        let pos: number = 0;
        while (pos < this._maxWidth)
        {
            let building: Phaser.Sprite;
            let index: number;

            index = Math.ceil(Math.random() * 11);
            building = new Phaser.Sprite(this.game, pos, 0, Atlases.Interface, 'Background_Building_' + type + '_' + (index < 10 ? '0' + index : index));

            building.anchor.set(0);
            building.scale.set((this.game.width / GAME_WIDTH) * .5);

            if (top)
            {
                this._topHalf.addChild(building);
                this._topBuildings.push(building);
            }
            else
            {
                this._bottomHalf.addChild(building);
                this._buildings.push(building);
            }
            pos += building.width + this._barDistance;
        }
    }

    public react(): void
    {
        if (this.reactTween) {
            this.reactTween.stop(true);
            this.reactTween.onComplete.removeAll();
        }

        this.reactTween = this.game.add.tween(this._bottomHalf.scale).to({y: 0.2}, 100, Phaser.Easing.Cubic.InOut, true).onUpdateCallback(() => {
            this._topHalf.scale.y = -this._bottomHalf.scale.y;
        });
        this.reactTween.onComplete.addOnce(() => {
            this.reactTween = this.game.add.tween(this._bottomHalf.scale).to({y: 1}, 500, Phaser.Easing.Cubic.InOut, true).onUpdateCallback(() => {
                this._topHalf.scale.y = -this._bottomHalf.scale.y;
            });
        });
    }

    /** Update the visualizer so it's values can update */
    public render(): void
    {
        //when context isn't available
        if (!this._contextAvailable)
        {
            if (!this._topIsActive)
            {
                this.renderBuildingWithoutContext(this._buildings, this._glow, this._backGlow);
                this.renderBuildingWithoutContext(this._topBuildings, this._topGlow, this._topBackGlow);
            }
            else
            {
                this.renderBuildingWithoutContext(this._topBuildings, this._topGlow, this._topBackGlow);
            }
            return;
        }

        //when context is available
        AudioAnalyser.getInstance().analyser.getByteFrequencyData(AudioAnalyser.getInstance().dataArray);

        //update wther one half is active
        if (!this._topIsActive)
        {
            this.renderBuilding(this._buildings, this._glow, this._backGlow);
            this.renderBuilding(this._topBuildings, this._topGlow, this._topBackGlow);
        }
        else
        {
            this.renderBuilding(this._topBuildings, this._topGlow, this._topBackGlow);
        }
    }

    private renderBuildingWithoutContext(array: Phaser.Sprite[], glow: Phaser.Sprite, backGlow: Phaser.Sprite): void
    {
        for (let i: number = Math.floor(array.length / 2); i--;)
        {
            let precentage: number = (1 - i / (array.length / 2));
            let height: number = array[i].height * precentage;
            array[i].y = -height;
            height = array[array.length - 1 - i].height * precentage;
            array[array.length - 1 - i].y = -height;
        }
        glow.alpha = backGlow.alpha = -array[1].y / array[1].height;
    }

    private renderBuilding(array: Phaser.Sprite[], glow: Phaser.Sprite, backGlow: Phaser.Sprite): void
    {
        for (let i: number = Math.floor(array.length / 2); i--;)
        {
            let precentage: number = AudioAnalyser.getInstance().dataArray[Math.round(array[i].x / this._maxWidth * AudioAnalyser.getInstance().bufferLength * 2)] / 256;
            let height: number = precentage * array[i].height;
            array[i].y = -height;
            height = precentage * array[array.length - 1 - i].height;
            array[array.length - 1 - i].y = -height;
        }
        glow.alpha = backGlow.alpha = -array[1].y / array[1].height;
    }

    public switch(): void
    {
        this._topIsActive = !this._topIsActive;
        this.deactivateHalf();
    }

    private deactivateHalf(): void
    {
        if (!this._topIsActive)
        {
            this.game.add.tween(this._topHalf).to({y: -this._maxHeight * 2}, this._switchTime, Phaser.Easing.Cubic.InOut, true);
            this.game.add.tween(this._bottomHalf).to({y: 0}, this._switchTime, Phaser.Easing.Cubic.InOut, true);
        }
        else
        {
            this.game.add.tween(this._topHalf).to({y: -this._maxHeight}, this._switchTime, Phaser.Easing.Cubic.InOut, true);
            this.game.add.tween(this._bottomHalf).to({y: this._maxHeight}, this._switchTime, Phaser.Easing.Cubic.InOut, true);
        }
    }

    public resize(): void
    {
        this.y = this.game.height * .6;
        requestAnimationFrame(() => {
            this.scale.set(this.game.width / this._maskGraphic.width, this.game.height * .2 / this._maskGraphic.height);
        });
    }

    public setColor(index: number): void {
        let random: number = Math.ceil(Math.random() * 11);

        for (let i: number = this._buildings.length; i--; )
        {
            random = Math.ceil(Math.random() * 11);
            this._buildings[i].frameName = 'Background_Building_' + Constants.ROAD_COLORS[index]._bottomSprite + '_' + (random < 10 ? '0' + random : random);
        }
        for (let i: number = this._topBuildings.length; i--; )
        {
            random = Math.ceil(Math.random() * 11);
            this._topBuildings[i].frameName = 'Background_Building_' + Constants.ROAD_COLORS[index]._topSprite + '_' + (random < 10 ? '0' + random : random);
        }
        this._topBackGlow.tint = this._topGlow.tint = Constants.ROAD_COLORS[index]._bottomOuterColor;
        this._backGlow.tint = this._glow.tint = Constants.ROAD_COLORS[index]._topOuterColor;
    }

    public destroy(): void
    {
        super.destroy(true);

        this._bottomHalf.destroy(true);
        this._bottomHalf = null;

        for (let i: number = this._buildings.length; i--; )
        {
            this._buildings[i].destroy();
            this._buildings.splice(i, 1);
        }
        this._buildings = null;

        this._glow.destroy(true);
        this._glow = null;

        this._backGlow.destroy(true);
        this._backGlow = null;

        this._topHalf.destroy(true);
        this._topHalf = null;

        for (let i: number = this._topBuildings.length; i--; )
        {
            this._topBuildings[i].destroy();
            this._topBuildings.slice(i, 1);
        }
        this._topBuildings = null;

        this._topGlow.destroy(true);
        this._topGlow = null;

        this._topBackGlow.destroy(true);
        this._topBackGlow = null;

        this._maskGraphic.destroy(true);
        this._maskGraphic = null;

        if (this.reactTween)
        {
            this.reactTween.stop(true);
        }
        this.reactTween = null;
    }
}
