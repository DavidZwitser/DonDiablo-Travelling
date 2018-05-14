import 'phaser-ce';

import BuildingVisualizer from '../GameObjects/Environment/Paralax/BuildingVisualizer';
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

    private _audioVisualizer: BuildingVisualizer;

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

        this._audioVisualizer = new BuildingVisualizer(this.game, this.game.width, this.game.height * .2);
        this.game.add.existing(this._audioVisualizer);

        SoundManager.getInstance().playMusic(Sounds.headUp);

        this._road = new Road(this.game);
        this.game.add.existing(this._road);

        this._userInterface = new UI(this.game);
        this.game.add.existing(this._userInterface);

        this._player = new Player(this.game);
        this.game.add.existing(this._player);
        this.resize();
    }

    public update(): void {
        this._audioVisualizer.render();
        this._road.renderRoad(new Phaser.Point(.5, .5), .9);
    }

    public resize(): void {
        this._audioVisualizer.resize();
        this._road.renderRoad(new Phaser.Point(.5, .5), .9);
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        this._audioVisualizer.destroy();
        this._audioVisualizer = null;
    }

}
