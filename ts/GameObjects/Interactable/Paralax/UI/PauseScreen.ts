import 'phaser-ce';
import BasePopUp from './BasePopUp';

export default class PauseScreen extends BasePopUp
{
    /** The text that shows the highscore */
    private _highScoreText: Phaser.BitmapText;

    constructor(game: Phaser.Game, scale: number, buttonOffset: number, spaceBetweenButtons: number)
    {
        super(game, scale, buttonOffset, spaceBetweenButtons);

        this._titleText.text = 'GAME OVER';

        this._highScoreText = new Phaser.BitmapText(game, 0 , 60, 'myfont', 'highscore: ', 60);
        let text: Phaser.Text = new Phaser.Text(this.game, 0, 0 , 'COOL');
        this.addChild(text);
        this._highScoreText.tint = 0x181137;
        this._highScoreText.anchor.set(0, 0.5);
        this._highScoreText.scale.set(scale, scale);

        this.addChild(this._highScoreText);
        this._highScoreText.anchor.set(0.5);
    }

    /** Update the highscore text */
    public updateText(newHighScore: boolean): void
    {
        if (newHighScore)
        {
        this._highScoreText.text = 'New highscore!';
        }
        else
        {
        this._highScoreText.text = 'Highscore: ';
        }
    }

    public destroy(): void
    {
        super.destroy();

        if (this._highScoreText) { this._highScoreText.destroy(true); }
        this._highScoreText = null;
    }

}
