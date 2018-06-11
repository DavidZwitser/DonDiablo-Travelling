import { LaneIndexer } from '../Enums/Lanes';
import Constants from '../Data/Constants';
import IGamePhase from '../Enums/GamePhase';

export default class PhaseSystem
{
    /** Fires when the phase changes */
    public prePhaseChange: Phaser.Signal;
    public onPhaseChange: Phaser.Signal;

    /** Transition between phases duration */
    // private _phaseTransitionDuration: number = 2.5;
    private _phaseTransitionDuration: number = 2;

    /** The private "currentPhase" varuable used by the get/setter */
    private _currentPhase: number = 0;

    /** Used internaly to determen how long the current phase should take */
    private _phaseDuration: number = 0;
    /** Tells what time the last phase was, so the current phase time can be calculated */
    private _lastPhaseTime: number = 0;

    public inTransition: boolean = false;

    /** Set initial values in the PhaseSystem */
    public init(): void
    {
        this.prePhaseChange = new Phaser.Signal();
        this.onPhaseChange = new Phaser.Signal();

        this._lastPhaseTime = 0;

        /* So the listners can be set before the first lane update starts */
        requestAnimationFrame( () => this.setPhase(Math.round(Constants.PHASES.length / 2) - 1) );
    }

    /** Update logic inside the PhaseSystem */
    public update(): void
    {
        /** Is it time for a new phase? */
        if (Constants.GAME_TIME <= this._lastPhaseTime + this._phaseDuration) { return; }

        /** Initiate the new phase! */
        this._lastPhaseTime = Constants.GAME_TIME;
        /* Temporary off to implement combo system */
        // this.currentPhase ++;
    }

    public startNextPhase(): void
    {
        if (this.currentPhase > Constants.PHASES.length) { return; }
        this.currentPhase ++;
    }
    public startPreviousPhase(): void
    {
        if (this.currentPhase < 0) { return; }
        this.currentPhase --;
    }

    /** Start the transition from one phase to another */
    private startPhaseTransition(nextPhase: number): void
    {
        this.prePhaseChange.dispatch(this._phaseTransitionDuration * 1000);

        setTimeout( () => this.setPhase(nextPhase), this._phaseTransitionDuration * 1000 );
    }

    /** Hard set all the values to the next phase values */
    private setPhase(phase: number): void
    {
        let nextPhase: IGamePhase = Constants.PHASES[phase - 1];

        /** Set the new values! */
        LaneIndexer.AMOUNT_OF_ACTIVE_LANES = nextPhase.amountOfLanes;
        Constants.GLOBAL_SPEED = nextPhase.pickupSpeed;

        this._currentPhase = phase;

        this.onPhaseChange.dispatch();
    }

    /** Changes the current phase the game is in */
    public set currentPhase(phase: number)
    {
        /** Is it actually needed to change the phase? */
        if (phase === this.currentPhase || phase > Constants.PHASES.length || phase <= 0) { return; }

        /** Fire the transition! */
        this.startPhaseTransition(phase);
    }

    /** What phase we are in now */
    public get currentPhase(): number
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
