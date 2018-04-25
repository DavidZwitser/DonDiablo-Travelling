import 'phaser-ce';

/**
 * All the information that should be accassible from anywhere
 */
export default class Constants
{
    public static PlayMusic: boolean;
    public static PlaySoundEffects: boolean;

    public static Levels: {title: string, artist: string}[] = [
        {title: 'Head Up', artist: 'Don Diablo'},
        {title: 'Back To Us', artist: 'Don Diablo'},
        {title: 'Believe', artist: 'Don Diablo'}
    ];
    public static currentLevel: number = 0;
}
