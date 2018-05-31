import Constants from '../Data/Constants';
import { IHexBodyPartsCollection, defaultHexPartsData } from '../GameObjects/Interactable/Paralax/UI/HexPartsMenu/HexPartsData';

interface ISaveData
{
    /** Highscore */
    hs: number;
    /** Sound effects mute */
    sm: boolean;
    sfx_vol: number; //sfx volume
    mm: boolean; //music
    q: number; //quality
    lvls: ILevelData[]; //array of leveldata

    /** Hex's collection data */
    hcd: IHexBodyPartsCollection;
}
interface ILevelData
{
    un: boolean; //unlocked
    hs: number; //highscore
}

export default class SaveData
{
    private static _StorageKey: string = 'traveling';

    public static Init(): void
    {
        if (this.data !== null)
        {
            return;
        }

        this.data = {
            hs: 0,
            sm: false,
            sfx_vol: 1,
            mm: false,
            q: 1,
            lvls: this.emplyLevelData(),
            hcd: defaultHexPartsData
        };

    }
    public static emplyLevelData(): ILevelData[]
    {
        let levelData: ILevelData[] = [];

        levelData.push({un: true, hs: 0});
        for (let i: number = Constants.LEVELS.length - 1; i--;) {
            levelData.push({un: false, hs: 0});
        }

        return levelData;
    }

    /** Set if the sfx are muted in cache */
    public static set SFXMuted(value: boolean)
    {
        let newData: ISaveData = this.data;
        newData.sm = value;

        this.data = newData;
    }
    public static get SFXMuted(): boolean
    {
        return this.data.sm;
    }

    /** Set if the sfx are muted in cache */
    public static set SFX_VOLUME(value: number)
    {
        let newData: ISaveData = this.data;
        newData.sfx_vol = value;
        this.data = newData;

        //check if sfx should be muted if volume is 0
        SaveData.SFXMuted = (value === 0 ? true : false);
    }
    public static get SFX_VOLUME(): number
    {
        return this.data.sfx_vol;
    }

    /** Save if the sound is muted in cache */
    public static set MusicMuted(value: boolean)
    {
        let newData: ISaveData = this.data;
        newData.mm = value;

        this.data = newData;
    }
    public static get MusicMuted(): boolean
    {
        return this.data.mm;
    }

    /** Save the quality in cache */
    public static set Quality(value: number)
    {
        let newData: ISaveData = this.data;
        newData.q = value;

        this.data = newData;
    }
    public static get Quality(): number
    {
        return this.data.q;
    }

    /** Save the quality in cache */
    public static set Levels(value: ILevelData[])
    {
        let newData: ISaveData = this.data;
        newData.lvls = value;

        this.data = newData;
    }
    public static get Levels(): ILevelData[]
    {
        return this.data.lvls;
    }

    public static set Highscore(newHighscore: number)
    {
        let newData: ISaveData = this.data;
        newData.hs = newHighscore;

        this.data = newData;
    }
    public static get Highscore(): number
    {
        return this.data.hs;
    }

    public static set HexCollectiblesData(data: IHexBodyPartsCollection)
    {
        let newData: ISaveData = this.data;
        newData.hcd = data;

        this.data = newData;
    }
    public static get HexCollectiblesData(): IHexBodyPartsCollection
    {
        return this.data.hcd;
    }

    /** Set or get the cached data */
    private static set data(data: ISaveData)
    {
        localStorage.setItem(SaveData._StorageKey, JSON.stringify(data));
    }
    private static get data(): ISaveData
    {
        return JSON.parse(localStorage.getItem(SaveData._StorageKey));
    }

}
