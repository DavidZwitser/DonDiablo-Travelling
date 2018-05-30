import 'phaser-ce';

import {LaneConverter} from '../Enums/Lanes';
//** Handles reading input */
export default class Input
{
    public game: Phaser.Game;

    public onInputMove: Phaser.Signal;
    public onInputDown: Phaser.Signal;
    public onInputSwipe: Phaser.Signal;
    public active: boolean = true;

    private _lastPointerX: number;
    private _lastPointerY: number;

    private _inputReleased: boolean = true;
    private _regenInputCooldown: number = 0;

    constructor(game: Phaser.Game, useContinuesInput: boolean)
    {
        this.game = game;

        this.onInputMove = new Phaser.Signal();
        this.onInputDown = new Phaser.Signal();

        this.onInputSwipe = new Phaser.Signal();

        if (useContinuesInput)
        {
            // this.game.input.addMoveCallback(this.inputMove, this);
            // this.game.input.addMoveCallback(this.inputSwipe, this);
        }
        else
        {
            // this.game.input.onDown.add(this.inputMove, this);
        }

        this.game.input.onDown.add(this.inputDown, this);

        this.game.input.onUp.add(() => {
            this._inputReleased = true;
            this._regenInputCooldown = 3;
        });

        this._lastPointerX = this.game.input.activePointer.x;
        this._lastPointerY = this.game.input.activePointer.y;

    }

    public update(): void
    {
        let inputDeltaX: number = this.game.input.activePointer.x - this._lastPointerX;
        let inputDeltaY: number = this.game.input.activePointer.y - this._lastPointerY;

        this._lastPointerX = this.game.input.activePointer.x;
        this._lastPointerY = this.game.input.activePointer.y;

        console.log(Math.round(Math.max(Math.abs(inputDeltaX), Math.abs(inputDeltaY))), this._regenInputCooldown);
        if (this._regenInputCooldown !== 0)
        {
            this._regenInputCooldown --;
            return;
        }

        if (
            Math.max(Math.abs(inputDeltaX), Math.abs(inputDeltaY)) < 40 ||
            this.game.input.activePointer.isDown === false ||
            this._inputReleased === false
        )
        {
            return;
        }

        this._inputReleased = false;
        console.log('swipe!', inputDeltaX, inputDeltaY);
        this.onInputSwipe.dispatch(
            -inputDeltaX,
            -inputDeltaY
        );
    }

    private inputMove(): void
    {
        if (!this.game.input.activePointer.isDown || !this.active) { return; }

        this.onInputMove.dispatch(
            LaneConverter.SCREENPOSITION_TO_CLOSEST_LANE(
                this.game,
                this.game.input.position.x,
                this.game.input.position.y
            )
        );
    }

    private inputDown(): void {
        if (!this.active) { return; }

        // console.log('input down');
        this.onInputDown.dispatch();
    }

    public destroy(): void
    {
        this.onInputMove.removeAll();
        this.onInputMove = null;
    }

}
