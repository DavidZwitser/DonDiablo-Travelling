import 'phaser-ce';

import IGame from '../PluginManagers/IGame';
import EditorEmitter from '../Editor/emitter';

/**
 * The particle editor state, where phaser particles can more easilly be made by artists
 */
export default class Test extends Phaser.State
{
    public static Name: string = 'test';

    public name: string = Test.Name;
    public game: IGame;

    public emitter: EditorEmitter;
    public testButton: any;

    constructor()
    {
        super();
    }

    public init(): void
    {
        document.getElementById('editor').style.display = 'block';
    }

    public create(): void
    {
        super.create(this.game);

        this.emitter = new EditorEmitter(this.game, this.game.width / 2, this.game.height / 2);

        this.testButton = document.getElementById('test');
        document.addEventListener('keydown', () => {
            requestAnimationFrame(() => {
                this.testParticle(false);
            });
        });
        document.addEventListener('click', () => {
            requestAnimationFrame(() => {
                this.testParticle(false);
            });
        });
        this.testButton.addEventListener('click', () => {
            this.testParticle(true);
        });

        this.asignParticle();

        this.testParticle(false);

    }

    public asignParticle(): void {
        if (Test.data === null) {

            Test.data = {
                gravity: 0,
                alphamin: 1,
                alphamax: -1,
                alpharate: 1000,
                scalemin: 0,
                scalemax: 3,
                scaleRate: 2000,
                minrotation: 0,
                maxrotation: 0,
                minXSpeed: -200,
                minYSpeed: -1000,
                maxXSpeed: 200,
                maxYSpeed: 100,
                explode: false,
                lifespan: 2000,
                freq: 100,
                width: 0,
                height: 0,
                spriteName: 'icon',
                maxParticles: 20,
                spritesheet: false,
                spriteSheetFPS: 24,
                spriteSheetLoop: false,
                followMouse: false
            };
        }

        this.emitter.editorValues = Test.data;

        (<any>document.getElementById('gravity')).value = this.emitter.editorValues.gravity;
        (<any>document.getElementById('alphamin')).value = this.emitter.editorValues.alphamin;
        (<any>document.getElementById('alphamax')).value = this.emitter.editorValues.alphamax;
        (<any>document.getElementById('alpharate')).value = this.emitter.editorValues.alpharate;
        (<any>document.getElementById('scalemin')).value = this.emitter.editorValues.scalemin;
        (<any>document.getElementById('scalemax')).value = this.emitter.editorValues.scalemax;
        (<any>document.getElementById('scaleRate')).value = this.emitter.editorValues.scaleRate;
        (<any>document.getElementById('minrotation')).value = this.emitter.editorValues.minrotation;
        (<any>document.getElementById('maxrotation')).value = this.emitter.editorValues.maxrotation;
        (<any>document.getElementById('xMinSpeed')).value = this.emitter.editorValues.minXSpeed;
        (<any>document.getElementById('yMinSpeed')).value = this.emitter.editorValues.minYSpeed;
        (<any>document.getElementById('xMaxSpeed')).value = this.emitter.editorValues.maxXSpeed;
        (<any>document.getElementById('yMaxSpeed')).value = this.emitter.editorValues.maxYSpeed;
        (<any>document.getElementById('explode')).checked = this.emitter.editorValues.explode;
        (<any>document.getElementById('lifespan')).value = this.emitter.editorValues.lifespan;
        (<any>document.getElementById('freq')).value = this.emitter.editorValues.freq;
        (<any>document.getElementById('width')).value = this.emitter.editorValues.width;
        (<any>document.getElementById('height')).value = this.emitter.editorValues.height;
        (<any>document.getElementById('name')).value = this.emitter.editorValues.spriteName;
        (<any>document.getElementById('maxparticles')).value = this.emitter.editorValues.maxParticles;
        (<any>document.getElementById('spritesheet')).checked = this.emitter.editorValues.spriteSheet;
        (<any>document.getElementById('fps')).value = this.emitter.editorValues.spriteSheetFPS;
        (<any>document.getElementById('loop')).checked = this.emitter.editorValues.spriteSheetLoop;
        (<any>document.getElementById('mouse')).checked = this.emitter.editorValues.followMouse;
    }

    /** Regenerate the particle emitter, so the changed value can be tested */
    public testParticle(generateCode: boolean): void
    {
        this.emitter.destroy(true);
        this.emitter = null;
        this.emitter = new EditorEmitter(this.game, this.game.width / 2, this.game.height / 2);

        this.emitter.editorValues = {
            gravity: Math.round((<any>document.getElementById('gravity')).value),
            alphamin: Math.round((<any>document.getElementById('alphamin')).value),
            alphamax: Math.round((<any>document.getElementById('alphamax')).value),
            alpharate: (<any>document.getElementById('alpharate')).value > 0 ? Math.max((<any>document.getElementById('alpharate')).value, 100) : 0,
            scalemin: Math.round((<any>document.getElementById('scalemin')).value),
            scalemax: Math.round((<any>document.getElementById('scalemax')).value),
            scaleRate: (<any>document.getElementById('scaleRate')).value > 0 ? Math.max((<any>document.getElementById('scaleRate')).value, 100) : 0,
            minrotation: (<any>document.getElementById('minrotation')).value,
            maxrotation: (<any>document.getElementById('maxrotation')).value,
            minXSpeed: Math.round((<any>document.getElementById('xMinSpeed')).value),
            minYSpeed: Math.round((<any>document.getElementById('yMinSpeed')).value),
            maxXSpeed: Math.round((<any>document.getElementById('xMaxSpeed')).value),
            maxYSpeed: Math.round((<any>document.getElementById('yMaxSpeed')).value),
            explode: (<any>document.getElementById('explode')).checked,
            lifespan: (<any>document.getElementById('lifespan')).value,
            freq: Math.round((<any>document.getElementById('freq')).value),
            width: Math.round((<any>document.getElementById('width')).value),
            height: Math.round((<any>document.getElementById('height')).value),
            spriteName: (<any>document.getElementById('name')).value,
            maxParticles: (<any>document.getElementById('maxparticles')).value,
            spriteSheet: (<any>document.getElementById('spritesheet')).checked,
            spriteSheetFPS: Math.round((<any>document.getElementById('fps')).value),
            spriteSheetLoop: (<any>document.getElementById('loop')).checked,
            followMouse: (<any>document.getElementById('mouse')).checked
        };

        Test.data = this.emitter.editorValues;

        this.emitter.setUpEmitter();
        if (generateCode) {
            window.prompt('SEND TO DEV, ARTIEST! ;)', this.emitter.code);
        }

    }

    public update(): void
    {
        /** Makes the emitter follow the mouse when that options has been enabled */
        if (this.emitter.editorValues.followMouse) {
            this.emitter.emitX = this.game.input.activePointer.x;
            this.emitter.emitY = this.game.input.activePointer.y;
        }
    }

    public shutdown(): void
    {
        super.shutdown(this.game);

        //this._testSprite.destroy(true);
        //this._testSprite = null;

        if (this.emitter) { this.emitter.destroy(true); }
        this.emitter = null;

    }

    private static set data(data: any)
    {
        localStorage.setItem('peditor', JSON.stringify(data));
    }
    private static get data(): any
    {
        return JSON.parse(localStorage.getItem('peditor'));
    }

}
