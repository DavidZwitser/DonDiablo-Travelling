import 'phaser-ce';

import IGamePhase from '../Enums/GamePhase';
import JSON from './JSON';
import Sounds from './Sounds';

/**
 * All the information that should be accassible from anywhere
 */
export default class Constants
{
    public static PLAYING_MUSIC: boolean;
    public static PLAYING_SOUND_EFFECTS: boolean;

    public static HORIZON_POSITION: {x: number, y: number} = {x: .5, y: .5};

    public static GLOBAL_SPEED: number = 2.5;

    public static PLAYER_Z_POSITION: number = 1.2;

    public static DELTA_TIME: number = 1;
    /** How long the current game is running for */
    public static GAME_TIME: number = 0;

    public static readonly SPAWN_DELAY: number = 3.5;

    public static CURRENT_LEVEL: number = 0;

    public static readonly PICKUPS_BEFORE_HEX_PART: number = 150;

    /** road colors list with their own color schemes */
    public static readonly ROAD_COLORS: {
        _bottomMiddleColor: number,
        _bottomOuterColor: number,
        _topMiddleColor: number,
        _topOuterColor: number,
        _topSprite: string,
        _bottomSprite: string
    }[] = [
        {
            //red
            _bottomMiddleColor: 0x8bf2d6,
            _bottomOuterColor: 0x66090f,
            //blue
            _topMiddleColor: 0xf4091a,
            _topOuterColor: 0x148694,

            _topSprite: 'Red',
            _bottomSprite: 'Blue'
        },
        {
            //blue
            _bottomMiddleColor: 0xf99ff4,
            _bottomOuterColor: 0x6f87f0,
            //purple
            _topMiddleColor: 0xc7e5f4,
            _topOuterColor: 0xd13df1,

            _topSprite: 'DarkBlue',
            _bottomSprite: 'Purple'

        }
    ];

    /** The levels */
    public static readonly LEVELS: {title: string, artist: string, json: string, music: string}[] = [
        {
            title: 'Head Up',
            artist: 'Don Diablo',
            json: JSON.HEAD_UP,
            music: Sounds.HEAD_UP
        },
        {
            title: 'People Say',
            artist: 'Don Diablo',
            json: JSON.PEOPLE_SAY,
            music: Sounds.PEOPLE_SAY
        },
        {
            title: 'Give me your love',
            artist: 'Don Diablo',
            json: JSON.GIVE_ME_YOUR_LOVE,
            music: Sounds.GIVE_ME_YOUR_LOVE
        }
    ];

    public static CARS: {carName: String, spriteKey: string, description: string}[] = [
        {
            carName: 'D1-A8L0',
            spriteKey: 'ingame_vehicle_1_sideview_right',
            description: 'Lexus model, number original!'
        },
        {
            carName: 'Neon Drifter',
            spriteKey: 'ingame_vehicle_2_sideview_right',
            description: 'Drift like the fastest riders\n in Hexagonia!'
        },
        {
            carName: 'Phaser Noir',
            spriteKey: 'ingame_vehicle_3_sideview_right',
            description: 'Slick, swift and better in\n black!'
        }
    ];

    /** All the phases saved in a Phase array */
    public static readonly PHASES: IGamePhase[] = [
        {
            phaseDuration: 10,
            amountOfLanes: 2,
            pickupSpeed: 2.5
        },
        {
            phaseDuration: 20,
            amountOfLanes: 3,
            pickupSpeed: 2.8
        },
        {
            phaseDuration: 25,
            amountOfLanes: 4,
            pickupSpeed: 3
        },
        {
            phaseDuration: 25,
            amountOfLanes: 5,
            pickupSpeed: 3.2
        },
        {
            phaseDuration: 40,
            amountOfLanes: 6,
            pickupSpeed: 3.5
        },
        {
            phaseDuration: 40,
            amountOfLanes: 6,
            pickupSpeed: 3.7
        },
        {
            phaseDuration: 40,
            amountOfLanes: 6,
            pickupSpeed: 4
        },
        {
            phaseDuration: 40,
            amountOfLanes: 6,
            pickupSpeed: 4.2
        }
    ];

    public static readonly GLOW_FILTER: any = [
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

    /** Should shaders be applied */
    public static USE_FILTERS: boolean = true;

    /** All the GPU's that don't work with shaders */
    public static GPU_SHADER_BLACKLIST: string[] = [
        /** Tested on a Oneplus 6 */
        'Adreno (TM) 630',
        /** Tested on a Oneplus 3 */
        'Adreno (TM) 530'
    ];

    public static hexToRGB(color: string): {r: number, g: number, b: number} {
        /* Check for # infront of the value, if it's there, strip it */

        console.log('before substring', color);
        if (color.substring(0, 2) === '0x') {
           color = color.substring(2);
        }
        console.log('after substring', color);
        /* Grab each pair (channel) of hex values and parse them to ints using hexadecimal decoding */
        let r: number = parseInt(color.substring(0, 2), 16);
        let g: number = parseInt(color.substring(2, 4), 16);
        let b: number = parseInt(color.substring(4), 16);

        return {r: r, g: g, b: b};
       }
    public static componentToHex(c: number): string
    {
        let hex: string = c.toString(16);
        return hex.charAt(1) === '.' || hex.length === 1 ? '0' +  hex.substring(0, 1) : hex = hex.substring(0, 2);
    }

    public static rgbToHex(r: number, g: number, b: number): any
    {
        return '0x' + Constants.componentToHex(r) + Constants.componentToHex(g) + Constants.componentToHex(b);
    }

}
