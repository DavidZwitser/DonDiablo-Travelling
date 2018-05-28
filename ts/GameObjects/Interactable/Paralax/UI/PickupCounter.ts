import 'phaser-ce';
import Constants from '../../../../Data/Constants';

export default class PickupCounter extends Phaser.BitmapText
{
    private _score: number = 0;

    constructor(game: Phaser.Game, x: number, y: number)
    {
        super(game, x, y, 'myfont', '0');

        this.anchor.set(.5);
        this.alpha = 0.1;
        this.scale.set(3, 3);
        this.filters = [new Phaser.Filter(this.game, null, Constants.GLOW_FILTER)];
    }

    public updateScore(scoreIncrease: number): void
    {
        this._score += scoreIncrease;
        this.text = this._score.toString();
    }
}
