import 'phaser-ce';

//import Atlases from '../../../../Data/Atlases';
import ImageButton from './ImageButton';
import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';
import SaveData from '../../../../BackEnd/SaveData';
import Constants from '../../../../Data/Constants';

export default class VehicleSelect extends Phaser.Group
{
    private background: Phaser.Sprite;
    private vehicleSelectGroup: Phaser.Group;
    private closeButton: ImageButton;
    private headerText: Phaser.BitmapText;

    //text
    private carText: Phaser.BitmapText;
    private descriptionText: Phaser.BitmapText;

    //backdrops
    private middleBackdrop: Phaser.Sprite;
    private leftBackdrop: Phaser.Sprite;
    private rightBackdrop: Phaser.Sprite;

    //arrows
    private leftArrow: ImageButton;
    private rightArrow: ImageButton;

    //car sprites
    private selectedCarSprite: Phaser.Sprite;
    private leftCarSprite: Phaser.Sprite;
    private rightCarSprite: Phaser.Sprite;

    private carIndex: number = 0;

    constructor(game: Phaser.Game, callback: Function)
    {
        super(game);

        this.background = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'UserInterface_Credits_Background');
        this.background.anchor.set(.5);

        this.closeButton = new ImageButton(this.game, -228, 475, AtlasImages.Exit_Button, 'UserInterface_Menu_ContinueButton', () => {
            callback();
        }, this);
        this.closeButton.scale.x = -1;

        this.headerText =  new Phaser.BitmapText(game, 0, -510, 'myfont', 'VEHICLE SELECT', 60);
        this.headerText.tint = 0xffffff;
        this.headerText.anchor.set(.5);
        this.addChild(this.headerText);

        this.carText =  new Phaser.BitmapText(game, 0, -280, 'myfont', 'car text', 50);
        this.carText.tint = 0xffffff;
        this.carText.anchor.set(.5);
        this.addChild(this.carText);

        this.descriptionText =  new Phaser.BitmapText(game, 0, -200, 'myfont', 'description text', 30);
        this.descriptionText.tint = 0xffffff;
        this.descriptionText.align = 'center';
        this.descriptionText.anchor.set(.5);
        this.addChild(this.descriptionText);

        this.vehicleSelectGroup = new Phaser.Group(game);
        this.vehicleSelectGroup.x = 10;
        this.vehicleSelectGroup.y = 100;

        this.middleBackdrop = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'ui_middle_hexagon');
        this.middleBackdrop.anchor.set(.5);
        this.leftBackdrop = new Phaser.Sprite(game, -200, 85, Atlases.Interface, 'hexagon_small_left');
        this.leftBackdrop.anchor.set(.5);
        this.rightBackdrop = new Phaser.Sprite(game, 200, 85, Atlases.Interface, 'hexagon_small_right');
        this.rightBackdrop.anchor.set(.5);

        this.selectedCarSprite = new Phaser.Sprite(game, -23, -70, Atlases.Interface, 'Spacecraft_Main');
        this.selectedCarSprite.anchor.set(.5);
        this.selectedCarSprite.scale.set(1.5);

        this.leftCarSprite = new Phaser.Sprite(game, -225, 70, Atlases.Interface, 'Spacecraft_Main');
        this.leftCarSprite.anchor.set(.5);
        this.leftCarSprite.tint = 0x222222;

        this.rightCarSprite = new Phaser.Sprite(game, 185, 70, Atlases.Interface, 'Spacecraft_Main');
        this.rightCarSprite.anchor.set(.5);
        this.rightCarSprite.tint = 0x222222;

        this.leftArrow = new ImageButton(game, -250, -70, 'ui_pijltje',  'ui_pijltje', () => {
            this.moveVehicleTo(false);
        }, this);
        this.leftArrow.anchor.set(.5);

        this.rightArrow = new ImageButton(game, 220, -70, 'ui_pijltje', 'ui_pijltje', () => {
            this.moveVehicleTo(true);
        }, this);
        this.rightArrow.anchor.set(.5);
        this.rightArrow.scale.x = -1;

        this.addChild(this.background);
        this.addChild(this.closeButton);
        this.addChild(this.headerText);
        this.addChild(this.carText);
        this.addChild(this.descriptionText);
        this.addChild(this.vehicleSelectGroup);

        this.vehicleSelectGroup.addChild(this.leftBackdrop);
        this.vehicleSelectGroup.addChild(this.leftCarSprite);

        this.vehicleSelectGroup.addChild(this.rightBackdrop);
        this.vehicleSelectGroup.addChild(this.rightCarSprite);

        this.vehicleSelectGroup.addChild(this.middleBackdrop);
        this.vehicleSelectGroup.addChild(this.selectedCarSprite);
        this.vehicleSelectGroup.addChild(this.leftArrow);
        this.vehicleSelectGroup.addChild(this.rightArrow);

        this.vehicleSelectGroup.scale.set(.85);

        this.carIndex = SaveData.SelectedCar;
        this.updateSrites();

    }
    private moveVehicleTo(left: boolean): void {
        this.carIndex = (this.carIndex + (left ? -1 : 1) + Constants.CARS.length) % Constants.CARS.length;
        SaveData.SelectedCar = this.carIndex;
        this.updateSrites();
    }
    private updateSrites(): void {
        this.selectedCarSprite.frameName = Constants.CARS[this.carIndex].spriteKey;
        this.leftCarSprite.frameName = Constants.CARS[(this.carIndex + 1 + Constants.CARS.length) % Constants.CARS.length].spriteKey;
        this.rightCarSprite.frameName = Constants.CARS[(this.carIndex - 1 + Constants.CARS.length) % Constants.CARS.length].spriteKey;

        this.carText.text = '' + Constants.CARS[this.carIndex].carName;
        this.descriptionText.text = '' + Constants.CARS[this.carIndex].description;
    }

}
