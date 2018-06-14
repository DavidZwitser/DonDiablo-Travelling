import Constants from '../Data/Constants';
import { IHexBodyPartsCollection, defaultHexPartsData, HexParts, getRandomHexPart } from '../GameObjects/Interactable/Paralax/UI/HexPartsMenu/HexPartsData';

/** Inteface of the local cache data */
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
    /** Hex bar value */
    hbv: number;
    /** Next hex part */
    nhp: HexParts;
    /** SelectedCarIndex */
    scar: number;
}
/** level data */
interface ILevelData
{
    un: boolean; //unlocked
    hs: number; //highscore
}

/** Holds and organizes the save data of the game */
export default class SaveData
{
    private static _STORAGE_KEY: string = 'traveling';

    /** Initial function */
    public static INIT(): void
    {
        if (this._DATA !== null && Object.keys(this._DATA).length === 10)
        {
            return;
        }

        this._DATA = {
            hs: 0,
            sm: false,
            sfx_vol: 1,
            mm: false,
            q: 1,
            lvls: this.EMPTY_LEVEL_DATA(),
            hbv: 0,
            hcd: defaultHexPartsData,
            nhp: getRandomHexPart(),
            scar: 0
        };

    }
    /** Empty level data for the game */
    public static EMPTY_LEVEL_DATA(): ILevelData[]
    {
        let levelData: ILevelData[] = [];

        levelData.push({un: true, hs: 0});
        for (let i: number = Constants.LEVELS.length - 1; i--;) {
            levelData.push({un: false, hs: 0});
        }

        return levelData;
    }

    /** Set if the sfx are muted in cache */
    public static set SFX_MUTED(value: boolean)
    {
        let newData: ISaveData = this._DATA;
        newData.sm = value;

        this._DATA = newData;
    }
    public static get SFX_MUTED(): boolean
    {
        return this._DATA.sm;
    }

    /** Set if the sfx are muted in cache */
    public static set SFX_VOLUME(value: number)
    {
        let newData: ISaveData = this._DATA;
        newData.sfx_vol = value;
        this._DATA = newData;

        //check if sfx should be muted if volume is 0
        SaveData.SFX_MUTED = (value === 0 ? true : false);
    }
    public static get SFX_VOLUME(): number
    {
        return this._DATA.sfx_vol;
    }

    /** Save if the sound is muted in cache */
    public static set MUSIC_MUTED(value: boolean)
    {
        let newData: ISaveData = this._DATA;
        newData.mm = value;

        this._DATA = newData;
    }
    public static get MUSIC_MUTED(): boolean
    {
        return this._DATA.mm;
    }

    /** Save the quality in cache */
    public static set QUALITY(value: number)
    {
        let newData: ISaveData = this._DATA;
        newData.q = value;

        this._DATA = newData;
    }
    public static get QUALITY(): number
    {
        return this._DATA.q;
    }

    /** Save the quality in cache */
    public static set SELECTED_CAR(value: number)
    {
        let newData: ISaveData = this._DATA;
        newData.scar = value;

        this._DATA = newData;
    }
    public static get SELECTED_CAR(): number
    {
        return this._DATA.scar;
    }

    /** Save the quality in cache */
    public static set LEVELS(value: ILevelData[])
    {
        let newData: ISaveData = this._DATA;
        newData.lvls = value;

        this._DATA = newData;
    }
    public static get LEVELS(): ILevelData[]
    {
        return this._DATA.lvls;
    }

    /** Save the highscore in cache */
    public static set HIGHSCORE(newHighscore: number)
    {
        let newData: ISaveData = this._DATA;
        newData.hs = newHighscore;

        this._DATA = newData;
    }
    public static get HIGHSCORE(): number
    {
        return this._DATA.hs;
    }

    /** Save the hex bar value in cache */
    public static set HEX_BAR_VALUE(data: number)
    {
        let newData: ISaveData = this._DATA;
        newData.hbv = data;

        this._DATA = newData;
    }
    public static get HEX_BAR_VALUE(): number
    {
        return this._DATA.hbv;
    }

    /** Save the next pick up in cache */
    public static set NEXT_HEX_PICKUP(data: HexParts)
    {
        let newData: ISaveData = this._DATA;
        newData.nhp = data;

        this._DATA = newData;
    }
    public static get NEXT_HEX_PICKUP(): HexParts
    {
        return this._DATA.nhp;
    }

    /** Save the hex collectibles in cache */
    public static set HEX_COLLECTIBLES_DATA(data: IHexBodyPartsCollection)
    {
        let newData: ISaveData = this._DATA;
        newData.hcd = data;

        this._DATA = newData;
    }
    public static get HEX_COLLECTIBLES_DATA(): IHexBodyPartsCollection
    {
        return this._DATA.hcd;
    }

    /** Set or get the cached data */
    private static set _DATA(data: ISaveData)
    {
        localStorage.setItem(SaveData._STORAGE_KEY, JSON.stringify(data));
    }
    private static get _DATA(): ISaveData
    {
        return JSON.parse(localStorage.getItem(SaveData._STORAGE_KEY));
    }

}
