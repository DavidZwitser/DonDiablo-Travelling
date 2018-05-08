import 'phaser-ce';

import MusicVisualizer from '../GameObjects/Environment/Paralax/MusicVisualizer';
import UI from '../GameObjects/Interactable/Paralax/UI/UI';
import Player from '../GameObjects/Interactable/Perspective/Player';
import SoundManager from '../Systems/Sound/SoundManager';
import Sounds from '../Data/Sounds';

import Road from '../Rendering/Road';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _worldMood: number;
    private _audioVisualizer: MusicVisualizer;

    private _userInterface: UI;
    private _player: Player;

    private _road: Road;

    private _gamePaused: boolean = false;


    /*
    get gamePaused(): boolean {
        return this._gamePaused;
    }
    set gamePaused(getPaused: boolean) {
        this._gamePaused = getPaused;
    }
    */

    constructor()
    {
        super();
    }

    public init(): void {
        SoundManager.getInstance(this.game);
    }

    public create(): void
    {
        super.create(this.game);

        this._worldMood = this._worldMood;

        // let text: any = this.game.add.text(0, 0, 'this is the gameplay state', {font: '50px',
        // fill: '#fff',
        // align: 'center'});

        this._audioVisualizer = new MusicVisualizer(this.game, 0, 0, this.game.width, this.game.height * .15);
        this.game.add.existing(this._audioVisualizer);

        SoundManager.getInstance().playMusic(Sounds.headUp);

        this._road = new Road(this.game);
        this.game.add.existing(this._road);

        this._userInterface = new UI(this.game);
        this.game.add.existing(this._userInterface);

        this._player = new Player(this.game);
        this.game.add.existing(this._player);

        this._userInterface.onPause.add(this.pause);

        this.resize();
    }

    public update(): void {
        if (!this._gamePaused)
        {
            this._audioVisualizer.render();
            this._road.renderRoad(new Phaser.Point(.5, .5), .9);
        }

    }

    public resize(): void {
        this._audioVisualizer.y = this.game.height * .6;
        this._road.renderRoad(new Phaser.Point(.5, .5), .9);
        console.log('resize');
    }

    public pause( pause: boolean): void
    {
       this._gamePaused = !pause;
       console.log('paused');
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        this._audioVisualizer.destroy();
        this._audioVisualizer = null;
    }
}
