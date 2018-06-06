import 'phaser-ce';

//import Atlases from '../../../../Data/Atlases';
import ImageButton from './ImageButton';
import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';
import SaveData from '../../../../BackEnd/SaveData';
import Constants from '../../../../Data/Constants';

/** The vehicle select menu where you can select which car you want to play with */
export default class VehicleSelect extends Phaser.Group
{
    /** The background */
    private _background: Phaser.Sprite;
    /** The group where the car and navigation images are added to */
    private _vehicleSelectGroup: Phaser.Group;
    /** The button for closing the menu */
    private _closeButton: ImageButton;
    /** The text on the top ofe window */
    private _headerText: Phaser.BitmapText;

    /** The text displaying the name of the current car */
    private _carName: Phaser.BitmapText;
    /** The text describing what makes this car unique */
    private _descriptionText: Phaser.BitmapText;

    /** Backdrop image for center car */
    private _middleBackdrop: Phaser.Sprite;
    /** Backdrop imager for the left car */
    private _leftBackdrop: Phaser.Sprite;
    /** Backrop image for the right car */
    private _rightBackdrop: Phaser.Sprite;

    /** The button for rotating the car selection wheel to the left */
    private _leftArrow: ImageButton;
    /** The button for rotating the car selection wheel to the right */
    private _rightArrow: ImageButton;

    /** The image of the center car */
    private _selectedCarSprite: Phaser.Sprite;
    /** The image of the left car */
    private _leftCarSprite: Phaser.Sprite;
    /** The image of the right car */
    private _rightCarSprite: Phaser.Sprite;

    /** What car is currently selected */
    private _carIndex: number = 0;

    constructor(game: Phaser.Game, callback: Function)
    {
        super(game);

        /* Setting up the background */
        this._background = new Phaser.Sprite(game, 0, 0, Atlases.INTERFACE, 'UserInterface_Credits_Background');
        this._background.anchor.set(.5);

        /* Setting up the close button */
        this._closeButton = new ImageButton(this.game, -228, 475, AtlasImages.EXIT_BUTTON, 'UserInterface_Menu_ContinueButton', () => {
            callback();
        }, this);
        this._closeButton.scale.x = -1;

        /* Setting up the header text */
        this._headerText =  new Phaser.BitmapText(game, 0, -510, 'ailerons', 'VEHICLE SELECT', 60);
        this._headerText.tint = 0xffffff;
        this._headerText.anchor.set(.5);
        this.addChild(this._headerText);

        /* Setting up the car name text */
        this._carName =  new Phaser.BitmapText(game, 0, -280, 'futura', 'car text', 50);
        this._carName.tint = 0xffffff;
        this._carName.anchor.set(.5);
        this.addChild(this._carName);

        /* Setting up the description text */
        this._descriptionText =  new Phaser.BitmapText(game, 0, -200, 'futura', 'description text', 30);
        this._descriptionText.tint = 0xffffff;
        this._descriptionText.align = 'center';
        this._descriptionText.anchor.set(.5);
        this.addChild(this._descriptionText);

        /* Setting up the vehicle select group */
        this._vehicleSelectGroup = new Phaser.Group(game);
        this._vehicleSelectGroup.x = 10;
        this._vehicleSelectGroup.y = 100;

        /* Setting up the middle selection sprite backdrop */
        this._middleBackdrop = new Phaser.Sprite(game, 0, 0, Atlases.INTERFACE, 'ui_middle_hexagon');
        this._middleBackdrop.anchor.set(.5);
        /* Setting up the left selection sprite backdrop */
        this._leftBackdrop = new Phaser.Sprite(game, -200, 85, Atlases.INTERFACE, 'hexagon_small_left');
        this._leftBackdrop.anchor.set(.5);
        /* Setting up the right selection sprite backdrop */
        this._rightBackdrop = new Phaser.Sprite(game, 200, 85, Atlases.INTERFACE, 'hexagon_small_right');
        this._rightBackdrop.anchor.set(.5);

        /* Setting up the sprite which displayes the middle car */
        this._selectedCarSprite = new Phaser.Sprite(game, -23, -70, Atlases.INTERFACE, '');
        this._selectedCarSprite.anchor.set(.5);
        this._selectedCarSprite.scale.set(1.5);

        /* Setting up the sprite which displays the left car */
        this._leftCarSprite = new Phaser.Sprite(game, -225, 70, Atlases.INTERFACE, '');
        this._leftCarSprite.anchor.set(.5);
        this._leftCarSprite.tint = 0x222222;

        /* Setting up the sprite which displays the right car */
        this._rightCarSprite = new Phaser.Sprite(game, 185, 70, Atlases.INTERFACE, '');
        this._rightCarSprite.anchor.set(.5);
        this._rightCarSprite.tint = 0x222222;

        /* Setting up the left arrow */
        this._leftArrow = new ImageButton(game, -250, -70, 'ui_pijltje',  'ui_pijltje', () => {
            this.rotateVehicleWheel(false);
        }, this);
        this._leftArrow.anchor.set(.5);

        /* Setting up the right arrow */
        this._rightArrow = new ImageButton(game, 220, -70, 'ui_pijltje', 'ui_pijltje', () => {
            this.rotateVehicleWheel(true);
        }, this);
        this._rightArrow.anchor.set(.5);
        this._rightArrow.scale.x = -1;

        /* Adding all the needed elements to this group */
        this.addChild(this._background);
        this.addChild(this._closeButton);
        this.addChild(this._headerText);
        this.addChild(this._carName);
        this.addChild(this._descriptionText);
        this.addChild(this._vehicleSelectGroup);

        /* Adding all the vehicle select elements to the vehicle select group */
        this._vehicleSelectGroup.addChild(this._leftBackdrop);
        this._vehicleSelectGroup.addChild(this._leftCarSprite);

        this._vehicleSelectGroup.addChild(this._rightBackdrop);
        this._vehicleSelectGroup.addChild(this._rightCarSprite);

        this._vehicleSelectGroup.addChild(this._middleBackdrop);
        this._vehicleSelectGroup.addChild(this._selectedCarSprite);
        this._vehicleSelectGroup.addChild(this._leftArrow);
        this._vehicleSelectGroup.addChild(this._rightArrow);

        /* Setting the group scale */
        this._vehicleSelectGroup.scale.set(.85);

        /* Setting the default value */
        this._carIndex = SaveData.SELECTED_CAR;
        this.updateSprites();

    }

    /** Move the vehicle selection wheel */
    private rotateVehicleWheel(left: boolean): void
    {
        this._carIndex = (this._carIndex + (left ? -1 : 1) + Constants.CARS.length) % Constants.CARS.length;
        SaveData.SELECTED_CAR = this._carIndex;

        this.updateSprites();
    }

    /** Update the car images to the currently correct images */
    private updateSprites(): void
    {
        /* Setting the frameNames */
        this._selectedCarSprite.frameName = Constants.CARS[this._carIndex].spriteKey;
        this._leftCarSprite.frameName = Constants.CARS[(this._carIndex + 1 + Constants.CARS.length) % Constants.CARS.length].spriteKey;
        this._rightCarSprite.frameName = Constants.CARS[(this._carIndex - 1 + Constants.CARS.length) % Constants.CARS.length].spriteKey;

        /* Setting the information texts */
        this._carName.text = '' + Constants.CARS[this._carIndex].carName;
        this._descriptionText.text = '' + Constants.CARS[this._carIndex].description;
    }

    public destroy(): void
    {
        super.destroy(true);

        /* Destroying the background */
        if (this._background) { this._background.destroy(true); }
        this._background = null;

        /* Destroying the vehicle select group */
        if (this._vehicleSelectGroup) { this._vehicleSelectGroup.destroy(true); }
        this._vehicleSelectGroup = null;

        /* Destroying close button */
        if (this._closeButton) { this._closeButton.destroy(); }
        this._closeButton = null;

        /* Destroying header text */
        if (this._headerText) { this._headerText.destroy(true); }
        this._headerText = null;

        /* Destroying car name text */
        if (this._carName) { this._carName.destroy(true); }
        this._carName = null;
        /* Destroying description text */
        if (this._descriptionText) { this._descriptionText.destroy(true); }
        this._descriptionText = null;

        /* Destroing the left backdrop */
        if (this._leftBackdrop) { this._leftBackdrop.destroy(true); }
        this._leftBackdrop = null;
        /* Destroying the center backdrop */
        if (this._middleBackdrop) { this._middleBackdrop.destroy(true); }
        this._middleBackdrop = null;
        /* Destroying the right backdrop */
        if (this._rightBackdrop) { this._rightBackdrop.destroy(true); }
        this._rightBackdrop = null;

        /* Destroying the left arrow button */
        if (this._leftArrow) { this._leftArrow.destroy(); }
        this._leftArrow = null;
        /* Destroying the right arrow button */
        if (this._rightArrow) { this._rightArrow.destroy(); }
        this._rightArrow = null;

        /* Destroying left car sprite */
        if (this._leftCarSprite) { this._leftCarSprite.destroy(true); }
        this._leftCarSprite = null;
        /* Destroying the selected car sprite */
        if (this._selectedCarSprite) { this._selectedCarSprite.destroy(true); }
        this._selectedCarSprite = null;
        /* Destroying the right car sprite */
        if (this._rightCarSprite) { this._rightCarSprite.destroy(true); }
        this._rightCarSprite = null;

    }

}
