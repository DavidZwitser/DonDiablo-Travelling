import 'phaser-ce';

import Images from '../Data/Images';
import Spines from '../Data/Spines';
import Renderer from '../Renderer/Renderer';

export default class Gameplay extends Phaser.State 
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private _renderer: Renderer;

    private _testSprite: Phaser.Sprite;

    constructor() 
    {
        super();
    }

    public create(): void
    {
        super.create(this.game);

        let text = this.game.add.text(0, 0, 'this is the gameplay state', {font: '50px',
        fill: '#fff',
        align: 'center'});

        this._renderer = new Renderer(this.game);
        this.game.add.existing(this._renderer);

        this.resize();
    }

    public update(): void
    {
        super.update(this.game);
    }

    public resize(): void
    {
        this._renderer.renderRoad();
    }

    public shutdown(): void 
    {
        super.shutdown(this.game);
    }

}