import 'phaser-ce';
import PerspectiveObject from '../Rendering/Sprites/PerspectiveObject';

/** Spawns pickups */
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
            //reset call can be done here.
            object.visible = true;
        }
        else
        {
            console.error('POOL GIVING NOTHING');
        }

        return object;
    }

    public wipe(): void
    {
        for (let i: number = this._objects.length; i--; )
        {
            this._objects[i].destroy(true);
            this._objects[i] = null;
        }
        this._objects = [];
    }

    public destroy(): void
    {
        this.wipe();
        this._objects = null;

        this._createInstance = null;
    }
}
