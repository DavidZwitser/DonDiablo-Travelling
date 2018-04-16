import 'phaser-ce';

/** An abstract model for a renderer */
export default abstract class Renderer<T extends Phaser.Group> extends Phaser.Group
{
    /** The sprites the renderer is rendering */
    protected objects: T[];

    /* Apply the trensformations to the sprites and 'render' them */
    public abstract render(): void;

    private forEachObject(callback: (child: T, i: number) => void): void
    {
        for (let i: number = this.objects.length; i--; )
        {
            callback(this.objects[i], i);
        }
    }

    /** Add a new child to the renderer, returns if the sprite was already added */
    public addSprite(child: T): boolean
    {
        /* Checking if it is already added */
        let alreadyExists: boolean = false;
        this.forEach((sprite: T) => {
            if (child === sprite) { alreadyExists = true; }
        });

        /* Sprite was already added */
        if (alreadyExists) { return true; }

        /* Adding the sprite */
        this.objects.push(child);
        this.addChild(child);

        return false;
    }

    /** Remove a child from the renderer */
    public removeSprite(child: T): void
    {
        //
    }
}
