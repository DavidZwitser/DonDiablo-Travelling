import 'phaser-ce';
import Constants from '../../../../Data/Constants';
import { setTimeout, clearTimeout } from 'timers';
import PlayerCollisionChecker from '../../../../Systems/PlayerCollisionChecker';

export default class PickupCounter extends Phaser.BitmapText
{
    private _timeOutID: NodeJS.Timer;

    private _hideTween: Phaser.Tween;

    private _reactTween: Phaser.Tween;

    private _coolPhrasesArray: string[] = ['Cool!', 'Dontastic!', 'Awesome!', 'Crazy!', 'Epic!', 'Rad!', 'Go Diablo!'];

    constructor(game: Phaser.Game, x: number, y: number)
    {
        super(game, x, y, 'myfont', '0');
        this.anchor.set(.5);
        this.alpha = 0.0;
        this.filters = [new Phaser.Filter(this.game, null, Constants.GLOW_FILTER)];
    }

    private reactToCollection(): void
    {
        if (this._reactTween)
        {
            this._reactTween.stop();
            this._reactTween = null;
        }

        let desiredScale: number = Math.min(this.scale.x, this.scale.y) * 1.3;

        this._reactTween = this.game.add.tween(this.scale)
            .to({x: desiredScale, y: desiredScale}, 160, Phaser.Easing.Cubic.Out, true, 0, 0, true)
            .start();

        /* Pausing the hide/show tween so they don't interfere */
        this._reactTween.onStart.addOnce( () => {
            this._hideTween.pause();
        });
        this._reactTween.onComplete.addOnce( () => {
            this._hideTween.resume();
        });
    }

    public showText(): void
    {
        this.fadeIn();
        this.text = this._coolPhrasesArray[Math.floor(Math.random() * this._coolPhrasesArray.length)];
    }

    private fadeIn(): void
    {
        this.stopHide();

        this._hideTween = this.game.add.tween(this).to( {alpha: 0.15}, 250, Phaser.Easing.Linear.None, true, 0, 0)
            .onUpdateCallback(() => {
                this.setScaleToAlpha();
            }
        );

        clearTimeout(this._timeOutID);
        this._timeOutID = setTimeout(this.fadeOut.bind(this), 1000);
    }

    private fadeOut(): void
    {
        this.stopHide();
        this._hideTween = this.game.add.tween(this).to( {alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, 0)
            .onUpdateCallback(() => {
                this.setScaleToAlpha();
            }
        );
    }

    private setScaleToAlpha(): void
    {
        let desiredScale: number = 1 + this.alpha * 1 / 0.1;

        this.scale.set(desiredScale, desiredScale);
    }

    private stopHide(): void
    {
        if (this._hideTween)
        {
            this._hideTween.stop();
            this._hideTween = null;
        }
    }
}
