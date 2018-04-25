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

    private mainButtonsGroup: Phaser.Group;
    private logo: Phaser.Sprite;
    private background: Phaser.Sprite;

    private settingGroup: SettingPopup;
    private levelSelect: LevelSelect;

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

        this.background = this.game.add.sprite(0, 0, Atlases.Interface, AtlasImages.Background);
        this.logo = this.game.add.sprite(0, 0, Atlases.Interface, AtlasImages.Logo);
        this.logo.anchor.set(.5);

        this.mainButtonsGroup = this.createMainButtons();
        this.add.existing(this.mainButtonsGroup);

        this.settingGroup = new SettingPopup(this.game);
        this.game.add.existing(this.settingGroup);
        this.settingGroup.onBack.add(this.DisplayMenu.bind(this));
        this.settingGroup.onPlay.add(this.DisplayLevelSelect.bind(this));

        this.levelSelect = new LevelSelect(this.game);
        this.game.add.existing(this.levelSelect);
        this.levelSelect.onBack.add(this.DisplayMenu.bind(this));

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
        this.background.width = this.game.width;
        this.background.height = this.game.height;

        let vmin: number = Math.min(this.game.height, this.game.width);

        this.mainButtonsGroup.position.set(this.game.width / 2, this.game.height / 2);
        this.mainButtonsGroup.scale.set(vmin / GAME_WIDTH);

        this.settingGroup.position.set(this.game.width / 2, this.game.height * .6);
        this.settingGroup.scale.set(vmin / GAME_WIDTH);

        this.levelSelect.position.set(this.game.width / 2, this.game.height * 0.1);
        this.levelSelect.scale.set(vmin / GAME_WIDTH);

        this.logo.position.set(this.game.width / 2, this.game.height * 0.25);
        this.logo.scale.set(vmin / GAME_WIDTH);

        console.log(vmin);

    }

    public DisplaySetting(): void {
        this.settingGroup.visible = true;
        this.mainButtonsGroup.visible = false;
        this.logo.visible = true;
        this.levelSelect.visible = false;
    }

    public DisplayMenu(): void {
        this.settingGroup.visible = false;
        this.mainButtonsGroup.visible = true;
        this.logo.visible = true;
        this.levelSelect.visible = false;
    }

    public DisplayLevelSelect(): void {
        this.settingGroup.visible = false;
        this.mainButtonsGroup.visible = false;
        this.logo.visible = false;
        this.levelSelect.visible = true;
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        this.mainButtonsGroup.destroy(true);

        this.background.destroy(true);

        this.levelSelect.destroy();
        this.levelSelect = null;

        this.settingGroup.destroy();
        this.settingGroup = null;
    }

}
