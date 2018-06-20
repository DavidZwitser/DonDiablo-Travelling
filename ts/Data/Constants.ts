import 'phaser-ce';

import IGamePhase from '../Enums/GamePhase';
import JSON from './JSON';
import Sounds from './Sounds';

/** List of the color set for the road and sprites for the buiolding sprites. */
export interface IRoadColors
{
    bottomMiddleColor: number;
    bottomOuterColor: number;
    topMiddleColor: number;
    topOuterColor: number;
    topSprite: string;
    bottomSprite: string;
    backSprite?: string;
}

/** Interface of the level info containing  */
interface ILevel
{
    title: string;
    artist: string;
    json: string;
    music: string;
}

interface ICar
{
    carName: string;
    spriteKey: string;
    description: string;
}

/**
 * All the information that should be accassible from anywhere
 */
export default class Constants
{
    public static PLAYING_MUSIC: boolean;
    public static PLAYING_SOUND_EFFECTS: boolean;

    public static HORIZON_POSITION: {x: number, y: number} = {x: .5, y: .5};

    public static GLOBAL_SPEED: number = 2.5;

    public static PLAYER_Z_POSITION: number = 1.05;

    public static DELTA_TIME: number = 1;
    /** How long the current game is running for */
    public static GAME_TIME: number = 0;

    public static readonly SPAWN_DELAY: number = 3.5;

    public static CURRENT_LEVEL: number = 0;

    public static PICKUPS_BEFORE_HEX_PART: number; //gets really declard in hexbar.ts

    public static hexCollected: boolean = true; // checks if all hex parts have been collected.

    public static get GetHexCollected(): boolean
    {
        return this.hexCollected;
    }

    /** road colors list with their own color schemes */
    public static readonly ROAD_COLORS: IRoadColors[] = [
        {
            //red
            bottomMiddleColor: 0x8bf2d6,
            bottomOuterColor: 0x66090f,
            //blue
            topMiddleColor: 0xf4091a,
            topOuterColor: 0x148694,

            topSprite: 'Red',
            bottomSprite: 'Blue'
        },
        {
            //blue
            bottomMiddleColor: 0xf99ff4,
            bottomOuterColor: 0x6f87f0,
            //purple
            topMiddleColor: 0xc7e5f4,
            topOuterColor: 0xd13df1,

            topSprite: 'DarkBlue',
            bottomSprite: 'Purple'

        },
        {
            //purple
            bottomMiddleColor: 0xc7e5f4,
            bottomOuterColor: 0xd13df1,
            //blue
            topMiddleColor: 0xf99ff4,
            topOuterColor: 0x6f87f0,

            topSprite: 'Purple',
            bottomSprite: 'DarkBlue'

        },
        {
            //blue
            bottomMiddleColor: 0xf4091a,
            bottomOuterColor: 0x148694,
            //red
            topMiddleColor: 0x8bf2d6,
            topOuterColor: 0x66090f,

            topSprite: 'Blue',
            bottomSprite: 'Red'
        },
        {
           //purple
           bottomMiddleColor: 0xc7e5f4,
           bottomOuterColor: 0xd13df1,
            //red
            topMiddleColor: 0x8bf2d6,
            topOuterColor: 0x66090f,

            topSprite: 'Purple',
            bottomSprite: 'Red'
        },
        {
            //red
            bottomMiddleColor: 0x8bf2d6,
            bottomOuterColor: 0x66090f,
             //purple
             topMiddleColor: 0xc7e5f4,
             topOuterColor: 0xd13df1,

             topSprite: 'Red',
             bottomSprite: 'Purple'
         }
    ];

    public static readonly SECRET_ROAD_COLORS: IRoadColors[] = [

        {
            //blue
            bottomMiddleColor: 0xAAAAAA,
            bottomOuterColor: 0xAAAAAA,
            //purple
            topMiddleColor: 0xAAAAAA,
            topOuterColor: 0xAAAAAA,

            topSprite: 'Black',
            bottomSprite: 'Black'

        },
        {
            //purple
            bottomMiddleColor: 0x111111,
            bottomOuterColor: 0x111111,
            //blue
            topMiddleColor: 0x111111,
            topOuterColor: 0x111111,

            topSprite: 'Black',
            bottomSprite: 'Black'
        },
         {
            //black
            bottomMiddleColor: 0x000000,
            bottomOuterColor: 0x000000,
             //black
             topMiddleColor: 0x000000,
             topOuterColor: 0x000000,

             topSprite: 'Black',
             bottomSprite: 'Black'
         }

    ];

    /** The levels */
    public static readonly LEVELS: ILevel[] = [
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
        },
        {
            title: 'Dont let go',
            artist: 'Don Diablo',
            json: JSON.DONT_LET_GO,
            music: Sounds.DONT_LET_GO
        },
        {
            title: 'You cant change me',
            artist: 'Don Diablo',
            json: JSON.YOU_CANT_CHANGE_ME,
            music: Sounds.YOU_CANT_CHANGE_ME
        },
        {
            title: 'Save a little love',
            artist: 'Don Diablo',
            json: JSON.SAVE_A_LITTLE_LOVE,
            music: Sounds.SAVE_A_LITTLE_LOVE
        },
        {
            title: 'Reflections',
            artist: 'Don Diablo',
            json: JSON.REFLECTIONS,
            music: Sounds.REFLECTIONS
        },
        {
            title: 'Satalite',
            artist: 'Don Diablo',
            json: JSON.SATALITE,
            music: Sounds.SATALITES
        },
        {
            title: 'Everbody is somebody',
            artist: 'Don Diablo',
            json: JSON.EVERYBODY_SOMEBODY,
            music: Sounds.EVERYBODY_SOMEBODY
        },
        {
            title: 'Believe',
            artist: 'Don Diablo',
            json: JSON.BELIEVE,
            music: Sounds.BELIEVE
        },
        {
            title: 'Higher',
            artist: 'Don Diablo',
            json: JSON.HIGHER,
            music: Sounds.HIGHER
        },
        {
            title: 'Put it on for me',
            artist: 'Don Diablo',
            json: JSON.PUT_IT_ON,
            music: Sounds.PUT_IT_ON_FOR_ME
        },
        {
            title: 'Tunnel Vision',
            artist: 'Don Diablo',
            json: JSON.TUNNEL_VISION,
            music: Sounds.FUTURE
        }

    ];

    /** Gets a random list of indexes of each level with optional a starting point */
    public static GET_RANDOM_TRACKLIST(initial?: number): number[]{
       
     //   let hexCollected: boolean = this.hexCollected;;

       
        let list: number[] = [];
        let tracklist: number[] = [];
        for (let i: number = 0; i < Constants.LEVELS.length; i++) {
            list.push(i);
        }

        if (!this.hexCollected)
        {
            if (initial) {
                tracklist.push(list[initial]);
                list.splice(initial, 1);
            }
            while (list.length !== 0) {
                let random: number = Math.floor(Math.random() * list.length);
                tracklist.push(list[random]);
                list.splice(random, 1);
                }
        }
        else
        {
            let tunnelVision: number = list.length - 1;
            tracklist.push(list[tunnelVision]);
            list.splice(tunnelVision, 1);
        }
     
        return tracklist;
    }

    /** List of the info per car like name, sprite and description */
    public static readonly CARS: ICar[] = [
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
        },
        {
            carName: 'Speed lighter',
            spriteKey: 'ingame_vehicle_4_sideview_right',
            description: 'Better, faster and cooler in\n purple!'
        }
    ];

    /** All the phases saved in a Phase array */
    public static readonly PHASES: IGamePhase[] = [
        {
            amountOfLanes: 2,
            pickupSpeed: 2
        },
        {
            amountOfLanes: 3,
            pickupSpeed: 2.5
        },
        {
            amountOfLanes: 4,
            pickupSpeed: 2.8
        },
        {
            amountOfLanes: 5,
            pickupSpeed: 3
        },
        {
            amountOfLanes: 6,
            pickupSpeed: 3.2
        },
        {
            amountOfLanes: 6,
            pickupSpeed: 3.5
        },
        {
            amountOfLanes: 6,
            pickupSpeed: 3.7
        },
        {
            amountOfLanes: 6,
            pickupSpeed: 4
        }
    ];

    /** Filter to make the colors difuse to give it a glow effect */
    public static readonly GLOW_FILTER: string[] = [
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
}
