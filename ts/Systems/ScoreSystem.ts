import PhaseSystem from './PhaseSystem';
import Constants from '../Data/Constants';

export default class ScoreSystem
{
    private _phaseSystem: PhaseSystem;

    private _comboCounter: number = 0;
    private readonly _comboTimeBeforePhaseUp: number = 6;

    constructor(phaseSystem: PhaseSystem)
    {
        this._phaseSystem = phaseSystem;
    }

    public updateScoreSystem(currentScore: number): void
    {
        if (this._phaseSystem.inTransition === true) { return; }

        if (currentScore >= .666)
        {
            this._comboCounter += Constants.DELTA_TIME;
        }
        else if (currentScore <= .333)
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
        else if (this._comboCounter < -this._comboTimeBeforePhaseUp / 2)
        {
            this._phaseSystem.startLastPhase();
            this._comboCounter = 0;
        }
    }

}
