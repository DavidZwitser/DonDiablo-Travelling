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

    public static glowFilter: any = [
        'precision lowp float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',

        'void main() {',
            'vec4 sum = vec4(0);',
            'vec2 texcoord = vTextureCoord;',
            'for(int xx = -4; xx <= 4; xx++) {',
                'for(int yy = -3; yy <= 3; yy++) {',
                    'float dist = sqrt(float(xx*xx) + float(yy*yy));',
                    'float factor = 0.0;',
                    'if (dist == 0.0) {',
                        'factor = 2.0;',
                    '} else {',
                        'factor = 3.0/abs(float(dist));', //here the glowscale is defined
                    '}',
                    'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
                '}',
            '}',
            'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
        '}'
    ];
}
