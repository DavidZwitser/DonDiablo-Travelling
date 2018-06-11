import 'phaser-ce';
import PerspectiveObject from '../Rendering/Sprites/PerspectiveObject';

/** This holds perspectiveobjects in a list and instead of destroying/making them.
 * The pool reuses them to increase optimalisation.
 */
export default class ObjectPool
{
    private _objects: PerspectiveObject[];

    private _createInstance: () => PerspectiveObject;
    private _length: number;

    constructor(createInstanceFunction: () => PerspectiveObject, length: number = 5)
    {
        this._createInstance = createInstanceFunction;
        this._length = length;
        this._objects = [];
    }

    /**
     * Gets the object that is declared not in use (visible = false) and makes it active again.
     * Then it returns it to for additional adjustments like repositioning.
     * If no object is available, the object creates a new one if forced is set to true, if not it returns nothing.
     * @param forced
     */
    public getObject(forced: boolean = true): PerspectiveObject
    {
        let object: PerspectiveObject = null;

        for (let i: number = this._objects.length; i--; )
        {
            if (!this._objects[i].visible)
            {
                object = this._objects[i];
                break;
            }
        }

        if (object === null && (forced || this._objects.length < this._length))
        {
            object = this._createInstance();
            this._objects.push(object);
        }

        if (object !== null)
        {
            object.visible = true;
        }
        else
        {
            console.error('POOL GIVING NOTHING');
        }

        return object;
    }

    /** Wipes all the objects in the pool making the pool empty */
    public wipe(): void
    {
        for (let i: number = this._objects.length; i--; )
        {
            this._objects[i].destroy(true);
            this._objects[i] = null;
        }
        this._objects = [];
    }

    /** Destroys and wipes the pool. */
    public destroy(): void
    {
        this.wipe();
        this._objects = null;

        this._createInstance = null;
    }
}
