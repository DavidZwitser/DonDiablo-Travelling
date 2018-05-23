import 'phaser-ce';
import BasePopUp from './BasePopUp';
import AtlasImages from '../../../../Data/AtlasImages';
import TextButton from './TextButton';

export default class PauseScreen extends BasePopUp
{
    /** The text that shows the highscore */
    private _continueGameButton: TextButton;
    private _sfxButton: TextButton;
    private _musicButton: TextButton;

    public onContinue: Phaser.Signal;
    
    constructor(game: Phaser.Game, scale: number, buttonOffset: number, spaceBetweenButtons: number, backgroundImage: string)
    {
        super(game, scale, buttonOffset, spaceBetweenButtons);

        this._continueGameButton = new TextButton(game, 0,  buttonOffset - spaceBetweenButtons * 2, 'Pausemenu_Button_Restart_and_Quit', 'Continue', this.continue, this, null);
        this._continueGameButton.anchor.set(0.5);
        this._continueGameButton.scale.set(scale);
        this.addChild(this._continueGameButton);

        this._sfxButton = new TextButton(game, - spaceBetweenButtons, buttonOffset +  spaceBetweenButtons, 'Pausemenu_Button_Restart_and_Quit', 'SFX', this.sfxToggle, this, null);
        this._sfxButton.anchor.set(0.5);
        this.addChild(this._sfxButton);
        this._sfxButton.scale.set(scale);

        this._musicButton = new TextButton(game, spaceBetweenButtons, buttonOffset + spaceBetweenButtons, 'ui_ingame_highscore_backdrop', 'M', this.musicToggle, this, null);
        this._musicButton.anchor.set(0.5);
        this.addChild(this._musicButton);
        this._musicButton.scale.set(scale);

        this.onContinue = new Phaser.Signal();
    }

    /** Update the highscore text */


    private continue(): void
    {
        this.visible = false;
        this.onContinue.dispatch();
    }

    private musicToggle(): void
    {
      //  Constants.PlayMusic = ! Constants.PlayMusic;
    }

    private sfxToggle(): void
    {
     //  Constants.PlaySoundEffects = ! Constants.PlaySoundEffects;
    }

    public destroy(): void
    {
        super.destroy();
    }

}
