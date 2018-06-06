import 'phaser-ce';

import {LaneConverter} from '../Enums/Lanes';
//** Handles reading input */
export default class Input
{
    private game: Phaser.Game;

    public onInputMove: Phaser.Signal;
    public onInputDown: Phaser.Signal;
    public active: boolean = true;

    constructor(game: Phaser.Game, useContinuesInput: boolean)
    {
        this.game = game;

        this.onInputMove = new Phaser.Signal();
        this.onInputDown = new Phaser.Signal();

        if (useContinuesInput)
        {
            this.game.input.addMoveCallback(this.inputMove, this);
        }
        else
        {
            this.game.input.onDown.add(this.inputMove, this);
        }

        this.game.input.onDown.add(this.inputDown, this);
    }

    private inputMove(): void
    {
        if (!this.game.input.activePointer.isDown || !this.active) { return; }

        this.onInputMove.dispatch(LaneConverter.SCREENPOSITION_TO_CLOSEST_LANE(this.game, this.game.input.position.x, this.game.input.position.y));
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
