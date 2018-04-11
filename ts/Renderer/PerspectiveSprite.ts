import Images from "../Data/Images";

export default class PerspectiveSprite extends Phaser.Sprite
{
    public zPos: number;
    public xPos: number
    public scaleMultiplier: number;

    constructor(game: Phaser.Game, z: number, x: number)
    {
        super(game, 0, 0, Images.IconTest);
        this.zPos = z;
        this.xPos = x;
        this.scaleMultiplier = 2;
    }   

}