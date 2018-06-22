import Atlases from '../../Data/Atlases';
import SecretUnlocker from '../Secret/SecretUnlocker';

export default class BackgroundVisualizer extends Phaser.Group
{
    //private _secretUnlocker: SecretUnlocker;

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

    private addSignal(): void
    {
        this._secretUnlocker._secretSignal.add (() =>
        {
            // make BG visible
        });
    }

    private addBackground(): void
    {
        this._backgroundSprite = this.game.add.sprite(0, 0, Atlases.INTERFACE, 'bgsecret');
        this._backgroundSprite.height = this.game.height;
        this._backgroundSprite.width = this.game.width;

        this._backgroundSprite.visible = false;

       // this.game.add.tween(this._backgroundSprite.position).to( {y: 100}, 2200, Phaser.Easing.Sinusoidal.InOut, true, 2000, 20, true).loop(true);

    }

    public makeVisible(): void
    {
        this._backgroundSprite.visible = true;
    }

}
