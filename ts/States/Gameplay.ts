import 'phaser-ce';

import BuildingVisualizer from '../GameObjects/Environment/Paralax/BuildingVisualizer';
import UI from '../GameObjects/Interactable/Paralax/UI/UI';
import Player from '../GameObjects/Interactable/Perspective/Player';
import SoundManager from '../Systems/Sound/SoundManager';
import Sounds from '../Data/Sounds';

import PickupSpawner from '../Systems/PickupSpawner';
import SpawnEditor from '../Systems/SpawnEditor';
import Road from '../Rendering/Road';
import PerspectiveRenderer from '../Rendering/PerspectiveRenderer';
import Constants from '../Data/Constants';
import Input from '../Systems/Input';

import { Lanes } from '../Enums/Lanes';
import PlayerCollisionChecker from '../Systems/PlayerCollisionChecker';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _worldMood: number;

    private _audioVisualizer: BuildingVisualizer;

    private _userInterface: UI;
    private _player: Player;

    private _input: Input;
    private _pickupSpawner: PickupSpawner;

    private _perspectiveRenderer: PerspectiveRenderer;
    private _road: Road;
    private _glowFilter: Phaser.Filter;

    private _gamePaused: boolean = false;
    private spawnEditor: SpawnEditor;

    constructor()
    {
        super();
    }

    public init(): void
    {
        SoundManager.getInstance(this.game);
    }

    public create(): void
    {
        super.create(this.game);

        this._worldMood = this._worldMood;

        /* Level creation */
        this.spawnEditor = new SpawnEditor();
        this.spawnEditor = this.spawnEditor;
        //remove below comment to start recording the spawn editor.
        this.spawnEditor.startRecording();

        /* Sounds */
        SoundManager.getInstance().playMusic(Sounds.headUp);

        /* Road */
        this._glowFilter = new Phaser.Filter(this.game, null, Constants.GLOW_FILTER);

        this._road = new Road(this.game);
        this.game.add.existing(this._road);

        this._road.filters = [this._glowFilter];

        /* Visualizer */
        this._audioVisualizer = new BuildingVisualizer(this.game, this.game.width, this.game.height * .2);
        this.game.add.existing(this._audioVisualizer);

        /* Rendering */
        this._perspectiveRenderer = new PerspectiveRenderer(this.game);

        /* Player */
        this._player = new Player(this.game, this._perspectiveRenderer);
        PlayerCollisionChecker.getInstance(this._player);

        /* Pickups */
        this._pickupSpawner = new PickupSpawner(this.game, this._perspectiveRenderer);

        this.game.add.existing(this._player);

        /* Input */
        this._input = new Input(this.game);
        this._input.onInputDown.add( (lane: Lanes) => this._player.changeLane(lane));

        /* UI */
        this._userInterface = new UI(this.game);
        this.game.add.existing(this._userInterface);
        this._userInterface.onUIPause.add(this.pause, this);

        this.resize();
    }

    public update(): void
    {
        if (this._gamePaused) { return; }

        Constants.DELTA_TIME = this.game.time.elapsedMS / 1000;

        this._audioVisualizer.render();
        this._road.render();
        this._perspectiveRenderer.updatePosition();
        this._perspectiveRenderer.render();
    }

    public resize(): void
    {
        this._audioVisualizer.resize();
        this._userInterface.resize();
        this._road.render();
        this._perspectiveRenderer.resize();
    }

    public pause(): void
    {
        this._gamePaused = !this._gamePaused;
        this._pickupSpawner.pause(this._gamePaused);
        SoundManager.getInstance().pause(this._gamePaused);
    }

    // TODO: DESTROY EVERYTHING THAT IS CREATED *BEUHAHAH*
    public shutdown(): void
    {
        super.shutdown(this.game);

        this._audioVisualizer.destroy();
        this._audioVisualizer = null;
    }
}
