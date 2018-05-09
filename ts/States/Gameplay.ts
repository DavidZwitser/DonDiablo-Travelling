import 'phaser-ce';

import MusicVisualizer from '../GameObjects/Environment/Paralax/MusicVisualizer';
import UI from '../GameObjects/Interactable/Paralax/UI/UI';
import Player from '../GameObjects/Interactable/Perspective/Player';
import SoundManager from '../Systems/Sound/SoundManager';
import Sounds from '../Data/Sounds';

// import PickupSpawner from '../Systems/PickupSpawner';

import Road from '../Rendering/Road';
import PerspectiveRenderer from '../Rendering/PerspectiveRenderer';
import Pickup from '../GameObjects/Interactable/Perspective/Pickup';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _worldMood: number;
    private _audioVisualizer: MusicVisualizer;

    private _userInterface: UI;
    private _player: Player;

    // private _pickupSpawner: PickupSpawner;

    private _perspectiveRenderer: PerspectiveRenderer;
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

        // let text: any = this.game.add.text(0, 0, 'this is the gameplay state', {font: '50px',
        // fill: '#fff',
        // align: 'center'});

        this._audioVisualizer = new MusicVisualizer(this.game, 0, this.game.height, this.game.width, this.game.height / 2);
        this.game.add.existing(this._audioVisualizer);

        SoundManager.getInstance().playMusic(Sounds.headUp);

        this._road = new Road(this.game);
        this.game.add.existing(this._road);

        this._perspectiveRenderer = new PerspectiveRenderer(this.game, new Phaser.Point(.5, .5));

        this._userInterface = new UI(this.game);
        this.game.add.existing(this._userInterface);

        this._player = new Player(this.game, this._perspectiveRenderer);
        this.game.add.existing(this._player);

        // this._pickupSpawner = new PickupSpawner(this.game, this._perspectiveRenderer);

        new Pickup(this.game, this._perspectiveRenderer, .2, .2);
        new Pickup(this.game, this._perspectiveRenderer, -.2, -.2);

        this.resize();
    }

    public update(): void {
        this._audioVisualizer.render();

        this._road.render(this._perspectiveRenderer.horizonPoint);

        this._perspectiveRenderer.render();
    }

    public resize(): void {
        this._audioVisualizer.y = this.game.height;
        this._road.render(this._perspectiveRenderer.horizonPoint);
        console.log('resize');
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        this._audioVisualizer.destroy();
        this._audioVisualizer = null;
    }

}
