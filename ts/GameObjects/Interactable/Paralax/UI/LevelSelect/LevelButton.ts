import 'phaser-ce';
import Atlases from '../../../../../Data/Atlases';
import AtlasImages from '../../../../../Data/AtlasImages';

export default class LevelButton extends Phaser.Button
{
    public icon: Phaser.Sprite;
    private _titleLabel: Phaser.BitmapText;
    private _artistLabel: Phaser.BitmapText;
    private _highscoreLabel: Phaser.BitmapText;

    constructor(game: Phaser.Game, x: number, y: number, level: {title: string, artist: string}, score: number, unlocked: boolean, callback: Function, callbackContext: any)
    {
        super(game, x, y, Atlases.INTERFACE, callback, callbackContext, AtlasImages.LEVEL_SELECT_BACKGROUND, AtlasImages.LEVEL_SELECT_BACKGROUND, AtlasImages.LEVEL_SELECT_BACKGROUND);

        this.anchor.set(.5);
        this.icon = new Phaser.Sprite(game, 200, 0, Atlases.INTERFACE, unlocked ? AtlasImages.OPEN_LEVEL : AtlasImages.LOCKED_LEVEL);
        this.icon.anchor.set(.5);
        this.addChild(this.icon);

        this._titleLabel = new Phaser.BitmapText(game, -300, -30, 'futura', level.title, 40);
        this._titleLabel.anchor.set(0, .5);
        this.addChild(this._titleLabel);

        this._artistLabel = new Phaser.BitmapText(game, -300, -0, 'futura', level.artist, 30);
        this._artistLabel.anchor.set(0, .5);
        this.addChild(this._artistLabel);

        this._highscoreLabel = new Phaser.BitmapText(game, -300, 40, 'futura', 'highscore: ' + score, 40);
        this._highscoreLabel.anchor.set(0, .5);
        this.addChild(this._highscoreLabel);
    }
}
