import 'phaser-ce';
import BasePopUp from './BasePopUp';

export default class GameOverScreen extends BasePopUp
{
    /** The text that shows the highscore */
    private _scoreText: Phaser.BitmapText;
    private _highScoreText: Phaser.BitmapText;

    constructor(game: Phaser.Game, scale: number, buttonOffset: number, spaceBetweenButtons: number)
    {
        super(game, scale, buttonOffset, spaceBetweenButtons);

        this._titleText.text = 'GAME OVER';

        this._highScoreText = new Phaser.BitmapText(game, 0, -20, 'myfont', 'highscore: ', 45);
        this._highScoreText.tint = 0x181137;
        this._highScoreText.anchor.set(.5);
        this._highScoreText.scale.set(scale, scale);
        this.addChild(this._highScoreText);

        this._scoreText = new Phaser.BitmapText(game, 0, 50, 'myfont', 'score: ', 45);
        this._scoreText.tint = 0x181137;
        this._scoreText.anchor.set(.5);
        this._scoreText.scale.set(scale, scale);
        this.addChild(this._scoreText);
    }

    public show(score: number, highscore: number): void
    {
        this.visible = true;
        this.updateText(score, highscore);
    }

    public hide(): void
    {
        this.visible = false;
    }

    /** Update the highscore text */
    private updateText(score: number, highscore: number): void
    {
        this._highScoreText.text = score > highscore ? 'New highscore!: ' : 'Highscore: ' + highscore;
        this._scoreText.text = 'Score: ' + score;
    }

    public destroy(): void
    {
        super.destroy();

        if (this._highScoreText) { this._highScoreText.destroy(true); }
        this._highScoreText = null;

        if (this._scoreText) { this._scoreText.destroy(true); }
        this._scoreText = null;
    }

}
