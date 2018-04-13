import 'phaser-ce';

export default class Gameplay extends Phaser.State
{
    public static Name: string = 'gameplay';

    public name: string = Gameplay.Name;

    private worldMood: number;

    constructor()
    {
        super();
    }

    public resize(): void {
        console.log('resize');
    }

    public create(): void
    {
        super.create(this.game);

        let text: any = this.game.add.text(0, 0, 'this is the gameplay state', {font: '50px',
        fill: '#fff',
        align: 'center'});
        console.log(text);
    }

    public shutdown(): void
    {
        super.shutdown(this.game);
    }

}
