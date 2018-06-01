import 'phaser-ce';
import PartsWindow from './Windows/HexPartViewerPartsWindow';
import HexWindow from './Windows/HexPartViewerHexWindow';
import { HexBodyParts } from './HexPartsData';
import SaveData from '../../../../../BackEnd/SaveData';
import Atlases from '../../../../../Data/Atlases';

export default class Viewer extends Phaser.Sprite
{
    private _hexWindow: HexWindow;
    private _partsWindow: PartsWindow;

    public onBack: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game, 0, 0, Atlases.Interface, '');

        this.onBack = new Phaser.Signal();

        this._hexWindow = new HexWindow(this.game);
        this._hexWindow.anchor.set(.5);
        this.addChild(this._hexWindow);
        this._hexWindow.onWindowClose.add( () => this.onBack.dispatch() );

        this._hexWindow.onPartClick.add( this.openPartsWindow.bind(this) );

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

        this._hexWindow.animateScale(0, 300).addOnce( () => {
            this._partsWindow.animateScale(1, 300);
        });

    }

    private closePartsWindow(): void
    {
        this._partsWindow.animateScale(0, 300).addOnce( () => {
            this._partsWindow.visible = false;
            this._hexWindow.animateScale(1, 300);
        });

    }

    public resize(): void
    {
        this._hexWindow.y = -this.game.height * .1;
        this._hexWindow.resize();

        this._partsWindow.y = -this.game.height * .1;
        this._partsWindow.resize();
    }

}
