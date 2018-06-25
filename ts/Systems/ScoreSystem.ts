import Constants from '../Data/Constants';

export default class ScoreSystem
{
    private _comboCounter: number = 0;
    private readonly _comboTimeBeforePhaseUp: number = 6;

    public onNextPhase: Phaser.Signal;
    public onPreviousPhase: Phaser.Signal;

    constructor()
    {
        this.onNextPhase = new Phaser.Signal();
        this.onPreviousPhase = new Phaser.Signal();
    }

    /**
     *  updates the score and checks if the user goes to the next state!
     */
    public updateScoreSystem(currentScore: number): void
    {
        if (currentScore > 0)
        {
            this._comboCounter += Constants.DELTA_TIME;
        }
        else if (currentScore < 0)
        {
            this._comboCounter -= Constants.DELTA_TIME;
        }
        else
        {
            this._comboCounter = 0;
        }

        if (this._comboCounter > this._comboTimeBeforePhaseUp)
        {
            this.onNextPhase.dispatch();
            this._comboCounter = 0;
        }
        else if (this._comboCounter < -this._comboTimeBeforePhaseUp / 2)
        {
            this.onPreviousPhase.dispatch();
            this._comboCounter = 0;
        }
    }

    /**
     * Destroys the scoresystem
     */
    public destroy(): void
    {
        if (this.onNextPhase) { this.onNextPhase.removeAll(); }
        this.onNextPhase = null;

        if (this.onPreviousPhase) { this.onPreviousPhase.removeAll(); }
        this.onPreviousPhase = null;
    }
}
