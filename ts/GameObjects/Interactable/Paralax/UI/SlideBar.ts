import 'phaser-ce';

import Atlases from '../../../../Data/Atlases';

export default class SlideBar extends Phaser.Group
{
    /** The filled in part of the slider */
    private _scrollFill: Phaser.Sprite;
    /** The arrow image which you can click to drag */
    private _arrow: Phaser.Sprite;
    /** The backdrop where the value can slide in */
    private _scrollBackdrop: Phaser.Sprite;

    /* The scroll bar value which can ranges between 0 and 1 */
    public value: number = .5;

    constructor(game: Phaser.Game, startValue: number, updateCallback: Function)
    {
        super(game);

        /* Creating the back drop */
        this._scrollBackdrop = new Phaser.Sprite(this.game, 0, 0, Atlases.INTERFACE, 'Pausemenu_Slider_Balk');
        this._scrollBackdrop.anchor.set(.5);

        /* Creating the fill */
        this._scrollFill = new Phaser.Sprite(this.game, 0, 0, Atlases.INTERFACE, 'Pausemenu_Slider_Fill');
        this._scrollFill.x = -this._scrollBackdrop.width / 2 + ((this._scrollBackdrop.width - this._scrollFill.width) / 2);
        this._scrollFill.anchor.set(0, .5);

        /* Creating the arrow */
        this._arrow = new Phaser.Sprite(this.game, 0, 0, Atlases.INTERFACE, 'Pausemenu_slider_button');
        this._arrow.anchor.set(.5);

        /* Adding them to the world */
        this.addChild(this._scrollBackdrop);
        this.addChild(this._scrollFill);
        this.addChild(this._arrow);

        /* Setting up input */
        this._arrow.inputEnabled = true;
        this._arrow.input.enableDrag();
        this._arrow.input.allowVerticalDrag = false;
        this._arrow.input.boundsRect = new Phaser.Rectangle(-this._scrollBackdrop.width / 2, -this._arrow.height / 2, this._scrollBackdrop.width, this._arrow.height);

        /* Setting up events */
        this._arrow.events.onDragUpdate.add(this.updateFill.bind(this));
        this._arrow.events.onDragStop.add(updateCallback.bind(this));

        /* Setting the start value */
        this.changeToValue(startValue);
    }

    /** Updates the fill sprites width according to the position of the arrow */
    private updateFill(): void
    {
        this._scrollFill.width = this._arrow.x + this._scrollBackdrop.width / 2;
        this.value = Math.round(this._scrollFill.width / this._scrollBackdrop.width * 10) / 10;
    }

    /** Function to change the value of the scrollbar */
    public changeToValue(value: number): void
    {
        this._arrow.x = -this._scrollBackdrop.width / 2 + this._scrollBackdrop.width * value;
        this.updateFill();
    }

    public destroy(): void
    {
        super.destroy(true);

        if (this._scrollFill) { this._scrollFill.destroy(true); }
        this._scrollFill = null;

        if (this._arrow) { this._arrow.destroy(true); }
        this._arrow = null;

        if (this._scrollBackdrop) { this._scrollBackdrop.destroy(true); }
        this._scrollBackdrop = null;
    }
}
