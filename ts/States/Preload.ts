import 'phaser-ce';

import IGame from '../PluginManagers/IGame';

import Images from '../Data/Images';
import Sounds from '../Data/Sounds';
import Menu from './Menu';
import Atlases from '../Data/Atlases';
import Spines from '../Data/Spines';
import SpriteSheets from '../Data/SpriteSheets';
import JSON from '../Data/JSON';

/** The preload state handles the following:
 * -Making sure all the assets are loaded in (with exception of the music played in the gameplay state)
 * -Handles the loading screen
 */
export default class Preload extends Phaser.State
{
    public static Name: string = 'preload';

    public name: string = Preload.Name;
    public game: IGame;

    private _preloadImage: Phaser.Sprite;
    private _preloadText: Phaser.Sprite;

    constructor(game: IGame)
    {
        super();
        this.game = game;
    }

    /** All the assets the game needs are loaded here */
    public preload(): void
    {
        super.preload(this.game);

        this._preloadImage = this.game.add.sprite(0, 0, 'load_screen');

        this._preloadText = new Phaser.Sprite(this.game, this._preloadImage.width / 2, this._preloadImage.height * .4, 'load_screen_text');
        this._preloadText.anchor.set(.5);
        this._preloadImage.addChild(this._preloadText);
        this.game.add.tween(this._preloadText).to({alpha: 0.5}, 400, Phaser.Easing.Linear.None, true, 0, 0, true).loop(true);

        this._preloadImage.width = this.game.width;
        this._preloadImage.height = this.game.height;

        this.game.load.bitmapFont('futura', 'assets/fonts/futura.png', 'assets/fonts/futura.xml');
        this.game.load.bitmapFont('ailerons', 'assets/fonts/ailerons.png', 'assets/fonts/ailerons.xml');

        SpriteSheets.List.forEach((sheet: {name: string, frameWidth: number, frameHeight: number, amountOfFrames: number}) => {
            this.game.load.spritesheet(sheet.name, 'assets/spritesheets/' + sheet.name + '.png', sheet.frameWidth, sheet.frameHeight, sheet.amountOfFrames);
        });

        Atlases.List.forEach((assetName: string) => {
            this.game.load.atlas(assetName, 'assets/atlases/' + assetName + '.png', 'assets/atlases/' + assetName + '.json');
        });

        Images.List.forEach((assetName: string) => {
            this.game.load.image(assetName, 'assets/sprites/' + assetName + '.png');
        });

        Sounds.List.forEach((assetName: string) => {
            this.game.load.audio(assetName, ['assets/music/' + assetName + '.ogg', 'assets/music/' + assetName + '.mp3']);
        });

        Spines.List.forEach((assetName: string) => {
            this.game.load.spine(assetName, 'assets/spine/' + assetName + '.json');
        });

        JSON.LIST.forEach((assetName: string) => {
            this.game.load.json(assetName, 'assets/json/' + assetName + '.json');
        });

        this.game.load.image('load_screen_start', 'assets/sprites/UserInterface_SplashScreen_Start.png');
    }

    /** After preload, the text changes a click event is started to go to the game */
    public create(): void
    {
        super.create(this.game);
        this._preloadText.loadTexture('load_screen_start');
        this.game.add.tween(this._preloadText.scale).to({x: 1.2, y: 1.2}, 500, Phaser.Easing.Cubic.InOut, true, 0, 0, true);

        this.game.input.onDown.addOnce(() => {
            this.goToMenu();
        });
    }

    /** Goes to the menu state */
    private goToMenu(): void
    {
        this.state.start(Menu.Name);
    }

    public resize(): void
    {
        this._preloadImage.width = this.game.width;
        this._preloadImage.height = this.game.height;

    }
    public shutdown(): void
    {
        super.shutdown(this.game);

        this._preloadText.destroy(true);
        this._preloadText = null;

        this._preloadImage.destroy(true);
        this._preloadImage = null;

        this.game.tweens.removeAll();
    }

}
