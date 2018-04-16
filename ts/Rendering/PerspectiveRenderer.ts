import Renderer from './Renderer';
import PerspectiveObject from './Sprites/PerspectiveObject';

/** Renders sprites in a pseudo 3d way */
export default class PerspectiveRenderer extends Renderer<PerspectiveObject>
{
    public perspectiveSprites: PerspectiveObject[];
    /** Render the sprites in pseudo3d way */
    public render(): void
    {
        //
    }
}
