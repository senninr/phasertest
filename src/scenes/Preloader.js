import { Scene } from 'phaser';

const delay = (ms) => new Promise((resolve)=> setTimeout(resolve, ms));
export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        const background = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'background');
        background.displayWidth = this.sys.game.config.width;
        background.displayHeight = this.sys.game.config.height;
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        // var viewport = this.scene.scale.getViewPort();
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);
        const newText = this.add.text(512, 384, `${this.sys.game.config.width} ${this.sys.game.config.height} `, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
        });
        this.scale.on('resize', (gameSize) => {
            background.displayWidth = gameSize.width;
            background.displayHeight = gameSize.height;
            background.setX(gameSize.width/2);
            background.setY(gameSize.height/2);
            newText.setText(`${gameSize.width} ${gameSize.height} `);
        });

        
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        const logo = this.load.image('logo', 'logo.png');
        
    }

    create ()
    {
        const texture = this.textures.get('logo');
    const width = texture.getSourceImage().width;
    const height = texture.getSourceImage().height;
        console.log(width);
        console.log(height);
        this.add.image(250,54, 'logo');
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        // this.scene.start('MainMenu');
    }
}
