import 'phaser-ce';

//import Atlases from '../../../../../../../Data/Atlases';
import HexPiecedTogether from '../HexPartsMenu/Windows/Content/HexPiecedTogether';
import { IHexBodyPartsCollection, HexBodyParts, IHexPartsCollection } from '../../HexPartsData';

//import SaveData from '../../../../../../../BackEnd/SaveData';

/** The class where you click on Hex to unlock the secret level */
export default class HexPartsSecret extends Phaser.Group
{

    public hasAllPartsCollected: boolean[];

    constructor(game: Phaser.Game)
    {
        super(game);

        /** Check through hex's data and see how the part should be displayed */
        this.recheckCollectedParts();
    }

    /** Go through the hex data and recheck if any parts are collected in which case hex should display the sprite which is not the silouette */
    public recheckCollectedParts(): void
    {
        /** Getting the data */
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

    }

    /** Destroy all the parts */
    public destroy(): void
    {
        //TODO: you know what to do here
        super.destroy(true);

    }

}
