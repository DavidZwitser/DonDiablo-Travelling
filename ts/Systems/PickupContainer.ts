import Pickup from '../GameObjects/Interactable/Perspective/Pickup';

/** A class which is a group where all the pickups are contained in and which has functionality for changing something with them */
export default class PickupContianer extends Phaser.Group
{
    private _pickups: Pickup[];

    constructor(game: Phaser.Game)
    {
        super( game);
        this._pickups = [];
    }

    public addPickup(pickup: Pickup): void
    {
        this._pickups.push(pickup);
        this.addChild(pickup);
    }

    public removePickup(pickup: Pickup): void
    {
        this.forEach( (currentPickup: Pickup, index: number) => {
            if (currentPickup === pickup)
            {
                this.removeChild(currentPickup);
                this._pickups.splice(index, 1);
            }
        });
    }

    public forEach(callback: (pickup: Pickup, index: number) => void): void
    {
        for (let i: number = this._pickups.length; i--; )
        {
            callback(this._pickups[i], i);
        }
    }

    /** Reposition all the pickups, so they get alligned well after a road is added. */
    public reposition(): void
    {
        this.forEach( (pickup: Pickup) => {
            pickup.reposition();
        });
    }

    /** Make all the pickups call their react method */
    public makeAllPickupsReact(): void
    {
        this.forEach( (pickup: Pickup) => {
            pickup.react();
        });
    }

    public destroy(): void
    {
        this.forEach( (pickup: Pickup, index: number) => {
            this.removeChild(pickup);
            this._pickups.splice(index, 1);
        });
    }

}
