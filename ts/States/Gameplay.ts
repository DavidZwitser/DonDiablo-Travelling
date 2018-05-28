import 'phaser-ce';

import BuildingVisualizer from '../GameObjects/Environment/Paralax/BuildingVisualizer';
import UI from '../GameObjects/Interactable/Paralax/UI/UI';
import Player from '../GameObjects/Interactable/Perspective/Player';
import SoundManager from '../Systems/Sound/SoundManager';

import PickupSpawner from '../Systems/PickupSpawner';
import SpawnEditor from '../Systems/SpawnEditor';
import Road from '../Rendering/Road';
import PerspectiveRenderer from '../Rendering/PerspectiveRenderer';
import Constants from '../Data/Constants';
import Input from '../Systems/Input';

import { Lanes } from '../Enums/Lanes';
import PlayerCollisionChecker from '../Systems/PlayerCollisionChecker';

import PhaseSystem from '../Systems/PhaseSystem';

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

    private _blurred: boolean = false;
    private _phaseSystem: PhaseSystem;

    private _comboCounter: number = 0;
    private readonly _comboTimeBeforePhaseUp: number = 7;

    constructor()
    {
        super();
    }

    public init(): void
    {
        SoundManager.getInstance(this.game);

        Constants.GAME_TIME = 0;
    }

    public create(): void
    {
        super.create(this.game);

        //focus/blur events setup
        document.addEventListener('blur', this.blur.bind(this));
        document.addEventListener('focus', this.focus.bind(this));

        this._worldMood = this._worldMood;

        /* Level creation */
        this.spawnEditor = new SpawnEditor();
        this.spawnEditor = this.spawnEditor;
        //remove below comment to start recording the spawn editor.
        this.spawnEditor.startRecording();

        /* Sounds */
        SoundManager.getInstance().playMusic(Constants.LEVELS[Constants.CURRENT_LEVEL].music);

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
        this._input.onInputMove.add( (lane: Lanes) => this._player.changeLane(lane));
        this._input.onInputDown.add( () => this._player.tapping());

        /* UI */
        this._userInterface = new UI(this.game);
        this.game.add.existing(this._userInterface);
        this._userInterface.onPause.add(this.pause, this);

        /* Phases! */
        this._phaseSystem = new PhaseSystem();
        this._phaseSystem.init();

        this._phaseSystem.onPhaseChange.add( this._player.reposition.bind(this._player) );
        this._phaseSystem.onPhaseChange.add( this._pickupSpawner.repositionAllPickups.bind(this._pickupSpawner) );
        this._phaseSystem.onPhaseChange.add( () => this._userInterface.scoreBar.Value = .5 );
        this._phaseSystem.onPhaseChange.add( this._road.fadeInNewRoadLines.bind(this._road) );
        this._phaseSystem.prePhaseChange.add( (duration: number) => this._road.hideExistingRoadLines(duration) );

        this._userInterface.scoreBar.onEmpty.add( () => {
            if (this._phaseSystem.currentPhase === 1)
            {
                this._userInterface.gameOver();
                this.pause(false);
            }
        });

        this.resize();
    }

    public update(): void
    {
        if (this._gamePaused) { return; }

        Constants.DELTA_TIME = this.game.time.elapsedMS / 1000;
        Constants.GAME_TIME += Constants.DELTA_TIME;

        this._phaseSystem.update();

        this._audioVisualizer.render();
        this._road.render();
        this._perspectiveRenderer.updatePosition();
        this._perspectiveRenderer.render();

        if (this._phaseSystem.inTransition === true) { return; }

        if (this._userInterface.scoreBar.Value >= .666)
        {
            this._comboCounter += Constants.DELTA_TIME;
        }
        else if (this._userInterface.scoreBar.Value <= .333)
        {
            this._comboCounter -= Constants.DELTA_TIME;
        }
        else
        {
            this._comboCounter = 0;
        }

        if (this._comboCounter > this._comboTimeBeforePhaseUp)
        {
            this._phaseSystem.startNextPhase();
            this._comboCounter = 0;
        }
        else if (this._comboCounter < -this._comboTimeBeforePhaseUp)
        {
            this._phaseSystem.startLastPhase();
            this._comboCounter = 0;
        }

    }

    public resize(): void
    {
        this._audioVisualizer.resize();
        this._userInterface.resize();
        this._road.render(true);
        this._perspectiveRenderer.resize();
    }

    //called when window gets blurred
    public blur(): void {
        if (this._gamePaused) {
            return;
        }
        this._blurred = true;
        this.pause(false);
    }

    //called when window gets focused
    public focus(): void {
        if (this._gamePaused && this._blurred) {
            this.pause();
            this._blurred = false;
        }
    }

    public pause(showPauseScreen: boolean = true): void
    {
        this._gamePaused = !this._gamePaused;
        this._pickupSpawner.pause(this._gamePaused);

        SoundManager.getInstance().pause(this._gamePaused);

        this._input.active = !this._gamePaused;

        if (showPauseScreen === false) { return; }
        this._userInterface.pauseScreen.visible = this._gamePaused;

        if (!this._blurred) {
            this._userInterface.Pause(this._gamePaused);
        }
    }

    // TODO: DESTROY EVERYTHING THAT IS CREATED *BEUHAHAH*
    public shutdown(): void
    {
        this.pause();
        SoundManager.getInstance().stopMusic();

        super.shutdown(this.game);

        this._audioVisualizer.destroy();
        this._audioVisualizer = null;

        this._userInterface.destroy();
        this._userInterface = null;

        this._pickupSpawner.destroy();
        this._pickupSpawner = null;

        this._player.destroy();
        this._player = null;

        this._input.destroy();
        this._input = null;

        this._perspectiveRenderer.destroy(true);
        this._perspectiveRenderer = null;

        this._road.destroy(true);
        this._road = null;

        this.spawnEditor.destroy();
        this.spawnEditor = null;

        this._phaseSystem.destroy();
        this._phaseSystem = null;

        this._glowFilter = null;

        //removing events
        document.removeEventListener('blur', this.blur.bind(this));
        document.removeEventListener('focus', this.focus.bind(this));
    }
}
