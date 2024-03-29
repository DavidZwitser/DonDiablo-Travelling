import 'phaser-ce';

import SaveData from './BackEnd/SaveData';

import Boot from './States/Boot';
import Menu from './States/Menu';
import Test from './States/Test';
import Gameplay from './States/Gameplay';
import Preload from './States/Preload';

import GPUChecker from './Systems/GPUChecker';

namespace WebPackGame
{
    export class Game extends Phaser.Game
    {
        constructor()
        {
            // Game settings
            super(<Phaser.IGameConfig>{
                enableDebug: false,
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
                renderer: Phaser.AUTO,
                parent: 'content',
                // transparent: true,
                antialias: true,
                preserveDrawingBuffer: false
            });
            this.clearBeforeRender = false;

            SaveData.INIT();

            this.state.add('game', {
                create: this.stateCreator.bind(this),
                preload: this.statePreloader.bind(this)
            }, true);
        }

        private statePreloader(): void
        {
            GPUChecker.CHECK_AND_APPLY_GPU_SETTINGS(this);

            // libs.forEach((library: string) => {
            //     this.load.script(library, library);
            // });
        }

        /** Adds all the states and starts the first one */
        private stateCreator(): void
        {
            //Here we load all the plugins
            this.plugins.add(PhaserSpine.SpinePlugin);

            // Add the states here
            this.state.add(Boot.Name, Boot, false);
            this.state.add(Menu.Name, Menu, false);
            this.state.add(Test.Name, Test, false);
            this.state.add(Preload.Name, Preload, false);
            this.state.add(Gameplay.Name, Gameplay, false);

            // Starting the first state
            this.state.start(Boot.Name);
            this.state.remove('game');
        }
    }
}

// Creating a game instance
// It'll be in the global scope and will have no reference
new WebPackGame.Game();
