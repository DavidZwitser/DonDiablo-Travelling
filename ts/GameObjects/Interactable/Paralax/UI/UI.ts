import ParalaxObject from '../../../../Rendering/Sprites/ParalaxObject';
// import MusicVisualizer from '../../../Environment/Paralax/MusicVisualizer';

import ImageButton from './ImageButton';

/** The user interface */
export default class UI extends ParalaxObject
{
    private _pauseButton: ImageButton;
    // private _titleText: Phaser.Text;
    // private _visualizer: MusicVisualizer;

    public onPause: Phaser.Signal;

    constructor(game: Phaser.Game)
    {
        super(game);

        this.onPause = new Phaser.Signal();

        this.createPauseButton();
    }

    private createPauseButton(): void
{
    this._pauseButton = new ImageButton(this.game, this.game.width / 1.1, this.game.height / 2, 'ui_ingame_button_pause', 'ui_ingame_button_pause', () => {
        this.onPause.dispatch;
        console.log('button pressed');
    }, this);

    this.game.add.existing(this._pauseButton);
}
}
