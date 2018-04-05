import Images from "../Data/Images";

export default class PerspectiveSprite extends Phaser.Sprite
{
    public zPos: number;

    constructor(game: Phaser.Game, z: number)
    {
        super(game, 0, 0, Images.IconTest);
        this.zPos = z;
    }

}