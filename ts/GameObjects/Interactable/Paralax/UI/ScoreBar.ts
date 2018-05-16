import 'phaser-ce';

import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';

export default class ScoreBar extends Phaser.Group
{

    private _valueSprite: Phaser.Sprite;
    private _backDropSprite: Phaser.Sprite;
    private _foreGroundSprite: Phaser.Sprite;

    constructor(game: Phaser.Game, x: number, y: number)
    {
        super(game);

        this._backDropSprite = new Phaser.Sprite(this.game, x, y, Atlases.Interface, AtlasImages.ScoreBarBackground);
        this._valueSprite = new Phaser.Sprite(this.game, x, y, Atlases.Interface, AtlasImages.ScoreBarFill);
        this._foreGroundSprite = new Phaser.Sprite(this.game, x, y,  Atlases.Interface, AtlasImages.ScoreBarForeground);

        this._valueSprite.y -= (this._backDropSprite.height - this._valueSprite.height) / 2;
        this._valueSprite.x += (this._backDropSprite.width - this._valueSprite.width) / 2;

        this._valueSprite.anchor.set(0, 1);
        this._backDropSprite.anchor.set(0, 1);
        this._foreGroundSprite.anchor.set(0, 1);

        this.barFill(0);

        this.addChild(this._backDropSprite);
        this.addChild(this._valueSprite);
        this.addChild(this._foreGroundSprite);

        this.resize();
    }

    public barFill(deltaFill: number): void
    {
        this._valueSprite.scale.setTo(this._valueSprite.scale.x, deltaFill);
    }

    public resize(): void
    {
        let vmin: number = Math.min(this.game.width, this.game.height / 2);

        this.position.set(0, this.game.height / 1.25);
        this.scale.set(vmin / GAME_WIDTH);
    }

}
