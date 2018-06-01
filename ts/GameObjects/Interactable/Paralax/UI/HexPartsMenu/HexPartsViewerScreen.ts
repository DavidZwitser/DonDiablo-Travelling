import 'phaser-ce';
import PartsWindow from './Windows/HexPartViewerPartsWindow';
import HexWindow from './Windows/HexPartViewerHexWindow';
import { HexBodyParts } from './HexPartsData';
import SaveData from '../../../../../BackEnd/SaveData';
import Atlases from '../../../../../Data/Atlases';

export default class Viewer extends Phaser.Sprite
{
    public hexWindow: HexWindow;
    private _partsWindow: PartsWindow;

    public onBack: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game, 0, 0, Atlases.Interface, '');

        this.onBack = new Phaser.Signal();

        this.hexWindow = new HexWindow(this.game);
        this.hexWindow.anchor.set(.5);
        this.addChild(this.hexWindow);
        this.hexWindow.onWindowClose.add( () => this.onBack.dispatch() );

        this.hexWindow.onPartClick.add( this.openPartsWindow.bind(this) );

        this._partsWindow = new PartsWindow(this.game);
        this._partsWindow.anchor.set(.5);
        this.addChild(this._partsWindow);
        this._partsWindow.onWindowClose.add( this.closePartsWindow.bind(this) );

        this._partsWindow.visible = false;

        this.visible = false;

        this.resize();
    }

    private openPartsWindow(part: HexBodyParts): void
    {
        this._partsWindow.showPart(SaveData.HexCollectiblesData[part]);

        this._partsWindow.x = this.game.width + this._partsWindow.width;
        this.game.add.tween(this._partsWindow.position)
            .to({x: 0}, 600, Phaser.Easing.Cubic.InOut)
            .start()
            .onComplete.addOnce( () => {
                this.hexWindow.visible = false;
            });

        this.game.add.tween(this.hexWindow.position)
            .to({x: -this.game.width}, 600, Phaser.Easing.Cubic.InOut)
            .start();
    }

    private closePartsWindow(): void
    {
        this.hexWindow.visible = true;

        this.game.add.tween(this._partsWindow.position)
            .to({x: this.game.width}, 600, Phaser.Easing.Cubic.Out)
            .start();

        this.game.add.tween(this.hexWindow.position)
            .to({x: 0}, 600, Phaser.Easing.Cubic.Out)
            .start();
    }

    public resize(): void
    {
        this.hexWindow.y = -this.game.height * .1;
        this.hexWindow.resize();

        this._partsWindow.y = -this.game.height * .1;
        this._partsWindow.resize();
    }

}
