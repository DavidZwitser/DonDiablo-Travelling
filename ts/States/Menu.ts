import 'phaser-ce';

import Test from './Test';
import TextButton from '../GameObjects/Interactable/Paralax/UI/TextButton';
import SettingPopup from '../GameObjects/Interactable/Paralax/UI/SettingPopup';
import LevelSelect from '../GameObjects/Interactable/Paralax/UI/LevelSelect/LevelSelect';
import Atlases from '../Data/Atlases';
import AtlasImages from '../Data/AtlasImages';
import CreditsScreen from '../GameObjects/Interactable/Paralax/UI/CreditsScreen';
import Sounds from '../Data/Sounds';
import SoundManager from '../Systems/Sound/SoundManager';
import VehicleSelect from '../GameObjects/Interactable/Paralax/UI/VehicleSelect';

import Viewer from '../GameObjects/Interactable/Paralax/UI/HexPartsMenu/HexPartsViewerScreen';

/** The menu which opens before the game and in which you can change things about the game */
export default class Menu extends Phaser.State
{
    public static Name: string = 'menu';

    public name: string = Menu.Name;

    /** The group where all the main buttons are place in */
    private _mainButtonsGroup: Phaser.Group;
    /** The main title sprite */
    private _logoSprite: Phaser.Sprite;
    /** The background sprite */
    private _backgroundSprite: Phaser.Sprite;

    /** The settings popup */
    private _settingGroup: SettingPopup;
    /** The level select screen */
    private _levelSelect: LevelSelect;
    /** The credit screen credits */
    private _creditsScreen: CreditsScreen;
    /** The vehicle select screen */
    private _vehicleSelect: VehicleSelect;
    /** The hex screen */
    private _hexViewer: Viewer;

    /** The particle emitter for the menu particles */
    private _worldEmitter: Phaser.Particles.Arcade.Emitter;

    constructor()
    {
        super();
    }

    public init(): void
    {
        /* Setting up sound manager */
        SoundManager.getInstance(this.game);
    }

    public create(): void
    {
        super.create(this.game);

        /* Start playing menu music */
        SoundManager.getInstance().play(Sounds.UI_MENU_MUSIC , 1, true);

        /* Create the background sprite */
        this._backgroundSprite = this.game.add.sprite(0, 0, Atlases.Interface, 'bg');

        /* Create the world emitter */
        this._worldEmitter = this.createWorldEmitter();
        this.add.existing(this._worldEmitter);

        /* Create the logo sprite */
        this._logoSprite = this.game.add.sprite(0, 0, Atlases.Interface, AtlasImages.Logo);
        this._logoSprite.anchor.set(.5);

        /* Create the main buttons group */
        this._mainButtonsGroup = this.createMainButtons();
        this.add.existing(this._mainButtonsGroup);

        /* Create the settings group */
        this._settingGroup = new SettingPopup(this.game);
        this.game.add.existing(this._settingGroup);
        this._settingGroup.onBack.add(this.showMainMenu.bind(this));

        /* Create the level select window */
        this._levelSelect = new LevelSelect(this.game);
        this.game.add.existing(this._levelSelect);
        this._levelSelect.onBack.add(this.showMainMenu.bind(this));

        /* Create the credits screen window */
        this._creditsScreen = new CreditsScreen(this.game, () => {
            this.showAMenu(this._mainButtonsGroup);
        });
        this.game.add.existing(this._creditsScreen);

        /* Creating the hex window */
        this._hexViewer = new Viewer(this.game);
        this.game.add.existing(this._hexViewer);
        this._hexViewer.onBack.add(this.showMainMenu.bind(this));

        /* Creating the vehicle select window */
        this._vehicleSelect = new VehicleSelect(this.game, () => {
            this.showAMenu(this._mainButtonsGroup);
        });
        this.game.add.existing(this._vehicleSelect);

        /* Starting the main menu by default */
        this.showAMenu(this._mainButtonsGroup);

        /* Rest */
        this.resize();
    }

    /* Create all the main buttons for the main menu */
    public createMainButtons(): Phaser.Group {

        let group: Phaser.Group = new Phaser.Group(this.game);

        /* Creating the play button */
        let playButton: TextButton = new TextButton(this.game, 0, 0, '', 40, 'UserInterface_Menu_PlayButton', this.showLevelSelect, this);
        group.addChild(playButton);

        /* Creating the test button */
        let testButton: TextButton = new TextButton(this.game, 0, 300, 'particle editor', 40, AtlasImages.Menu_Button, () => {
            this.state.start(Test.Name);
        }, this);
        testButton.scale.set(.5);
        group.addChild(testButton);

        /* Creating the settings button */
        let settingButton: TextButton = new TextButton(this.game, -135, 180, '', 40, 'UserInterface_Menu_Options', () => {
            this.showAMenu(this._settingGroup);
        }, this);
        group.addChild(settingButton);

        /* Creating the credits button */
        let creditsButton: TextButton = new TextButton(this.game, 135, 180, '', 40, 'UserInterface_Menu_Credits', () => {
            this.showAMenu(this._creditsScreen);
        }, this);
        group.addChild(creditsButton);

        /* Creating the car select button */
        let characterButton: TextButton = new TextButton(this.game, -200, 70, '', 40, 'UserInterface_Menu_CharacterSelect', () => {
            this.showAMenu(this._vehicleSelect);
        }, this);
        group.addChild(characterButton);

        /* Creating the hex menu button */
        let hexButton: TextButton = new TextButton(this.game, 200, 70, '', 40, 'UserInterface_Menu_HexButton', () => {
            this.showAMenu(this._hexViewer);
        }, this);
        group.addChild(hexButton);

        /* Returning this new group */
        return group;
    }

    /* Resize all the menus */
    public resize(): void
    {
        /* Calculating the smallest screen dimension */
        let vmin: number = Math.min(this.game.height, this.game.width);

        /* Resize the background image */
        this._backgroundSprite.width = this.game.width;
        this._backgroundSprite.height = this.game.height;

        /* Resizing the main buttons group */
        this._mainButtonsGroup.position.set(this.game.width / 2, this.game.height / 2);
        this._mainButtonsGroup.scale.set(vmin / GAME_WIDTH);

        /* Creating the settings group */
        this._settingGroup.position.set(this.game.width / 2, this.game.height * .5);
        this._settingGroup.scale.set(vmin / GAME_WIDTH);

        /* Resizing the level select menu */
        this._levelSelect.position.set(this.game.width / 2, this.game.height * 0.1);
        this._levelSelect.scale.set(vmin / GAME_WIDTH);

        /* Resizing the logo sprite */
        this._logoSprite.position.set(this.game.width / 2, this.game.height * 0.25);
        this._logoSprite.scale.set(vmin / GAME_WIDTH);

        /* Resizing the word emitter */
        this._worldEmitter.position.set(this.game.width / 2, this.game.height);
        this._worldEmitter.width = this.game.width;

        /* Offsetting the height of a bit */
        vmin = Math.min(this.game.height * .6, this.game.width);

        /* Resizing the vehicle select */
        this._vehicleSelect.position.set(this.game.width / 2, this.game.height / 2);
        this._vehicleSelect.scale.set(vmin / GAME_WIDTH);

        /* Offsetting the hex viewer */
        this._hexViewer.position.set(this.game.width / 2, this.game.height / 2);
        this._hexViewer.scale.set(vmin / GAME_WIDTH);

        /* Offsetting the credits screen */
        this._creditsScreen.position.set(this.game.width / 2, this.game.height / 2);
        this._creditsScreen.scale.set(vmin / GAME_WIDTH);
    }

    /* Show any menu whilse hiding the others */
    public showAMenu(object: Phaser.Group): void
    {
        /* Hide all the other menus */
        this._settingGroup.visible = false;
        this._mainButtonsGroup.visible = false;
        this._logoSprite.visible = false;
        this._levelSelect.visible = false;
        this._creditsScreen.visible = false;
        this._hexViewer.visible = false;
        this._vehicleSelect.visible = false;

        /* Show the specific menu */
        object.visible = true;

        /* Show the logo if it is the main menu */
        if (object === this._mainButtonsGroup)
        {
            this._logoSprite.visible = true;
        }
    }

    /** Show the main menu */
    public showMainMenu(): void {
        this.showAMenu(this._mainButtonsGroup);
    }

    /** Show the level select */
    public showLevelSelect(): void {
        this.showAMenu(this._levelSelect);
    }

    /** Create the emitter in the main menu */
    public createWorldEmitter(): Phaser.Particles.Arcade.Emitter
    {
        /* Creating the emitter */
        let emitter: Phaser.Particles.Arcade.Emitter = new Phaser.Particles.Arcade.Emitter(this.game, 0, 0, 50);

        /* Setting its default values */
        emitter.makeParticles(Atlases.Interface, 'test_particle');
        emitter.setXSpeed(-10, 10);
        emitter.setYSpeed(0, -100);
        emitter.setRotation(0, 0);
        emitter.setAlpha(-1, 1, 2000);
        emitter.setScale(0, .5, 0, .5, 4000);

        emitter.gravity.y = -30;
        emitter.width = 740;

        /* Starting it */
        emitter.start(false, 10000, 400);

        /* And returning it */
        return emitter;
    }

    /* Shut down this state and destroy everything in it */
    public shutdown(): void
    {
        super.shutdown(this.game);

        /* Destroy the main button group */
        if (this._mainButtonsGroup) { this._mainButtonsGroup.destroy(true); }
        this._mainButtonsGroup = null;

        /* Destroying logo */
        if (this._logoSprite) { this._logoSprite.destroy(true); }
        this._logoSprite = null;

        /* Destroy the background sprite */
        if (this._backgroundSprite) { this._backgroundSprite.destroy(true); }
        this._backgroundSprite = null;

        /* Destroy the credits screen */
        if (this._creditsScreen) { this._creditsScreen.destroy(); }
        this._creditsScreen = null;

        /* Destroy the level select */
        if (this._levelSelect) { this._levelSelect.destroy(); }
        this._levelSelect = null;

        /* Destroy the settings group */
        if (this._settingGroup) { this._settingGroup.destroy(); }
        this._settingGroup = null;

        /* Destroy the vehicle select */
        if (this._vehicleSelect) { this._vehicleSelect.destroy(); }
        this._vehicleSelect = null;

        /* Destroy the hex viewer */
        if (this._hexViewer) { this._hexViewer.destroy(); }
        this._hexViewer = null;

        /* Destoy the world emitter */
        if (this._worldEmitter) { this._worldEmitter.destroy(); }
        this._worldEmitter = null;

        /* Stop the music */
        SoundManager.getInstance().stop(Sounds.UI_MENU_MUSIC);

    }
}
