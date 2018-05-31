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

export default class Menu extends Phaser.State
{
    public static Name: string = 'menu';

    public name: string = Menu.Name;

    private _mainButtonsGroup: Phaser.Group;
    private _logoSprite: Phaser.Sprite;
    private _backgroundSprite: Phaser.Sprite;

    private _settingGroup: SettingPopup;
    private _levelSelect: LevelSelect;
    private _creditsScreen: CreditsScreen;
    private _vehicleSelect: VehicleSelect;

    private _worldEmitter: Phaser.Particles.Arcade.Emitter;

    constructor()
    {
        super();
    }

    public init(): void
    {
        SoundManager.getInstance(this.game);

    }

    public create(): void
    {
        super.create(this.game);

        SoundManager.getInstance().play(Sounds.UI_MENU_MUSIC , 1, true);

        this._backgroundSprite = this.game.add.sprite(0, 0, Atlases.Interface, 'bg');

        this._worldEmitter = this.createWorldEmitter();
        this.add.existing(this._worldEmitter);

        this._logoSprite = this.game.add.sprite(0, 0, Atlases.Interface, AtlasImages.Logo);
        this._logoSprite.anchor.set(.5);

        this._mainButtonsGroup = this.createMainButtons();
        this.add.existing(this._mainButtonsGroup);

        this._settingGroup = new SettingPopup(this.game);
        this.game.add.existing(this._settingGroup);
        this._settingGroup.onBack.add(this.DisplayMenu.bind(this));

        this._levelSelect = new LevelSelect(this.game);
        this.game.add.existing(this._levelSelect);
        this._levelSelect.onBack.add(this.DisplayMenu.bind(this));

        this._creditsScreen = new CreditsScreen(this.game, () => {
            this.DisplayObject(this._mainButtonsGroup);
        });
        this.game.add.existing(this._creditsScreen);

        this._vehicleSelect = new VehicleSelect(this.game, () => {
            this.DisplayObject(this._mainButtonsGroup);
        });
        this.game.add.existing(this._vehicleSelect);

        this.DisplayObject(this._mainButtonsGroup);

        this.resize();
    }

    public createMainButtons(): Phaser.Group {

        let group: Phaser.Group = new Phaser.Group(this.game);

        let playButton: TextButton = new TextButton(this.game, 0, 0, '', 40, 'UserInterface_Menu_PlayButton', this.DisplayLevelSelect, this);
        group.addChild(playButton);

        let testButton: TextButton = new TextButton(this.game, 0, 300, 'particle editor', 40, AtlasImages.Menu_Button, () => {
            this.state.start(Test.Name);
        }, this);
        testButton.scale.set(.5);
        group.addChild(testButton);

        let settingButton: TextButton = new TextButton(this.game, -135, 180, '', 40, 'UserInterface_Menu_Options', () => {
            this.DisplaySetting();
        }, this);
        group.addChild(settingButton);

        let creditsButton: TextButton = new TextButton(this.game, 135, 180, '', 40, 'UserInterface_Menu_Credits', () => {
            this.DisplayObject(this._creditsScreen);
        }, this);
        group.addChild(creditsButton);

        let characterButton: TextButton = new TextButton(this.game, -200, 70, '', 40, 'UserInterface_Menu_CharacterSelect', () => {
            this.DisplayObject(this._vehicleSelect);
        }, this);
        group.addChild(characterButton);

        let hexButton: TextButton = new TextButton(this.game, 200, 70, '', 40, 'UserInterface_Menu_HexButton', () => {
            console.log('show hex');
        }, this);
        group.addChild(hexButton);

        return group;
    }

    public resize(): void
    {
        this._backgroundSprite.width = this.game.width;
        this._backgroundSprite.height = this.game.height;

        let vmin: number = Math.min(this.game.height, this.game.width);

        this._mainButtonsGroup.position.set(this.game.width / 2, this.game.height / 2);
        this._mainButtonsGroup.scale.set(vmin / GAME_WIDTH);

        this._settingGroup.position.set(this.game.width / 2, this.game.height * .5);
        this._settingGroup.scale.set(vmin / GAME_WIDTH);

        this._levelSelect.position.set(this.game.width / 2, this.game.height * 0.1);
        this._levelSelect.scale.set(vmin / GAME_WIDTH);

        this._logoSprite.position.set(this.game.width / 2, this.game.height * 0.25);
        this._logoSprite.scale.set(vmin / GAME_WIDTH);

        this._worldEmitter.position.set(this.game.width / 2, this.game.height);
        this._worldEmitter.width = this.game.width;

        vmin = Math.min(this.game.height * .6, this.game.width);

        this._vehicleSelect.position.set(this.game.width / 2, this.game.height / 2);
        this._vehicleSelect.scale.set(vmin / GAME_WIDTH);

        this._creditsScreen.position.set(this.game.width / 2, this.game.height / 2);
        this._creditsScreen.scale.set(vmin / GAME_WIDTH);
    }

    public DisplayObject(object: Phaser.Group): void {
        this._settingGroup.visible = false;
        this._mainButtonsGroup.visible = false;
        this._logoSprite.visible = false;
        this._levelSelect.visible = false;
        this._creditsScreen.visible = false;
        this._vehicleSelect.visible = false;

        object.visible = true;
        if (object === this._mainButtonsGroup) {
            this._logoSprite.visible = true;
        }
    }
    public DisplaySetting(): void {
        this.DisplayObject(this._settingGroup);
    }

    public DisplayMenu(): void {
        this.DisplayObject(this._mainButtonsGroup);
    }

    public DisplayLevelSelect(): void {
        this.DisplayObject(this._levelSelect);
    }

    public createWorldEmitter(): Phaser.Particles.Arcade.Emitter {
        let emitter: Phaser.Particles.Arcade.Emitter = new Phaser.Particles.Arcade.Emitter(this.game, 0, 0, 50);
        emitter.makeParticles(Atlases.Interface, 'test_particle');
        emitter.setXSpeed(-10, 10);
        emitter.setYSpeed(0, -100);
        emitter.setRotation(0, 0);
        emitter.setAlpha(-1, 1, 2000);
        emitter.setScale(0, .5, 0, .5, 4000);
        emitter.gravity.y = -30;
        emitter.width = 740;
        emitter.start(false, 10000, 400);
        return emitter;
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        this._mainButtonsGroup.destroy(true);

        this._backgroundSprite.destroy(true);

        this._levelSelect.destroy();
        this._levelSelect = null;

        this._settingGroup.destroy();
        this._settingGroup = null;

        this._vehicleSelect.destroy();
        this._vehicleSelect = null;

        this._worldEmitter.destroy();
        this._worldEmitter = null;
        SoundManager.getInstance().stop(Sounds.UI_MENU_MUSIC);

    }
}
