import 'phaser-ce';
import ImageButton from './ImageButton';

export default class PauseButton extends Phaser.Group
{
 /** Pause Button
  *
  * This class takes care of the sprite of the pause button,
  * plus dispatching the signal after using it.
  */

    public onPause: Phaser.Signal;
    public pauseButton: ImageButton;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.onPause = new Phaser.Signal();

        this.pauseButton = new ImageButton(this.game, this.game.width / 1.075, this.game.height / 2, 'UserInterface_PauseHud_Backdrop', 'ui_ingame_button_pause', () => {
            this.onPause.dispatch();
        }, this);
        this.pauseButton.anchor.set(1, .5);
        this.pauseButton.icon.anchor.set(1, .5);

        this.game.add.existing(this.pauseButton);

        this.resize();
    }

    public resize(): void
    {
        let vmin: number = Math.min(this.game.width, this.game.height / 2);

        this.pauseButton.scale.set(vmin / GAME_WIDTH);
        this.pauseButton.position.set(this.game.width, this.game.height / 2);
    }
}
