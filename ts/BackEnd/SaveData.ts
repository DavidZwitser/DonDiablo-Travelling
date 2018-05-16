import Constants from '../Data/Constants';

interface ISaveData
{
    sm: boolean; //sfx
    mm: boolean; //music
    q: number; //quality
    lvls: ILevelData[]; //array of leveldata
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
        if (this.data !== null) { return; }

        this.data = {
            'sm': false,
            'mm': false,
            'q': 1,
            'lvls': this.emplyLevelData()
        };

    }
    public static emplyLevelData(): ILevelData[] {
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
