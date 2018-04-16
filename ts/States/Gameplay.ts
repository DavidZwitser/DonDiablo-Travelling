import 'phaser-ce';

import MusicVisualizer from '../GameObjects/Environment/Paralax/MusicVisualizer';
import SoundManager from '../Systems/Sound/SoundManager';
import Sounds from '../Data/Sounds';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private worldMood: number;
    private audioVisualizer: MusicVisualizer;

    constructor()
    {
        super();
    }

    public init(): void {
        SoundManager.getInstance(this.game);
    }

    public create(): void
    {
        super.create(this.game);

        this.worldMood = this.worldMood;

        let text: any = this.game.add.text(0, 0, 'this is the gameplay state', {font: '50px',
        fill: '#fff',
        align: 'center'});
        console.log(text);

        this.audioVisualizer = new MusicVisualizer(this.game, 0, this.game.height, this.game.width, this.game.height / 2);
        this.game.add.existing(this.audioVisualizer);

        SoundManager.getInstance().playMusic(Sounds.testMusic);

    }

    public update(): void {
        this.audioVisualizer.render();
    }

    public resize(): void {
        this.audioVisualizer.y = this.game.height;
        console.log('resize');
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        this.audioVisualizer.destroy();
        this.audioVisualizer = null;
    }

}
