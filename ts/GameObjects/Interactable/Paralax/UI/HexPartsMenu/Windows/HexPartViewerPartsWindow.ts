import Window from './HexPartsViewerWindow';
import {IHexBodyPart, IHexPart} from '../HexPartsData';
import Atlases from '../../../../../../Data/Atlases';

export default class PartsWindow extends Window
{
    private _centerImage: Phaser.Sprite;

    private _subPickup1: Phaser.Sprite;
    private _subPickup2: Phaser.Sprite;
    private _subPickup3: Phaser.Sprite;

    constructor(game: Phaser.Game)
    {
        super(game, 'a part', 'Hex_Collecting_UI_Parts');

        this._centerImage = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
        this._centerImage.anchor.set(.5);
        this._centerImage.scale.set(.7);
        this.addChild(this._centerImage);

        this._subPickup1 = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
        this._subPickup1.anchor.set(.5);
        this.addChild(this._subPickup1);

        this._subPickup2 = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
        this._subPickup2.anchor.set(.5);
        this.addChild(this._subPickup2);

        this._subPickup3 = new Phaser.Sprite(game, 0, 0, Atlases.Interface, '');
        this._subPickup3.anchor.set(.5);
        this.addChild(this._subPickup3);

        this.visible = false;
    }

    public showPart(data: IHexBodyPart): void
    {
        this.contentName.text = data.name;
        this._centerImage.frameName = data.frameName;

        this._subPickup1.visible = false;
        this._subPickup2.visible = false;
        this._subPickup3.visible = false;

        Object.keys(data.subParts).forEach( (key: any, index: number) => {

            let currentPart: IHexPart = data.subParts[key];
            let newFrameName: string = currentPart.frameName + (currentPart.collected ? '' :  '_silhouette');

            switch (index)
            {
                case 0:
                    this._subPickup1.frameName = newFrameName;
                    this._subPickup1.visible = true;
                    break;

                case 1:
                    this._subPickup2.frameName = newFrameName;
                    this._subPickup2.visible = true;
                    break;

                case 2:
                    this._subPickup3.frameName = newFrameName;
                    this._subPickup3.visible = true;
                    break;

                default:
                    break;
            }

        });

        this.visible = true;

    }

    public resize(): void
    {
        super.resize();

        this._subPickup1.x = this.width * -.3;
        this._subPickup1.y = this.height * .4;

        this._subPickup2.y = this.height * .4;

        this._subPickup3.x = this.width * .3;
        this._subPickup3.y = this.height * .4;

    }
}
