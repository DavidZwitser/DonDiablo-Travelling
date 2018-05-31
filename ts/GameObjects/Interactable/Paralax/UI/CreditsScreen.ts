import 'phaser-ce';
import ImageButton from '../UI/ImageButton';
import Atlases from '../../../../Data/Atlases';
import AtlasImages from '../../../../Data/AtlasImages';

export default class CreditsScreen extends Phaser.Group
{

    //lay out
    private creditsBackdrop: Phaser.Sprite;

    //text
    private headerText: Phaser.BitmapText;
    private creditsText: Phaser.BitmapText;

    //buttons
    private backButton: ImageButton;

    constructor(game: Phaser.Game, callback: Function)
    {
        super(game);

        this.creditsBackdrop = new Phaser.Sprite(game, 0, 0, Atlases.Interface, 'UserInterface_Credits_Background');
        this.creditsBackdrop.anchor.set(.5);
        this.addChild(this.creditsBackdrop);

        this.headerText =  new Phaser.BitmapText(game, 0, -510, 'myfont', 'Credits', 60);
        this.headerText.tint = 0xffffff;
        this.headerText.anchor.set(.5);
        this.addChild(this.headerText);

        this.creditsText =  new Phaser.BitmapText(game, 0, 0, 'myfont', '', 40);
        this.creditsText.tint = 0xffffff;
        this.creditsText.anchor.set(.5);
        this.addChild(this.creditsText);
        this.creditsText.text = 'Art Director\n Bo Schutte\n\nDigital Artists\n Jidske Donkersloot\n Amber Kalverboer\n Amber Huiskes\n Eva Vrieze\n\nProgramming Director' +
        '\n Ferry Elbagdadi\n\nProgramming\n Sebastiaan Buwalda\n Nathan Nieuwenhuizen\n David Zwitser';

        this.backButton = new ImageButton(this.game, -228, 475, AtlasImages.Exit_Button, 'UserInterface_Menu_ContinueButton', () => {
            callback();
        }, this);
        this.backButton.scale.x = -1;

        this.addChild(this.backButton);

        this.visible = false;
    }
}
