import 'phaser-ce';

import Atlases from '../../../../../../../Data/Atlases';
import { IHexBodyPartsCollection, HexBodyParts, IHexPartsCollection } from '../../HexPartsData';
import SaveData from '../../../../../../../BackEnd/SaveData';

export default class HexPiecedTogether extends Phaser.Group
{
    public head: Phaser.Sprite;

    public neck: Phaser.Sprite;

    public torso: Phaser.Sprite;

    public rightArm: Phaser.Sprite;
    public leftArm: Phaser.Sprite;

    public booster: Phaser.Sprite;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.neck = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Neck_silhouette');
        this.neck.anchor.set(.5, 0);
        this.addChild(this.neck);

        this.torso = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Torso_silhouette');
        this.torso.anchor.set(.5, 0);
        this.addChild(this.torso);

        this.head = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Head_silhouette');
        this.head.anchor.set(.5, 0);
        this.addChild(this.head);

        this.leftArm = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Left_arm_silhouette');
        this.leftArm.anchor.set(1, 0);
        this.addChild(this.leftArm);

        this.rightArm = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Right_arm_silhouette');
        this.rightArm.anchor.set(0, 0);
        this.addChild(this.rightArm);

        this.booster = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Booster_silhouette');
        this.booster.anchor.set(.5, .5);
        this.addChild(this.booster);

        this.recheckCollectedParts();
    }

    public recheckCollectedParts(): void
    {
        let data: IHexBodyPartsCollection = SaveData.HexCollectiblesData;

        if (this.hasACollectedSubPart(data[HexBodyParts.head].subParts) === true)
        {
            this.head.frameName = 'Head';
        }

        if (this.hasACollectedSubPart(data[HexBodyParts.torso].subParts) === true)
        {
            this.torso.frameName = 'Torso';
        }

        if (this.hasACollectedSubPart(data[HexBodyParts.leftArm].subParts) === true)
        {
            this.leftArm.frameName = 'Left_arm';
        }

        if (this.hasACollectedSubPart(data[HexBodyParts.rightArm].subParts) === true)
        {
            this.rightArm.frameName = 'Right_arm';
        }

        if (this.hasACollectedSubPart(data[HexBodyParts.booster].subParts) === true)
        {
            this.booster.frameName = 'Booster';
        }
    }

    private hasACollectedSubPart(parts: IHexPartsCollection): boolean
    {
        let hasACollectedPart: boolean = false;

        Object.keys(parts).forEach((key: any) => {
            if (parts[key].collected) { hasACollectedPart = true; }
        });

        return hasACollectedPart;
    }

    public resize(): void
    {
        this.head.x = 0;
        this.head.y = -220;

        this.neck.x = 0;
        this.neck.y = -70;

        this.torso.x = 0;
        this.torso.y = -40;

        this.leftArm.x = -65;
        this.leftArm.y = -58;

        this.rightArm.x = 68;
        this.rightArm.y = -58;

        this.booster.x = 0;
        this.booster.y = 190;

    }

    public destroy(): void
    {
        //TODO: you know what to do here
    }

}
