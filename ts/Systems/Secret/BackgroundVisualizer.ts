import Atlases from '../../Data/Atlases';

export default class BackgroundVisualizer extends Phaser.Group
{
    private _backgroundSprite: Phaser.Sprite;

    get getBackgroundSprite(): Phaser.Sprite
    {
        return this._backgroundSprite;
    }
    set setBackgroundSprite(theSprite: Phaser.Sprite)
    {
        this._backgroundSprite = theSprite;
    }

    constructor(game: Phaser.Game)
    {
        super(game);
        this.addBackground();
    }

    private addBackground(): void
    {
        this._backgroundSprite = this.game.add.sprite(0, 0, Atlases.INTERFACE, 'bgsecret');
        this._backgroundSprite.height = this.game.height;
        this._backgroundSprite.width = this.game.width;

        this._backgroundSprite.visible = false;
    }

    public makeVisible(): void
    {
        this._backgroundSprite.visible = true;

        this._backgroundSprite.alpha = 0;
        this.game.add.tween(this._backgroundSprite).to( { alpha: 1 }, 1000, 'Linear', true);
    }
}
