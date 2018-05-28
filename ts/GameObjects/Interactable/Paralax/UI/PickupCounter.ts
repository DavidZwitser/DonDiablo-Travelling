import 'phaser-ce';
import Constants from '../../../../Data/Constants';
import { setTimeout, clearTimeout } from 'timers';

export default class PickupCounter extends Phaser.BitmapText
{
    private _score: number = 0;

    private _timeOutID: NodeJS.Timer;

    private fadingTween: Phaser.Tween;

    constructor(game: Phaser.Game, x: number, y: number)
    {
        super(game, x, y, 'myfont', '0');
        this.anchor.set(.5);
        this.alpha = 0.0;
        this.scale.set(1, 1);
        this.filters = [new Phaser.Filter(this.game, null, Constants.GLOW_FILTER)];
    }

    public updateScore(scoreIncrease: number): void
    {
        this.fadeIn();
        this._score += scoreIncrease;
        this.text = this._score.toString();

    }

    private fadeIn(): void
    {
        this.stopFade();
        this.fadingTween = this.game.add.tween(this).to( { alpha: 0.15}, 1000, Phaser.Easing.Linear.None, true, 0, 0).onUpdateCallback(() => {
            this.scale.set(1 + this.alpha * 1.5 / 0.15, 1 + this.alpha * 1.5 / 0.15);
        });

        clearTimeout(this._timeOutID);
        this._timeOutID = setTimeout(this.fadeOut.bind(this), 1000);
    }

    private fadeOut(): void
    {
        this.stopFade();
        this.fadingTween = this.game.add.tween(this).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, 0).onUpdateCallback(() => {
            //console.log(this.alpha);
            this.scale.set(1 + this.alpha * 1.5 / 0.15, 1 + this.alpha * 1.5 / 0.15);
        });
    }

    private stopFade(): void
    {
        if (this.fadingTween)
        {
            this.fadingTween.stop();
            this.fadingTween = null;
        }
    }
}
