import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        const background = this.load.image('background', 'assets/bg.png');
        // const logo = this.load.image('logo', 'assets/logo.png');
        // console.log(logo);
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
