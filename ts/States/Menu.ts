import 'phaser-ce';

import Test from './Test';
import TextButton from '../GameObjects/Interactable/Paralax/UI/TextButton';
import SettingPopup from '../GameObjects/Interactable/Paralax/UI/SettingPopup';
import LevelSelect from '../GameObjects/Interactable/Paralax/UI/LevelSelect/LevelSelect';

export default class Menu extends Phaser.State
{
    public static Name: string = 'menu';

    public name: string = Menu.Name;

    private mainButtonsGroup: Phaser.Group;
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

        this.mainButtonsGroup = this.createMainButtons();
        this.add.existing(this.mainButtonsGroup);

        this.settingGroup = new SettingPopup(this.game);
        this.game.add.existing(this.settingGroup);
        this.settingGroup.onBack.add(this.DisplayMenu.bind(this));

        this.levelSelect = new LevelSelect(this.game);
        this.game.add.existing(this.levelSelect);
        this.levelSelect.onBack.add(this.DisplayMenu.bind(this));

        this.resize();
    }
    public createMainButtons(): Phaser.Group {

        let group: Phaser.Group = new Phaser.Group(this.game);
        let playButton: TextButton = new TextButton(this.game, 0, 0, 'Play', {font: '50px',
        fill: '#fff',
        align: 'center' }, this.DisplayLevelSelect, this, 300, 100, 0x000000);

        group.addChild(playButton);

        let testButton: TextButton = new TextButton(this.game, 0, 300, 'particle editor', {font: '50px',
        fill: '#fff',
        align: 'center' }, () => {
            this.state.start(Test.Name);
        }, this, 300, 100, 0x000000);
        testButton.scale.set(.5);
        group.addChild(testButton);

        let settingButton: TextButton = new TextButton(this.game, 0, 150, 'settings', {font: '50px',
        fill: '#fff',
        align: 'center' }, () => {
            this.DisplaySetting();
        }, this, 300, 100, 0x000000);
        group.addChild(settingButton);

        return group;
    }

    public resize(): void
    {
        let vmin: number = Math.min(this.game.height, this.game.width);

        this.mainButtonsGroup.position.set(this.game.width / 2, this.game.height / 2);
        this.mainButtonsGroup.scale.set(vmin / GAME_WIDTH);

        this.settingGroup.position.set(this.game.width / 2, this.game.height / 2);
        this.settingGroup.scale.set(vmin / GAME_WIDTH);

        this.levelSelect.position.set(this.game.width / 2, this.game.height * 0.1);
        this.levelSelect.scale.set(vmin / GAME_WIDTH);

        console.log(vmin);

    }

    public DisplaySetting(): void {
        this.settingGroup.visible = true;
        this.mainButtonsGroup.visible = false;
        this.levelSelect.visible = false;
    }

    public DisplayMenu(): void {
        this.settingGroup.visible = false;
        this.mainButtonsGroup.visible = true;
        this.levelSelect.visible = false;
    }

    public DisplayLevelSelect(): void {
        this.settingGroup.visible = false;
        this.mainButtonsGroup.visible = false;
        this.levelSelect.visible = true;
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        this.mainButtonsGroup.destroy(true);

        this.settingGroup.destroy();
        this.settingGroup = null;
    }

}
