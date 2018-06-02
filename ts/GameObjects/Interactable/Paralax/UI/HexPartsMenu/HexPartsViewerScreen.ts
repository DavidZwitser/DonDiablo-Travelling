import 'phaser-ce';
import PartsWindow from './Windows/HexPartViewerPartsWindow';
import HexWindow from './Windows/HexPartViewerHexWindow';
import { HexBodyParts } from './HexPartsData';
import SaveData from '../../../../../BackEnd/SaveData';

/** The group handling: showing the hex menus and transitioning between them */
export default class Viewer extends Phaser.Group
{
    /** The window showing hex */
    private _hexWindow: HexWindow;
    /** The window showing a specific hex part with its sub parts */
    private _partsWindow: PartsWindow;

    /** When the window exit button is clicked */
    public onBack: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.onBack = new Phaser.Signal();

        /** Hex winow */
        this._hexWindow = new HexWindow(this.game);
        this._hexWindow.anchor.set(.5);
        this.addChild(this._hexWindow);
        this._hexWindow.onWindowClose.add( () => this.onBack.dispatch() );

        this._hexWindow.onPartClick.add( this.animateToPartsWindow.bind(this) );

        /** Parts window */
        this._partsWindow = new PartsWindow(this.game);
        this._partsWindow.anchor.set(.5);
        this.addChild(this._partsWindow);
        this._partsWindow.onWindowClose.add( this.animateToHexWindow.bind(this) );

        this._partsWindow.visible = false;

        /** Rest */
        this.visible = false;

        this.resize();
    }

    /** Open a parts window with a specific part */
    private animateToPartsWindow(part: HexBodyParts): void
    {
        /* Load the part in the window */
        this._partsWindow.loadPart(SaveData.HexCollectiblesData[part]);

        /* Animate from the hex window to the part window */
        this._hexWindow.animateWindow(0, 300).onComplete.addOnce( () => {
            this._partsWindow.animateWindow(1, 300);
        });

    }

    /** Open the window showing hex */
    private animateToHexWindow(): void
    {
        /* Animate from the part window back to the hex window */
        this._partsWindow.animateWindow(0, 300).onComplete.addOnce( () => {
            this._partsWindow.visible = false;
            this._hexWindow.animateWindow(1, 300);
        });

    }

    /** Resize all the windows */
    public resize(): void
    {
        this._hexWindow.y = this.game.height * -.1;
        this._hexWindow.resize();

        this._partsWindow.y = this.game.height * -.1;
        this._partsWindow.resize();
    }

    /** Destroy everything in the group */
    public destroy(): void
    {
        super.destroy(true);

        /* Hex window */
        if (this._hexWindow) { this._hexWindow.destroy(); }
        this._hexWindow = null;

        /* Parts window */
        if (this._partsWindow) { this._partsWindow.destroy(); }
        this._partsWindow = null;

        /* Rest */
        this.onBack.removeAll();
        this.onBack =  null;
    }

}
