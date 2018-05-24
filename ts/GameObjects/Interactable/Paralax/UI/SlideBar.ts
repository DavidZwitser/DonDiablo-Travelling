import 'phaser-ce';

import Atlases from '../../../../Data/Atlases';

export default class SlideBar extends Phaser.Group
{
    //sprites
    private _scrollValue: Phaser.Sprite;
    private _arrow: Phaser.Sprite;
    private _scrollBackdrop: Phaser.Sprite;

    //value ranges between 0 and 1
    public value: number = .5;

    constructor(game: Phaser.Game, startValue: number, updateCallback: Function)
    {
        //declaring all the assets needed for the slidebar
        super(game);
        this._scrollBackdrop = new Phaser.Sprite(this.game, 0, 0, Atlases.Interface, 'Pausemenu_Slider_Balk');
        this._scrollBackdrop.anchor.set(.5);

        this._scrollValue = new Phaser.Sprite(this.game, 0, 0, Atlases.Interface, 'Pausemenu_Slider_Fill');
        this._scrollValue.x = -this._scrollBackdrop.width / 2 + ((this._scrollBackdrop.width - this._scrollValue.width) / 2);
        this._scrollValue.anchor.set(0, .5);

        this._arrow = new Phaser.Sprite(this.game, 0, 0, Atlases.Interface, 'Pausemenu_slider_button');
        this._arrow.anchor.set(.5);

        //adding them to the world
        this.addChild(this._scrollBackdrop);
        this.addChild(this._scrollValue);
        this.addChild(this._arrow);

        //arrow inputs setup
        this._arrow.inputEnabled = true;
        this._arrow.input.enableDrag();
        this._arrow.input.allowVerticalDrag = false;
        this._arrow.input.boundsRect = new Phaser.Rectangle(-this._scrollBackdrop.width / 2, -this._arrow.height / 2, this._scrollBackdrop.width, this._arrow.height);

        //slidebar events declared
        this._arrow.events.onDragUpdate.add(this.updateFill.bind(this));
        this._arrow.events.onDragStop.add(updateCallback.bind(this));

        //to have a setup value
        this.changeToValue(startValue);
    }

    //updates the fill sprites width according to the position of the arrow
    private updateFill(): void
    {
        this._scrollValue.width = this._arrow.x + this._scrollBackdrop.width / 2;
        this.value = Math.round(this._scrollValue.width / this._scrollBackdrop.width * 10) / 10;
    }

    //function to change the value of the scrollbar
    public changeToValue(value: number): void
    {
        this._arrow.x = -this._scrollBackdrop.width / 2 + this._scrollBackdrop.width * value;
        this.updateFill();
    }
}
