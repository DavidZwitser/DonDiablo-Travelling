import 'phaser-ce';
import PerspectiveObject from '../Rendering/Sprites/PerspectiveObject';

/** Spawns pickups */
export default class ObjectPool
{
    public objects: PerspectiveObject[];

    private _createInstance: () => PerspectiveObject;
    private _length: number;

    constructor(createInstanceFunction: () => PerspectiveObject, length: number = 5)
    {
        this._createInstance = createInstanceFunction;
        this._length = length;
        this.objects = [];
    }

    public getObject(forced: boolean = true): PerspectiveObject
    {
        let object: PerspectiveObject = null;

        for (let i: number = this.objects.length; i--; )
        {
            if (!this.objects[i].visible)
            {
                object = this.objects[i];
                break;
            }
        }

        if (object === null && (forced || this.objects.length < this._length))
        {
            object = this._createInstance();
            this.objects.push(object);
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
        for (let i: number = this.objects.length; i--; )
        {
            this.objects[i].destroy(true);
            this.objects[i] = null;
        }
        this.objects = [];
    }

    public destroy(): void
    {
        this.wipe();
        this.objects = null;

        this._createInstance = null;
    }
}
