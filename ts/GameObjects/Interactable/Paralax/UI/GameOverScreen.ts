import 'phaser-ce';
import BasePopUp from './BasePopUp';

/** The game over screen shows the scre the player has achieved and is displayed in the uUI class. */
export default class GameOverScreen extends BasePopUp
{
    /** The text that shows the highscore */
    private _scoreText: Phaser.BitmapText;
    private _highScoreText: Phaser.BitmapText;

    constructor(game: Phaser.Game, scale: number)
    {
        super(game, scale);

        this._titleText.visible = false;
        this._menuBackground.frameName = 'UserInterface_GameOver_Backdrop';

        this._highScoreText = new Phaser.BitmapText(game, 0, -20, 'ailerons', 'highscore: ', 45);
        this._highScoreText.tint = 0xffffff;
        this._highScoreText.anchor.set(.5);
        this._highScoreText.scale.set(scale, scale);
        this.addChild(this._highScoreText);

        this._scoreText = new Phaser.BitmapText(game, 0, 50, 'ailerons', 'score: ', 45);
        this._scoreText.tint = 0xffffff;
        this._scoreText.anchor.set(.5);
        this._scoreText.scale.set(scale, scale);
        this.addChild(this._scoreText);
    }

    /** THe game over screen gets displayed */
    public show(score: number, highscore: number): void
    {
        this.visible = true;
        this.updateText(score, highscore);
    }

    /** THe game over screen is hidden */
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
