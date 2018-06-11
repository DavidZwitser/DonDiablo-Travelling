import 'phaser-ce';

import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';
import Constants from '../../../../Data/Constants';
import SaveData from '../../../../BackEnd/SaveData';

export default class HexBar extends Phaser.Group
{
    private _valueSprite: Phaser.Sprite;
    private _backDropSprite: Phaser.Sprite;
    private _foreGroundSprite: Phaser.Sprite;

    private _fillMask: Phaser.Graphics;
    private _value: number = 0.5;
    public onFull: Phaser.Signal;
    private scaleTween: Phaser.Tween;

    private hexPartToCollect: Phaser.Sprite;

    constructor(game: Phaser.Game, x: number, y: number)
    {
        super(game);
        this.x = x;
        this.y = y;

        this.onFull = new Phaser.Signal();

        this._backDropSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.INTERFACE, AtlasImages.SCORE_BAR_BACKGROUND);
        this._valueSprite = new Phaser.Sprite(this.game, 10, -55, Atlases.INTERFACE, AtlasImages.SCORE_BAR_FILL);
        this._foreGroundSprite = new Phaser.Sprite(this.game, this._valueSprite.x - 2, this._valueSprite.y + 2,  Atlases.INTERFACE, AtlasImages.SCORE_BAR_FOREGROUND);

        this._fillMask = new Phaser.Graphics(game, this._valueSprite.x, this._valueSprite.y);
        this._fillMask.beginFill(0xFF3300);
        this._fillMask.drawRect(0, 0, this._valueSprite.width, -this._valueSprite.height);
        this._fillMask.endFill();
        this._valueSprite.mask = this._fillMask;

        this._valueSprite.anchor.set(0, 1);
        this._backDropSprite.anchor.set(0, 1);
        this._foreGroundSprite.anchor.set(0, 1);

        this.hexPartToCollect = new Phaser.Sprite(game, 20, -320, Atlases.INTERFACE, 'Hearth_silhouette');
        this.hexPartToCollect.anchor.set(.5);
        this.hexPartToCollect.scale.set(.3);

        this.value = SaveData.HEX_BAR_VALUE;

        this.addChild(this._backDropSprite);
        this.addChild(this._valueSprite);
        this.addChild(this._foreGroundSprite);
        this.addChild(this._fillMask);
        this.addChild(this.hexPartToCollect);

        this.resize();
    }

    public updateFill(): void
    {
        if (this.scaleTween) {
            this.scaleTween.stop();
        }

        this.scaleTween = this.game.add.tween(this._fillMask.scale).to({y: this._value / Constants.PICKUPS_BEFORE_HEX_PART}, 600, Phaser.Easing.Elastic.InOut);
        this.scaleTween.start();
    }

    public get value(): number
    {
        return this._value;
    }
    public set value(value: number)
    {
        this._value = value;

        if (value / Constants.PICKUPS_BEFORE_HEX_PART >= 1)
        {
            this.onFull.dispatch();
            this.value = 0;
        }

        if (value % 10 === 0) { SaveData.HEX_BAR_VALUE = value; }

        this.updateFill();
    }

    public reset(): void
    {
        this.value = 0;
    }

    public resize(): void
    {
        let vmin: number = Math.min(this.game.width, this.game.height / 2);
        this.position.set(0, this.game.height / 2 + this.height / 2);
        this.scale.set(vmin / GAME_WIDTH);
    }

    public destroy(): void {
        super.destroy(true, true);

        if (this.onFull) {
            this.onFull.removeAll();
        }
        this.onFull = null;

        if (this.scaleTween) { this.scaleTween.stop(); }
        this.scaleTween = null;
    }

}
