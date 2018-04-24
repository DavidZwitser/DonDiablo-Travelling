import 'phaser-ce';

/**
 * All the information that should be accassible from anywhere
 */
export default class Constants
{
    public static PlayMusic: boolean;
    public static PlaySoundEffects: boolean;

    public static Levels: {title: string, artist: string}[] = [
        {title: 'Vader Jacob', artist: 'Don Diablo'},
        {title: 'just MYTHE!', artist: 'Media college'},
        {title: 'poesje mauw!', artist: 'Don Diablo'}
    ];
    public static currentLevel: number = 0;
}
