import Constants from '../Data/Constants';

export default class GPUChecker
{
    public static CHECK_AND_APPLY_GPU_SETTINGS(game: Phaser.Game): void
    {
        let gl: WebGLRenderingContext;

        try
        {
            gl = game.canvas.getContext('webgl') || game.canvas.getContext('experimental-webgl');
        }
        catch (e)
        {
            console.log('no gl', e);
            return;
        }

        if (!gl) { return; }

        let debugInfo: WEBGL_debug_renderer_info = gl.getExtension('WEBGL_debug_renderer_info');
        let gpu: any = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

        /** Log the gpu used */
        // console.log('Using a: ', gpu);

        for (let i: number = Constants.GPU_SHADER_BLACKLIST.length; i--; )
        {
            if (Constants.GPU_SHADER_BLACKLIST[i] === gpu)
            {
                Constants.USE_FILTERS = false;
                return;
            }
        }

    }
}
