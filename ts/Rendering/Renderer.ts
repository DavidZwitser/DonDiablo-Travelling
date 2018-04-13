/** An abstract model for a renderer */
export default abstract class Renderer<T>
{
    /** The sprites the renderer is rendering */
    protected sprites: T[];

    /* Apply the trensformations to the sprites and 'render' them */
    public abstract render(): void;

    /** Add a new child to the renderer */
    public addSprite(child: T): void
    {
        //
    }

    /** Remove a child from the renderer */
    public removeChild(child: T): void
    {
        //
    }
}
