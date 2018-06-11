import 'phaser-ce';

import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';
import Constants from '../../../../Data/Constants';
import SaveData from '../../../../BackEnd/SaveData';
import { HexParts, defaultHexPartsData, IHexBodyPart } from './HexPartsMenu/HexPartsData';

export default class HexBar extends Phaser.Group
{
    private _valueSprite: Phaser.Sprite;
    private _backDropSprite: Phaser.Sprite;
    private _foreGroundSprite: Phaser.Sprite;

    private _healthIndicators: Phaser.Sprite[];
    private _maxHealth: number = 5;
    private _currentHealth: number = 5;

    private _fillMask: Phaser.Graphics;
    private _value: number = 0.5;
    public onFull: Phaser.Signal;
    public onHealthEmpty: Phaser.Signal;
    private scaleTween: Phaser.Tween;

    private _hexPartTween: Phaser.Tween;
    private _hexPartSecondTween: Phaser.Tween;
    private _hexPartScaleTween: Phaser.Tween;
    private _unlockedText: Phaser.BitmapText;

    private _hexPartToCollect: Phaser.Sprite;

    constructor(game: Phaser.Game, x: number, y: number)
    {
        super(game);
        this.x = x;
        this.y = y;

        Constants.PICKUPS_BEFORE_HEX_PART = 300 + this.PrecentHexCollected() * 300;

        this.onFull = new Phaser.Signal();
        this.onHealthEmpty = new Phaser.Signal();

        this._backDropSprite = new Phaser.Sprite(this.game, 0, 0, Atlases.INTERFACE, AtlasImages.SCORE_BAR_BACKGROUND);
        this._valueSprite = new Phaser.Sprite(this.game, 10, -30, Atlases.INTERFACE, AtlasImages.SCORE_BAR_FILL);
        this._foreGroundSprite = new Phaser.Sprite(this.game, this._valueSprite.x - 2, this._valueSprite.y + 2,  Atlases.INTERFACE, AtlasImages.SCORE_BAR_FOREGROUND);

        this._fillMask = new Phaser.Graphics(game, this._valueSprite.x, this._valueSprite.y);
        this._fillMask.beginFill(0xFF3300);
        this._fillMask.drawRect(0, 0, this._valueSprite.width, -this._valueSprite.height);
        this._fillMask.endFill();
        requestAnimationFrame (() => {
            this._valueSprite.mask = this._fillMask;
        });

        this._valueSprite.anchor.set(0, 1);
        this._backDropSprite.anchor.set(0, 1);
        this._foreGroundSprite.anchor.set(0, 1);

        this._hexPartToCollect = new Phaser.Sprite(game, 30, -335, Atlases.INTERFACE, this.getNextPickup() + '_silhouette');
        this._hexPartToCollect.anchor.set(.5);
        this._hexPartToCollect.scale.set(.3);

        this._unlockedText = new Phaser.BitmapText(game, 0, -70, 'futura', '', 30);
        this._unlockedText.tint = 0xffffff;
        this._unlockedText.anchor.set(.2, .5);
        this._hexPartToCollect.addChild(this._unlockedText);

        this.value = SaveData.HEX_BAR_VALUE;

        this.addChild(this._backDropSprite);
        this.addChild(this._valueSprite);
        this.addChild(this._foreGroundSprite);
        this.addChild(this._fillMask);
        this.addChild(this._hexPartToCollect);

        this._healthIndicators = [];
        for (let i: number = 0; i < 5; i++) {
            let indicator: Phaser.Sprite = new Phaser.Sprite(this.game, 40, -100 - i * 40, Atlases.INTERFACE, 'Knop_Full');
            indicator.anchor.set(.5);
            this.addChild(indicator);
            this._healthIndicators.push(indicator);
        }

        this.Health = this._maxHealth;

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

        if (this.value / Constants.PICKUPS_BEFORE_HEX_PART >= 1)
        {
            this.ShowCollectedHexPart();
            this.onFull.dispatch();
            this.value = 0;
            SaveData.HEX_BAR_VALUE = this.value;
            Constants.PICKUPS_BEFORE_HEX_PART = 100 + this.PrecentHexCollected() * 300;
        }
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

    public ShowCollectedHexPart(): void {
        this._hexPartToCollect.frameName = this.getNextPickup();

        this._unlockedText.text = this.getNextPickup() + '\nunlocked!';
        this._hexPartScaleTween = this.game.add.tween(this._hexPartToCollect.scale).to({x: this._hexPartToCollect.scale.x * 4, y: this._hexPartToCollect.scale.y * 4},
            1500, Phaser.Easing.Cubic.InOut, true, 0, 0, true);

        this._hexPartTween = this.game.add.tween(this._hexPartToCollect).to({x: 100, y: -400}, 1500, Phaser.Easing.Cubic.InOut, true);
        this._hexPartSecondTween = this.game.add.tween(this._hexPartToCollect).to({x: -200, y: -400}, 1500, Phaser.Easing.Cubic.InOut);
        this._hexPartTween.chain(this._hexPartSecondTween);
        this._hexPartSecondTween.onComplete.addOnce(() => {
            this._hexPartToCollect.position.set(30, -335);
            this._hexPartToCollect.frameName = this.getNextPickup() + '_silhouette';
            this._unlockedText.text = '';

        });
    }

    private getNextPickup(): string
    {
        let desiredPickup: HexParts = SaveData.NEXT_HEX_PICKUP;
        let value: string = '';
        Object.keys(defaultHexPartsData).forEach((bodyPartKey: any) => {
            let currentBodyPart: IHexBodyPart = defaultHexPartsData[bodyPartKey];

            Object.keys(currentBodyPart.subParts).forEach( (subPartKey: any) => {
                if (subPartKey - desiredPickup === 0)
                {
                    value = currentBodyPart.subParts[subPartKey].frameName;
                }

            });
        });
        return value;
    }

    public get Health(): number {
        return this._currentHealth;
    }
    public set Health(value: number) {
        this._currentHealth = Math.max(0, Math.min(this._maxHealth, value));
        this.updateHealthIndicators();
        if (this.Health === 0) {
            this.onHealthEmpty.dispatch();
        }

    }

    private updateHealthIndicators(): void {
        for (let i: number = 0; i < this._healthIndicators.length; i++) {
            if (this.Health / this._maxHealth > i / this._healthIndicators.length) {
                this._healthIndicators[i].frameName = 'Knop_Full';
            } else {
                this._healthIndicators[i].frameName = 'Knop_Empty';
            }
        }
    }

    public destroy(): void {
        SaveData.HEX_BAR_VALUE = this.value;
        super.destroy(true, true);

        if (this.onFull) {
            this.onFull.removeAll();
        }
        this.onFull = null;

        if (this.onHealthEmpty) {
            this.onHealthEmpty.removeAll();
        }
        this.onHealthEmpty = null;

        if (this.scaleTween) { this.scaleTween.stop(); }
        this.scaleTween = null;

        if (this._hexPartScaleTween) { this._hexPartScaleTween.stop(); }
        this._hexPartScaleTween = null;

        if (this._hexPartTween) { this._hexPartTween.stop(); }
        this._hexPartTween = null;

        if (this._hexPartSecondTween) { this._hexPartSecondTween.stop(); }
        this._hexPartSecondTween = null;
    }

    public PrecentHexCollected(): number
    {
        let total: number = 0;
        let collected: number = 0;
        Object.keys(defaultHexPartsData).forEach((bodyPartKey: any) => {
            let currentBodyPart: IHexBodyPart = SaveData.HEX_COLLECTIBLES_DATA[bodyPartKey];

            Object.keys(currentBodyPart.subParts).forEach( (subPartKey: any) => {
                total++;
                if (currentBodyPart.subParts[subPartKey].collected) {
                    collected++;
                }
            });
        });
        return Math.round((collected / total) * 100) / 100;
    }
}
