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
import ScoreSystem from '../Systems/ScoreSystem';
import SaveData from '../BackEnd/SaveData';
import PickupContianer from '../Systems/PickupContainer';
import Sounds from '../Data/Sounds';
import Lightning from '../GameObjects/Interactable/Perspective/Lightning';
import { getRandomHexPart, HexParts, IHexPartsCollection, IHexBodyPartsCollection } from '../GameObjects/Interactable/Paralax/UI/HexPartsMenu/HexPartsData';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    public score: number = 0;

    private _worldMood: number;

    private _audioVisualizer: BuildingVisualizer;

    private _userInterface: UI;
    private _player: Player;
    private _lightning: Lightning;

    private _input: Input;
    private _pickupSpawner: PickupSpawner;
    private _pickupContainer: PickupContianer;

    private _perspectiveRenderer: PerspectiveRenderer;
    private _road: Road;
    private _glowFilter: Phaser.Filter;

    private _gamePaused: boolean = false;
    private spawnEditor: SpawnEditor;

    private _scoreSystem: ScoreSystem;

    private _blurred: boolean = false;
    private _colorIndex: number = 0;
    private _phaseSystem: PhaseSystem;

    constructor()
    {
        super();
    }

    public init(): void
    {
        SoundManager.getInstance(this.game);

        Constants.GAME_TIME = 0;
    }

    /** Toggleable options */
    private _updatePhaseByBar: boolean = true;
    private _hideScoreBar: boolean = false;
    private _useContinuesInput: boolean = true;

    public setToggealableOptions(): void
    {
        /** Move the player back a bit */
        // Constants.PLAYER_Z_POSITION = 1.1;

        /** Change phase per song and die when bar drains */
        // this._updatePhaseByBar = false;

        /** Is 6 lanes to much as the max difficulty? */

        /** Hide score bar */
        // this._hideScoreBar = true;

        /** Dont use continues input */
        // this._useContinuesInput = false;
    }
    /** End toggleable options */

    public create(): void
    {
        super.create(this.game);

        this.setToggealableOptions();

        //focus/blur events setup
        window.addEventListener('blur', this.blur.bind(this));
        window.addEventListener('focus', this.focus.bind(this));

        this._worldMood = this._worldMood;

        /* Rendering */
        this._perspectiveRenderer = new PerspectiveRenderer(this.game);

        /* Player */
        this._player = new Player(this.game, this._perspectiveRenderer);
        PlayerCollisionChecker.getInstance(this._player);

        PlayerCollisionChecker.getInstance().onColliding.add(() => {
            this.score += 1;
        });
        PlayerCollisionChecker.getInstance().onMissing.add(() => {
            this.score -= 1;
        });

        PlayerCollisionChecker.getInstance().onColliding.add( () => {
            this._userInterface.scoreBar.value += 1;
        });

        this._lightning = new Lightning(this.game, this._perspectiveRenderer);
        /* Level creation */
        this.spawnEditor = new SpawnEditor();

        //remove below comment to start recording the spawn editor.
        this.spawnEditor.startRecording();

        /* Road */
        this._road = new Road(this.game);

        if (Constants.USE_FILTERS === true)
        {
            this._glowFilter = new Phaser.Filter(this.game, null, Constants.GLOW_FILTER);
            this._road.filters = [this._glowFilter];
        }

        this.game.add.existing(this._road);

        /* Visualizer */
        this._audioVisualizer = new BuildingVisualizer(this.game, this.game.width, this.game.height * .2);
        this.game.add.existing(this._audioVisualizer);

        PlayerCollisionChecker.getInstance().onColliding.add(() => { this.worldReact(); });
        PlayerCollisionChecker.getInstance().onCollidingPerfect.add(() => { this.worldSuperReact(); });
        PlayerCollisionChecker.getInstance().onMissing.add(() => { this.onMissingpPickup(); });

        /* Pickups */
        this._pickupContainer = new PickupContianer(this.game);
        this._pickupSpawner = new PickupSpawner(this.game, this._pickupContainer, this._perspectiveRenderer);

        this.game.add.existing(this._player);
        this.game.add.existing(this._lightning);

        /* Input */
        this._input = new Input(this.game, this._useContinuesInput);
        this._input.onInputMove.add( (lane: Lanes) => this._player.changeLane(lane));
        this._input.onInputDown.add( () => this._player.tapping());

        /* UI */
        this._userInterface = new UI(this.game);
        this.game.add.existing(this._userInterface);
        this._userInterface.onPause.add(this.pause, this);

        /** Collecting a new hex part! */
        this._userInterface.scoreBar.onFull.add( () => {
            let collectedPickup: HexParts = SaveData.NextHexPickup;
            let currentData: IHexBodyPartsCollection = SaveData.HexCollectiblesData;

            Object.keys(currentData).forEach( (partKey: any) => {
                let currentSubParts: IHexPartsCollection = currentData[partKey].subParts;

                Object.keys(currentSubParts).forEach( (subPartKey: any) => {
                    if (+subPartKey === +collectedPickup)
                    {
                        currentData[partKey].subParts[subPartKey].collected = true;
                    }
                });
            });

            SaveData.HexCollectiblesData = currentData;
            SaveData.NextHexPickup = getRandomHexPart();
        });

        /* Phases! */
        this._phaseSystem = new PhaseSystem();
        this._phaseSystem.init();

        this._phaseSystem.onPhaseChange.add( this.worldReposition.bind(this) );

        this._phaseSystem.prePhaseChange.add( (duration: number) => this._road.hideExistingRoadLines(duration) );
        this._phaseSystem.onPhaseChange.add( this._road.fadeInNewRoadLines.bind(this._road) );

        this._scoreSystem = new ScoreSystem();
        if (this._updatePhaseByBar === true)
        {
            this._scoreSystem.onNextPhase.add( this._phaseSystem.startNextPhase.bind(this._phaseSystem) );
            this._scoreSystem.onPreviousPhase.add( this._phaseSystem.startPreviousPhase.bind(this._phaseSystem) );
        }
        else
        {
            this._scoreSystem.onPreviousPhase.add( () => this.gameOver() );
        }

        this._scoreSystem.onPreviousPhase.add( () => {
            if (this._phaseSystem.currentPhase === 0)
            {
                this.gameOver();
            }
        });

        if (this._hideScoreBar)
        {
            this._userInterface.scoreBar.visible = false;
        }

        SoundManager.getInstance().onMusicEnd.add(this.nextTrack.bind(this));
        this.startTrack();

        //addEventListener('click', this.nextTrack.bind(this));
        this.resize();

    }

    /** sets up next track of the song list */
    private nextTrack(): void
    {
        Constants.CURRENT_LEVEL = (Constants.CURRENT_LEVEL + 1) % Constants.LEVELS.length;
        this.startTrack();

        this._colorIndex = (this._colorIndex + 1 + Constants.ROAD_COLORS.length) % Constants.ROAD_COLORS.length;
        this._road.setColors(this._colorIndex);
        this._audioVisualizer.setColor(this._colorIndex);
        if (this._updatePhaseByBar)
        {
            this._phaseSystem.startNextPhase();
        }
    }

    /** starts the track (optinally with a delay) */
    private startTrack(delay: number = 1000): void
    {
        this._userInterface.displayTrackTitle(Constants.LEVELS[Constants.CURRENT_LEVEL].title);
        setTimeout(() => {
            SoundManager.getInstance().playMusic(Constants.LEVELS[Constants.CURRENT_LEVEL].music, 1, false);
            this._pickupSpawner.setNewSong(Constants.LEVELS[Constants.CURRENT_LEVEL].json);
        }, delay);
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
        this._scoreSystem.updateScoreSystem(this.score);

    }

    public gameOver(): void
    {
        if (this.score > SaveData.Highscore)
        {
            SaveData.Highscore = this.score;
        }

        this._userInterface.gameOver(this.score, SaveData.Highscore);
        this.pause(false);
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
            this.pause(false);
            this._blurred = false;
        }
    }

    public onMissingpPickup(): void {
        SoundManager.getInstance().play(Sounds.LOW_SOUND);
        this.game.camera.flash(0xff0000, 300, true, 0.1);
    }

    public pause(showPauseScreen: boolean = true): void
    {
        this._gamePaused = !this._gamePaused;
        this._pickupSpawner.pause(this._gamePaused);

        SoundManager.getInstance().pause(this._gamePaused);

        this._input.active = !this._gamePaused;
        this._lightning.pause(this._gamePaused);

        if (showPauseScreen === false) { return; }
        this._userInterface.pauseScreen.visible = this._gamePaused;

        if (!this._blurred) {
            this._userInterface.Pause(this._gamePaused);
        }
    }

    public worldSuperReact(): void {
        this._lightning.initiateThunder(this._player.lane);
        this.worldReact();
    }

    /** Make the world move */
    public worldReact(): void {
        if (navigator.vibrate) {
            // vibration API supported
            window.navigator.vibrate(50);
        }
        SoundManager.getInstance().play(Sounds.HIGH_SOUND);
        this._audioVisualizer.react();
        this._player.react();
        this._pickupContainer.makeAllPickupsReact();
        this._userInterface.react();
    }

    /** Reposition everything on the road so they are ready for the next phase */
    public worldReposition(): void
    {
        this._player.reposition();
        this._pickupContainer.reposition();
    }

    // TODO: DESTROY EVERYTHING THAT IS CREATED *BEUHAHAH*
    public shutdown(): void
    {
        this.pause();
        SoundManager.getInstance().stopMusic();

        super.shutdown(this.game);

        PlayerCollisionChecker.getInstance().destroy();

        SoundManager.getInstance().onMusicEnd.removeAll();

        this._audioVisualizer.destroy();
        this._audioVisualizer = null;

        this._userInterface.destroy();
        this._userInterface = null;

        this._pickupSpawner.destroy();
        this._pickupSpawner = null;

        this._pickupContainer.destroy();
        this._pickupContainer = null;

        this._player.destroy();
        this._player = null;

        this._input.destroy();
        this._input = null;

        this._perspectiveRenderer.destroy(true);
        this._perspectiveRenderer = null;

        this._lightning.destroy();
        this._lightning = null;

        this._road.destroy(true);
        this._road = null;

        this.spawnEditor.destroy();
        this.spawnEditor = null;

        this._phaseSystem.destroy();
        this._phaseSystem = null;

        this._scoreSystem.destroy();
        this._scoreSystem = null;

        this._glowFilter = null;

        //removing events
        window.removeEventListener('blur', this.blur.bind(this));
        window.removeEventListener('focus', this.focus.bind(this));
    }
}
