import 'phaser-ce';
import Atlases from '../../../../../Data/Atlases';
import LevelButton from './LevelButton';
import Constants from '../../../../../Data/Constants';
import ImageButton from '../ImageButton';
import SaveData from '../../../../../BackEnd/SaveData';
import Gameplay from '../../../../../States/Gameplay';
import AtlasImages from '../../../../../Data/AtlasImages';

export default class LevelSelect extends Phaser.Group
{
    public buttons: LevelButton[];
    private levelText: Phaser.Sprite;
    private _backButton: ImageButton;
    public onBack: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.visible = false;

        this.onBack = new Phaser.Signal();

        this.levelText = new Phaser.Sprite(game, 0, 0, Atlases.INTERFACE, 'level select');
        this.levelText.anchor.set(.5);
        this.addChild(this.levelText);

        let _titleText: Phaser.BitmapText = new Phaser.BitmapText(game, 0, 0, 'futura', 'select level', 40);
        _titleText.anchor.set(.5);
        this.addChild(_titleText);

        this._backButton = new ImageButton(this.game, -250, 0, AtlasImages.CLOSE_X_BUTTON, AtlasImages.CLOSE_X_BUTTON, () => {
            this.onBack.dispatch();
        }, this);
        this._backButton.anchor.set(.5);
        this.addChild(this._backButton);

        this.buttons = [];

        for (let i: number = 0; i < Constants.LEVELS.length; i++) {

            let button: LevelButton = new LevelButton(game, 0, 200 + i * 300, Constants.LEVELS[i], SaveData.LEVELS[i].hs, true, () => {
                if (SaveData.LEVELS[i].un || true) {
                    Constants.CURRENT_LEVEL = i;
                    this.game.state.start(Gameplay.Name);
                }
            }, this);
            this.addChild(button);
            this.buttons.push(button);
        }
    }
}
