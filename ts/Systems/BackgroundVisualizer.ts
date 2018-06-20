import ReactivePerspectiveObject from '../Rendering/Sprites/ReactivePerspectiveObject';
import Atlases from '../Data/Atlases';
import AtlasImages from  '../Data/Atlases';
import PerspectiveRenderer from '../Rendering/PerspectiveRenderer';
import Constants from '../Data/Constants';

export default class BackgroundVisualizer extends Phaser.Group
{
    private _backgroundSprite: Phaser.Sprite;

    get getBackgroundSprite():Phaser.Sprite {
        return this._backgroundSprite;
    }
    set setBackgroundSprite(theSprite:Phaser.Sprite) {
        this._backgroundSprite = theSprite;
    }

    constructor(game: Phaser.Game)
    {
        super(game);

         //art assigning
        this._backgroundSprite = this.game.add.sprite(0, 0, Atlases.INTERFACE, 'bgsecret');
        this._backgroundSprite.height = this.game.height;
        this._backgroundSprite.width = this.game.width;

        
        game.add.tween(this._backgroundSprite.position).to( {y: 100}, 2200, Phaser.Easing.Sinusoidal.InOut, true, 2000, 20, true).loop(true);
        }
  }
