import { LaneIndexer } from '../Enums/Lanes';
import Constants from '../Data/Constants';
import IGamePhase from '../Enums/GamePhase';

export default class PhaseSystem
{
    /** Fires when the phase changes */
    public onPhaseChange: Phaser.Signal;

    /** The private "currentPhase" varuable used by the get/setter */
    private _currentPhase: number = 0;

    /** Used internaly to determen how long the current phase should take */
    private _phaseDuration: number = 0;
    /** Tells what time the last phase was, so the current phase time can be calculated */
    private _lastPhaseTime: number = 0;

    /** Set initial values in the PhaseSystem */
    public init(): void
    {
        this.onPhaseChange = new Phaser.Signal();

        this._lastPhaseTime = 0;

        /* So the listners can be set before the first lane update starts */
        requestAnimationFrame( () => this.currentPhase = 1 );
    }

    /** Update logic inside the PhaseSystem */
    public update (): void
    {
        /** Is it time for a new phase? */
        if (Constants.GAME_TIME <= this._lastPhaseTime + this._phaseDuration) { return; }

        /** Initiate the new phase! */
        this._lastPhaseTime = Constants.GAME_TIME;
        this.currentPhase ++;
    }

    /** Changes the current phase the game is in */
    private set currentPhase(phase: number)
    {
        /** Is it actually needed to change the phase? */
        if (phase === this.currentPhase || phase > Constants.PHASES.length) { return; }
        let nextPhase: IGamePhase = Constants.PHASES[phase - 1];

        /** Set the new values! */
        LaneIndexer.AMOUNT_OF_ACTIVE_LANES = nextPhase.amountOfLanes;
        Constants.GLOBAL_SPEED = nextPhase.pickupSpeed;
        this._phaseDuration = nextPhase.phaseDuration;

        this._currentPhase = phase;

        /** Fire the signal! */
        this.onPhaseChange.dispatch();
    }

    /** What phase we are in now */
    private get currentPhase(): number
    {
        return this._currentPhase;
    }

    /** Destroys all the junk */
    public destroy(): void
    {
        if (this.onPhaseChange)
        {
            this.onPhaseChange.removeAll();
        }
        this.onPhaseChange = null;
    }

}
