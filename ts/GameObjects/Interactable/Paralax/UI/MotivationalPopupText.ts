import 'phaser-ce';
import PopupText from './PopupText';

export default class MotivationalPopupText extends PopupText
{
    private _coolPhrasesArray: string[] = ['Cool!', 'Dontastic!', 'Awesome!', 'Crazy!', 'Epic!', 'Rad!', 'Go Diablo!', 'Wonderfull!', 'Wow!', 'Bazinga!',
'Yeah!', 'Wooo!'];

    public react(): void
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
            if (!this._hideTween) { return; }
            this._hideTween.pause();
        });
        this._reactTween.onComplete.addOnce( () => {
            if (!this._hideTween) { return; }
            this._hideTween.resume();
        });
    }

    public showText(x: number, y: number, comboValue: number): void
    {
        this.position.setTo(x, y);
        this.fadeIn();
        switch (comboValue) {
            case 1:
            //white
            this.tint = 0xffffff;
            break;
            case 2:
            //light green
            this.tint = 0x7cd67d;
            break;
            case 4:
            //orange
            this.tint = 0xce8f31;
            break;
            case 8:
            //red
            this.tint = 0xdd4242;
            break;
            default:
            break;
        }
        this.text = this._coolPhrasesArray[Math.floor(Math.random() * this._coolPhrasesArray.length)];
        this.text += '\n' + comboValue + 'X';
    }

    protected fadeIn(): void
    {
        super.fadeIn();

        if (this.position.y > screen.width / 2)
        {
            this._hideTween = this.game.add.tween(this).to( {alpha: 0.30, y: this.position.y - 300}, 350, Phaser.Easing.Linear.None, true, 0, 0)
            .onUpdateCallback(() => {
                this.setScaleToAlpha();
            });
        }
        else
        {
            this._hideTween = this.game.add.tween(this).to( {alpha: 0.30, y: this.position.y + 300}, 350, Phaser.Easing.Linear.None, true, 0, 0)
            .onUpdateCallback(() => {
                this.setScaleToAlpha();
            });
        }
    }

    protected fadeOut(): void
    {
        super.fadeOut();

        this._hideTween = this.game.add.tween(this).to( {alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, 0)
            .onUpdateCallback(() => {
                this.setScaleToAlpha();
            }
        );
    }
}
