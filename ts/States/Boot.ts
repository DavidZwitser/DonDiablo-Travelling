import 'phaser-ce';

import Preload from './Preload';
import IGame from '../PluginManagers/IGame';

/**
 * The boot state handles all the mauin configuration settings needed for the application need to work.
 * After the boot is loaded, it immeditately goes to the loading state to load all the assets needed for the game
 */
export default class Boot extends Phaser.State
{
    public static Name: string = 'boot';

    public name: string = Boot.Name;
    public game: IGame;

    constructor(game: IGame)
    {
        super();
        this.game = game;
    }

    public init(): void
    {
        //Sets up the scale for the game
        if (this.game.device.desktop) {
            this.scale.pageAlignHorizontally = true;
            this.scale.windowConstraints.bottom = 'visual';

            this.game.onBlur.add(() => {
                this.game.sound.mute = true;
            });
            this.game.onFocus.add(() => {
                this.game.sound.mute = false;
            });
            window.addEventListener('resize', () => {
                this.scaleCanvasContain();
            });
            this.scaleCanvasContain();
        } else {
            let rotateScreen: any = document.getElementById('rotateWarning');
            rotateScreen.classList.add('rotateWarning');

            this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.USER_SCALE;

            window.addEventListener('resize', () => {
                Boot.mobileResizeCallback(this.game.scale);
            });
            Boot.mobileResizeCallback(this.game.scale);
            this.game.scale.onSizeChange.add(
                () => {
                    this.game.state.getCurrentState().resize(window.innerWidth, window.innerHeight);
                },
                this
            );
        }
        //input pointers limited to 1
        this.game.input.maxPointers = 1;

        //Disable contextual menu
        this.game.canvas.oncontextmenu = function (e: Event): void {
            e.preventDefault();
        };
    }
    /** Contains the canvas size to the size of the device making sure the canvas doesn't go over the border (only desktop) */
    private scaleCanvasContain(): void {
        if (window.innerHeight / window.innerWidth > GAME_HEIGHT / GAME_WIDTH) {
            this.scale.maxHeight = window.innerWidth * (GAME_HEIGHT / GAME_WIDTH);
            this.scale.maxWidth = window.innerWidth;
        } else {
            this.scale.maxHeight = window.innerHeight;
            this.scale.maxWidth = window.innerHeight / (GAME_HEIGHT / GAME_WIDTH);
        }
    }

    /** Changes the size of the canvas to be filled in within the sizes of the device (mobile only) */
    public static mobileResizeCallback(manager: Phaser.ScaleManager): void {
        let width: number = window.innerWidth;
        let height: number = window.innerHeight;

        let usedWidth: number = GAME_WIDTH;
        let usedHeight: number = GAME_HEIGHT;

        let scaleFactor: number = 1;

        //So first we check if the game is being played in landscape
        if (width > height) {
            scaleFactor /= width / usedHeight;
        } else {
            scaleFactor /= height / usedWidth;
        }

        let CALCULATED_WIDTH: any = Math.ceil(width * scaleFactor);
        let CALCULATED_HEIGHT: any = Math.ceil(height * scaleFactor);

        manager.setGameSize(CALCULATED_WIDTH, CALCULATED_HEIGHT);
        manager.setUserScale(1 / scaleFactor, 1 / scaleFactor);
    }

    public preload(): void
    {
        super.preload(this.game);
        //loades assets needed for the load screen
        this.game.load.image('load_screen', 'assets/sprites/UserInterface_SplashScreen.jpg');
        this.game.load.image('load_screen_text', 'assets/sprites/UserInterface_SplashScreen_Loading.png');

    }

    public create(): void
    {
        super.create(this.game);
        this.state.start(Preload.Name);
    }
}
