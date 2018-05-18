import 'phaser-ce';

import {LaneConverter} from '../Enums/Lanes';
//** Handles reading input */
export default class Input
{
    public game: Phaser.Game;

    public onInputDown: Phaser.Signal;

    /** how to use it!
     *  this.inputy = new Input(this.game);this.inputy.onInputDown.add((r: Lanes) => {console.log(r);});
     */

    constructor(game: Phaser.Game)
    {
        this.game = game;

        this.onInputDown = new Phaser.Signal();
        this.game.input.onDown.add((pointer: Phaser.Pointer) => this.inputDown(pointer));
    }

    private inputDown(pointer: Phaser.Pointer): void
    {
        this.onInputDown.dispatch(LaneConverter.SCREENPOSITION_TO_LANE(this.game, pointer.position.x, pointer.position.y));
    }

    public destroy(): void
    {
        this.onInputDown.removeAll();
        this.onInputDown = null;
    }

}
