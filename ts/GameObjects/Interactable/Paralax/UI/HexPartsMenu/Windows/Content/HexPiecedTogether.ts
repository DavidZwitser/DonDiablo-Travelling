import 'phaser-ce';

import Atlases from '../../../../../../../Data/Atlases';
import { IHexBodyPartsCollection, HexBodyParts, IHexPartsCollection } from '../../HexPartsData';
import SaveData from '../../../../../../../BackEnd/SaveData';

/** The class where hex pis pieced together to form its full image */
export default class HexPiecedTogether extends Phaser.Group
{
    /** Its head */
    public head: Phaser.Sprite;

    /** Its neck */
    public neck: Phaser.Sprite;

    /** Its torso */
    public torso: Phaser.Sprite;

    /** Its right arm */
    public rightArm: Phaser.Sprite;
    /** Its left arm */
    public leftArm: Phaser.Sprite;

    /**  Its booster */
    public booster: Phaser.Sprite;

    constructor(game: Phaser.Game)
    {
        super(game);

        /** Creating his neck */
        this.neck = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Neck_silhouette');
        this.neck.anchor.set(.5, 0);
        this.addChild(this.neck);

        /** Creating his torso */
        this.torso = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Torso_silhouette');
        this.torso.anchor.set(.5, 0);
        this.addChild(this.torso);

        /** Creating his head */
        this.head = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Head_silhouette');
        this.head.anchor.set(.5, 0);
        this.addChild(this.head);

        /** Creating his left arm */
        this.leftArm = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Left_arm_silhouette');
        this.leftArm.anchor.set(1, 0);
        this.addChild(this.leftArm);

        /** Creating his right arm */
        this.rightArm = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Right_arm_silhouette');
        this.rightArm.anchor.set(0, 0);
        this.addChild(this.rightArm);

        /** Creating his booster */
        this.booster = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'Booster_silhouette');
        this.booster.anchor.set(.5, .5);
        this.addChild(this.booster);

        /** Check through hex's data and see how the part should be displayed */
        this.recheckCollectedParts();
    }

    /** Go through the hex data and recheck if any parts are collected in which case hex should display the sprite which is not the silouette */
    public recheckCollectedParts(): void
    {
        /** Getting the data */
        let data: IHexBodyPartsCollection = SaveData.HexCollectiblesData;

        /* Checking head */
        if (this.hasAllCollectedSubParts(data[HexBodyParts.head].subParts) === true)
        {
            this.head.frameName = 'Head';
        }

        /* Checking torso */
        if (this.hasAllCollectedSubParts(data[HexBodyParts.torso].subParts) === true)
        {
            this.torso.frameName = 'Torso';
        }

        /* Checking left arm */
        if (this.hasAllCollectedSubParts(data[HexBodyParts.leftArm].subParts) === true)
        {
            this.leftArm.frameName = 'Left_arm';
        }

        /* Checking right arm */
        if (this.hasAllCollectedSubParts(data[HexBodyParts.rightArm].subParts) === true)
        {
            this.rightArm.frameName = 'Right_arm';
        }

        /* Checking booster */
        if (this.hasAllCollectedSubParts(data[HexBodyParts.booster].subParts) === true)
        {
            this.booster.frameName = 'Booster';
        }
    }

    /** Returns true if all the sub parts are collected */
    private hasAllCollectedSubParts(parts: IHexPartsCollection): boolean
    {
        let hasAllCollectedSubParts: boolean = true;

        Object.keys(parts).forEach((key: any) => {
            if (parts[key].collected === false) { hasAllCollectedSubParts = false; }
        });

        return hasAllCollectedSubParts;
    }

    /** Resize all the parts into their position */
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

    /** Destroy all the parts */
    public destroy(): void
    {
        //TODO: you know what to do here
        super.destroy(true);

        if (this.head) { this.head.destroy(true); }
        this.head = null;

        if (this.neck) { this.neck.destroy(true); }
        this.neck = null;

        if (this.torso) { this.torso.destroy(true); }
        this.torso = null;

        if (this.leftArm) { this.leftArm.destroy(true); }
        this.leftArm = null;

        if (this.rightArm) { this.rightArm.destroy(true); }
        this.rightArm = null;

        if (this.booster) { this.booster.destroy(true); }
        this.booster = null;
    }

}
