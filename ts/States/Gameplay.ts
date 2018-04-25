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

        let text: any = this.game.add.text(0, 0, 'this is the gameplay state', {font: '50px',
        fill: '#fff',
        align: 'center'});
        console.log(text);

        this._audioVisualizer = new MusicVisualizer(this.game, 0, this.game.height, this.game.width, this.game.height / 2);
        this.game.add.existing(this._audioVisualizer);

        SoundManager.getInstance().playMusic(Sounds.headUp);

        this._road = new Road(this.game);
        this.game.add.existing(this._road);
        this._road.renderRoad( new Phaser.Point(.5, .45), .88);

        this._userInterface = new UI(this.game);
        this.game.add.existing(this._userInterface);

        this._player = new Player(this.game);
        this.game.add.existing(this._player);
    }

    public update(): void {
        this._audioVisualizer.render();
    }

    public resize(): void {
        this._audioVisualizer.y = this.game.height;
        console.log('resize');
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        this._audioVisualizer.destroy();
        this._audioVisualizer = null;
    }

}
