import 'phaser-ce';

import Test from './Test';
import TextButton from '../GameObjects/Interactable/Paralax/UI/TextButton';
import Gameplay from './Gameplay';
import SettingPopup from '../GameObjects/Interactable/Paralax/UI/SettingPopup';
import SoundManager from '../BackEnd/SoundManager';
import Sounds from '../Data/Sounds';

export default class Menu extends Phaser.State
{
    public static Name: string = 'menu';

    public name: string = Menu.Name;

    private mainButtonsGroup: Phaser.Group;
    private settingGroup: Phaser.Group;
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

        this.mainButtonsGroup = this.createMainButtons();
        this.add.existing(this.mainButtonsGroup);

        this.settingGroup = new SettingPopup(this.game, this);
        this.game.add.existing(this.settingGroup);

        SoundManager.getInstance().playMusic(Sounds.testMusic);
        this.resize();
    }
    public createMainButtons(): Phaser.Group {

        let group: Phaser.Group = new Phaser.Group(this.game);
        let playButton: TextButton = new TextButton(this.game, 0, 0, 'Play', {font: '50px',
        fill: '#fff',
        align: 'center' }, () => {
            this.state.start(Gameplay.Name);
        }, this, 300, 100, 0x000000);

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
            this.DisplaySetting(true);
        }, this, 300, 100, 0x000000);
        group.addChild(settingButton);

        return group;
    }

    public resize(): void
    {
        let vmin: number = Math.min(this.game.height, this.game.width);

        this.mainButtonsGroup.position.set(this.game.width / 2, this.game.height / 2);
        this.mainButtonsGroup.scale.set(vmin / GAME_HEIGHT);

        this.settingGroup.position.set(this.game.width / 2, this.game.height / 2);
        this.settingGroup.scale.set(vmin / GAME_HEIGHT);

        console.log(vmin);

    }

    public DisplaySetting(visible: boolean): void {
        this.settingGroup.visible = visible;
        this.mainButtonsGroup.visible = !visible;
    }

    public shutdown(): void
    {
        super.shutdown(this.game);
        this.mainButtonsGroup.destroy(true);
    }

}
