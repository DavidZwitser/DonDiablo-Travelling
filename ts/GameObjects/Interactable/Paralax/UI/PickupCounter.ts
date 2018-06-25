import 'phaser-ce';
import PopupText from './PopupText';

/** Displays the score */
export default class PickupCounter extends PopupText
{
    public score: number = 0;

    public react(): void
    {
        if (this._reactTween)
        {
            this._reactTween.stop(true);
            this._reactTween = null;
        }

        let desiredScale: number = Math.min(this.scale.x, this.scale.y) * 1.3;

        this._reactTween = this.game.add.tween(this.scale)
            .to({x: desiredScale, y: desiredScale}, 160, Phaser.Easing.Cubic.Out, true, 0, 0, true)
            .start();

        /* Pausing the hide/show tween so they don't interfere */
        this._reactTween.onStart.addOnce( () => {
            if (!this._hideTween) { return; }
            this._hideTween.pause();
        });
        this._reactTween.onComplete.addOnce( () => {
            if (!this._hideTween) { return; }
            this._hideTween.resume();
        });
    }

    /** Updates the score text by scoreincrease and randomnise its tint */
    public updateScore(scoreIncrease: number, changeColour: boolean): void
    {
        this.fadeIn();
        this.score += scoreIncrease;
        this.text = this.score.toString();
        if (changeColour)
        {
            this.tint = Math.random() * 0xffffff;
        }
        else
        {
            this.tint = 0xffffff;
        }
        this.react();
    }

    protected fadeIn(): void
    {
        super.fadeIn();

        this._hideTween = this.game.add.tween(this).to( {alpha: 0.15}, 250, Phaser.Easing.Linear.None, true, 0, 0)
            .onUpdateCallback(() => {
                this.setScaleToAlpha(10);
            }
        );
    }

    protected fadeOut(): void
    {
        super.fadeOut();

        this._hideTween = this.game.add.tween(this).to( {alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, 0)
            .onUpdateCallback(() => {
                this.setScaleToAlpha(10);
            }
        );
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
