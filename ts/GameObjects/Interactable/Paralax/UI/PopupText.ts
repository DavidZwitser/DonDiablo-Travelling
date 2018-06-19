import 'phaser-ce';
import Constants from '../../../../Data/Constants';
import { setTimeout, clearTimeout } from 'timers';

/**
 * This text is an bitmatext that can react to the music by using tweens
 */
export default abstract class PopupText extends Phaser.BitmapText
{
    protected _timeOutID: NodeJS.Timer;

    protected _reactTween: Phaser.Tween;
    protected _hideTween: Phaser.Tween;

    constructor(game: Phaser.Game, x: number, y: number)
    {
        super(game, x, y, 'futura', '0');

        this.anchor.set(.5);
        this.alpha = 0.0;
        this.scale.set(1, 1);

        if (Constants.USE_FILTERS === true)
        {
            this.filters = [new Phaser.Filter(this.game, null, Constants.GLOW_FILTER)];
        }
    }

    /** Called when the world reacts */
    public abstract react(): void;

    /**
     * Fades in the popuptext temporary
     */
    protected fadeIn(): void
    {
        this.stopHide();

        clearTimeout(this._timeOutID);
        this._timeOutID = setTimeout(this.fadeOut.bind(this), 1200);
    }

    /**
     * Fades out de the text object
     */
    protected fadeOut(): void
    {
        this.stopHide();
    }

    protected setScaleToAlpha(scaleMultiplier: number = 1): void
    {
        let desiredScale: number = 1 + this.alpha * scaleMultiplier;

        this.scale.set(desiredScale, desiredScale);
    }

    /** Stops the hidetween for a good reset and reusing the tween. */
    private stopHide(): void
    {
        if (this._hideTween)
        {
            this._hideTween.stop(true);
            this._hideTween = null;
        }
    }

    public destroy(): void
    {
        if (this._reactTween) { this._reactTween.stop(true); }
        this._reactTween = null;

        if (this._hideTween) { this._hideTween.stop(true); }
        this._hideTween = null;

        clearTimeout(this._timeOutID);
        this._timeOutID = null;
    }
}
