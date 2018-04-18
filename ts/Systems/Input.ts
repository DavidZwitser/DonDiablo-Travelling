import 'phaser-ce';

import {Lanes} from '../Enums/Lanes';
//** Handles reading input */
export default class Input
{
    public game: Phaser.Game;

    public onInputDown: Phaser.Signal;
    private tappedAboveHorizon: boolean = false;
    private laneSelection: number = 1;

    /** how to use it!
     *  this.inputy = new Input(this.game);this.inputy.onInputDown.add((r: Lanes) => {console.log(r);});
     */

    constructor(game: Phaser.Game)
    {
        this.game = game;

        this.onInputDown = new Phaser.Signal();
        this.game.input.onDown.add(() => this.inputDown());
    }

    private inputDown(): void
    {
        this.onInputDown.dispatch(this.laneReturner());
    }

    private aboveHorizonTapCheck(): boolean
    {
        if (this.game.input.y > this.game.height / 2)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    private whatLaneCheck(): number
    {
        if (this.game.input.x < this.game.width / 3 )
        {
            return 1;
        }
        else if (this.game.input.x < (this.game.width / 3) * 2 )
        {
            return 2;
        }
        else
        {
            return 3;
        }

    }

    private laneReturner(): Lanes
    {
        if (this.aboveHorizonTapCheck())
        {
            switch (this.whatLaneCheck())
            {
            default: {
                return null;
            }
            case 1: {
                return Lanes.topLeftLane;
            }

            case 2: {
                return Lanes.topMiddleLane;
            }

            case 3: {
                return Lanes.topRightLane;
            }

            }
        }
        else
        {
            switch (this.whatLaneCheck())
            {
            default: {
                return null;
            }
            case 1: {
                return Lanes.bottomLeftLane;
            }

            case 2: {
                return Lanes.bottomMiddleLane;
            }

            case 3: {
                return Lanes.bottomRightLane;
            }

            }
        }
    }

    public destroy(): void
    {
        this.onInputDown.removeAll();
        this.onInputDown = null;
    }

}
