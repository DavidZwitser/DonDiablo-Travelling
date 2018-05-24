import 'phaser-ce';
import Atlases from '../../Data/Atlases';
export default class WorldEmitter extends Phaser.Group {
    private upperEmitter: Phaser.Particles.Arcade.Emitter;
    private downerEmitter: Phaser.Particles.Arcade.Emitter;
    constructor(game: Phaser.Game) {
        super(game);
        this.upperEmitter = this.upEmitter();
        this.addChild(this.upperEmitter);
        this.downerEmitter = this.downEmitter();
        this.addChild(this.downerEmitter);
    }

    public pause(pause: boolean): void {
        this.upperEmitter.on = !pause;
        this.downerEmitter.on = !pause;
    }
    private upEmitter(): Phaser.Particles.Arcade.Emitter {
        let emitter: Phaser.Particles.Arcade.Emitter = new Phaser.Particles.Arcade.Emitter(this.game, 0, 0, 40);
        emitter.makeParticles(Atlases.Interface, 'test_particle');
        emitter.setXSpeed(-1500, 1500);
        emitter.setYSpeed(-500, -1000);
        emitter.setRotation(0, 0);
        emitter.setAlpha(-1, 1, 700);
        emitter.setScale(0, 3, 0, 3, 2000);
        emitter.gravity.y = -1000;
        emitter.start(false, 2000, 50);
        return emitter;
    }

    private downEmitter(): Phaser.Particles.Arcade.Emitter {
        let emitter: Phaser.Particles.Arcade.Emitter = new Phaser.Particles.Arcade.Emitter(this.game, 0, 0, 40);
        emitter.makeParticles(Atlases.Interface, 'test_particle');
        emitter.setXSpeed(-1500, 1500);
        emitter.setYSpeed(500, 1000);
        emitter.setRotation(0, 0);
        emitter.setAlpha(-1, 1, 700);
        emitter.setScale(0, 3, 0, 3, 2000);
        emitter.gravity.y = 1000;
        emitter.start(false, 2000, 50);
        return emitter;
    }
}
