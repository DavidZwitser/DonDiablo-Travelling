import 'phaser-ce';

/** An abstract model for a renderer */
export default abstract class Renderer<T extends Phaser.Group> extends Phaser.Group
{
    /** The sprites the renderer is rendering */
    protected objects: T[];

    /* Apply the trensformations to the sprites and 'render' them */
    public abstract render(): void;

    constructor(game: Phaser.Game)
    {
        super(game);
        this.objects = [];
    }

    /** Loop through each object */
    protected forEachObject(callback: (child: T, i: number) => void, context?: any): void
    {
        for (let i: number = this.objects.length; i--; )
        {
            if (context)
            {
                callback.bind(context)(this.objects[i], i);
            }
            else
            {
                callback(this.objects[i], i);
            }

        }
    }

    /** Add a new child to the renderer, returns if the sprite was already added */
    public addObject(child: T): boolean
    {
        /* Checking if it is already added */
        let alreadyExists: boolean = false;
        this.forEachObject((object: T) => {
            if (child === object) { alreadyExists = true; }
        });

        /* Sprite was already added */
        if (alreadyExists) { return true; }

        /* Adding the sprite */
        this.objects.push(child);
        this.addChild(child);

        return false;
    }

    /** Remove a child from the renderer, returns if the object was a child */
    public removeObject(child: T): boolean
    {
        let wasAChild: boolean = false;

        this.forEachObject((object: T, i: number) => {
            if (child === object)
            {
                this.objects[i].destroy(true);
                this.objects.splice(i, 1);

                wasAChild = true;
            }
        });

        return wasAChild;
    }
}
