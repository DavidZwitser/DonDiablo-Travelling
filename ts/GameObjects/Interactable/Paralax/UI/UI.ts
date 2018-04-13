import ParalaxSprite from '../../../../Rendering/Sprites/ParalaxSprite';
import MusicVisualizer from '../../../Environment/Paralax/MusicVisualizer';

/** The user interface */
export default class UI extends ParalaxSprite
{
    private pauseButton: Phaser.Button;
    private titleText: Phaser.Text;
    private visualizer: MusicVisualizer;
}
