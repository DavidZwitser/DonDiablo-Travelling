/**
 * All the sound names, for preloading and accesing later.
 */
export default class Sounds
{
    //menu track
    public static UI_MENU_MUSIC: string = 'Menu';

    //in game tracks
    public static HEAD_UP: string = 'head_up';
    public static PEOPLE_SAY: string = 'People_Say';
    public static GIVE_ME_YOUR_LOVE: string = 'Give_Me_Your_Love';

    public static BELIEVE: string = 'Believe';
    public static EVERYBODY_SOMEBODY: string = 'Everybody_Somebody';
    public static PUT_IT_ON_FOR_ME: string = 'Put_It_On';
    public static HIGHER: string = 'higher';
    public static SAVE_A_LITTLE_LOVE: string = 'Save_A_Little_Love';
    public static REFLECTIONS: string = 'reflections';
    public static YOU_CANT_CHANGE_ME: string = 'You_Cant_Change_Me';
    public static DONT_LET_GO: string = 'Dont_Let_Go';
    public static SATALITES: string = 'satalites';

    //sound effects
    public static HIGH_SOUND: string = 'high_sound';
    public static LOW_SOUND: string = 'low_sound';
    public static UI_CLICK: string = 'ui_click';
    public static WOOSH: string = 'woosh';
    public static GAME_OVER: string = 'game_over';

    /** list of sound files that gets loaded when the game boots up */
    public static List: string[] = [
        Sounds.UI_MENU_MUSIC,
        //Sounds.HEAD_UP,
        //Sounds.GIVE_ME_YOUR_LOVE,
        //Sounds.PEOPLE_SAY,
        Sounds.HIGH_SOUND,
        Sounds.LOW_SOUND,
        Sounds.UI_CLICK,
        Sounds.WOOSH,
        Sounds.GAME_OVER
    ];
}
