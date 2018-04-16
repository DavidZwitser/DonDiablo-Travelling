import ParalaxObject from '../../../../Rendering/Sprites/ParalaxObject';
import MusicVisualizer from '../../../Environment/Paralax/MusicVisualizer';

/** The user interface */
export default class UI extends ParalaxObject
{
    private pauseButton: Phaser.Button;
    private titleText: Phaser.Text;
    private visualizer: MusicVisualizer;
}
