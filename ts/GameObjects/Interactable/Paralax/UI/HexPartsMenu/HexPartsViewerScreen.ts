import 'phaser-ce';
import PartsWindow from './Windows/HexPartViewerPartsWindow';
import HexWindow from './Windows/HexPartViewerHexWindow';
import { defaultHexPartsData, HexBodyParts } from './HexPartsData';

export default class Viewer extends Phaser.Group
{
    private _hexWindow: HexWindow;
    private _partsWindow: PartsWindow;

    public onBack: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game);

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
        this._partsWindow.showPart(defaultHexPartsData[part]);

        this._partsWindow.x = this.game.width + this._partsWindow.width;
        this.game.add.tween(this._partsWindow.position)
            .to({x: this.game.width * .5}, 600, Phaser.Easing.Cubic.InOut)
            .start()
            .onComplete.addOnce( () => {
                this._hexWindow.visible = false;
            });

        this.game.add.tween(this._hexWindow.position)
            .to({x: -this.game.width}, 600, Phaser.Easing.Cubic.InOut)
            .start();
    }

    private closePartsWindow(): void
    {
        this._hexWindow.visible = true;

        this.game.add.tween(this._partsWindow.position)
            .to({x: this.game.width + this._partsWindow.width}, 600, Phaser.Easing.Cubic.Out)
            .start();

        this.game.add.tween(this._hexWindow.position)
            .to({x: this.game.width * .5}, 600, Phaser.Easing.Cubic.Out)
            .start();
    }

    public resize(): void
    {
        this._hexWindow.x = this.game.width * .5;
        this._hexWindow.y = this.game.height * .4;
        this._hexWindow.resize();

        this._partsWindow.x = this.game.width * .5;
        this._partsWindow.y = this.game.height * .4;
        this._partsWindow.resize();
    }

}
