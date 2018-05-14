import 'phaser-ce';

import Test from './Test';
import TextButton from '../GameObjects/Interactable/Paralax/UI/TextButton';
import SettingPopup from '../GameObjects/Interactable/Paralax/UI/SettingPopup';
import LevelSelect from '../GameObjects/Interactable/Paralax/UI/LevelSelect/LevelSelect';
import Atlases from '../Data/Atlases';
import AtlasImages from '../Data/AtlasImages';

export default class Menu extends Phaser.State
{
    public static Name: string = 'menu';

    public name: string = Menu.Name;

    private _mainButtonsGroup: Phaser.Group;
    private _logoSprite: Phaser.Sprite;
    private _backgroundSprite: Phaser.Sprite;

    private _settingGroup: SettingPopup;
    private _levelSelect: LevelSelect;

    constructor()
    {
        super();
    }

    public init(): void
    {
        //
    }

    public create(): void
    {
        super.create(this.game);

        this._backgroundSprite = this.game.add.sprite(0, 0, Atlases.Interface, AtlasImages.Background);
        this._logoSprite = this.game.add.sprite(0, 0, Atlases.Interface, AtlasImages.Logo);
        this._logoSprite.anchor.set(.5);

        this._mainButtonsGroup = this.createMainButtons();
        this.add.existing(this._mainButtonsGroup);

        this._settingGroup = new SettingPopup(this.game);
        this.game.add.existing(this._settingGroup);
        this._settingGroup.onBack.add(this.DisplayMenu.bind(this));
        this._settingGroup.onPlay.add(this.DisplayLevelSelect.bind(this));

        this._levelSelect = new LevelSelect(this.game);
        this.game.add.existing(this._levelSelect);
        this._levelSelect.onBack.add(this.DisplayMenu.bind(this));

        this.resize();
    }

    public createMainButtons(): Phaser.Group {

        let group: Phaser.Group = new Phaser.Group(this.game);
        let backdropSprite: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 100, Atlases.Interface, 'background_overlay');
        backdropSprite.anchor.set(.5);
        group.addChild(backdropSprite);

        let playButton: TextButton = new TextButton(this.game, 0, 0, 'Play', 40, AtlasImages.Menu_Button, this.DisplayLevelSelect, this);
        group.addChild(playButton);

        let testButton: TextButton = new TextButton(this.game, 0, 300, 'particle editor', 40, AtlasImages.Menu_Button, () => {
            this.state.start(Test.Name);
        }, this);
        testButton.scale.set(.5);
        group.addChild(testButton);

        let settingButton: TextButton = new TextButton(this.game, 0, 150, 'settings', 40, AtlasImages.Menu_Button, () => {
            this.DisplaySetting();
        }, this);
        group.addChild(settingButton);

        return group;
    }

    public resize(): void
    {
        this._backgroundSprite.width = this.game.width;
        this._backgroundSprite.height = this.game.height;

        let vmin: number = Math.min(this.game.height, this.game.width);

        this._mainButtonsGroup.position.set(this.game.width / 2, this.game.height / 2);
        this._mainButtonsGroup.scale.set(vmin / GAME_WIDTH);

        this._settingGroup.position.set(this.game.width / 2, this.game.height * .6);
        this._settingGroup.scale.set(vmin / GAME_WIDTH);

        this._levelSelect.position.set(this.game.width / 2, this.game.height * 0.1);
        this._levelSelect.scale.set(vmin / GAME_WIDTH);

        this._logoSprite.position.set(this.game.width / 2, this.game.height * 0.25);
        this._logoSprite.scale.set(vmin / GAME_WIDTH);

        console.log(vmin);
    }

    public DisplaySetting(): void {
        this._settingGroup.visible = true;
        this._mainButtonsGroup.visible = false;
        this._logoSprite.visible = true;
        this._levelSelect.visible = false;
    }

    public DisplayMenu(): void {
        this._settingGroup.visible = false;
        this._mainButtonsGroup.visible = true;
        this._logoSprite.visible = true;
        this._levelSelect.visible = false;
    }

    public DisplayLevelSelect(): void {
        this._settingGroup.visible = false;
        this._mainButtonsGroup.visible = false;
        this._logoSprite.visible = false;
        this._levelSelect.visible = true;
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
    }
}
