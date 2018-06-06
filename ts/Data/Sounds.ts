/**
 * All the sound names, for preloading and accesing later.
 */
export default class Sounds
{
    public static testMusic: string = 'test';

    //menu track
    public static UI_MENU_MUSIC: string = 'Menu';

    //in game tracks
    public static HEAD_UP: string = 'head_up';
    public static PEOPLE_SAY: string = 'People_Say';
    public static GIVE_ME_YOUR_LOVE: string = 'Give_Me_Your_Love';

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
