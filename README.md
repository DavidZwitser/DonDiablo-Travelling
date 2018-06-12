# Upside Don
![alt text](./assets/)

## General information

## Interesting classes

## Gameplay summary
A boilerplate for using [Phaser](https://phaser.io/) with [Typescript](https://www.typescriptlang.org/) and [Sass](https://sass-lang.com/). Powering the task handling is [WebPack](https://webpack.js.org/).

The purpose of this framework is to make the development procces of html5 Phaser games easier and faster.
It's setup as a fundement for an GameDevelopment exam project.

## Getting started
After the project is cloned into a local repository you need to install the needed packages defined in the package.json.
Those packages are the necessary software programs needed for the deevelopment enviroment.

This is done by running:
```
npm i
```
This will go through all the packeges defined in the package.json and install them.

### Development
To run the project for testing: 
```
npm run dev
```
This will start WebPack which in it's turn will fire a series of tasks.
A browser-tab will be opened at localhost:3000 where the game will be ran.
Testing the game on a phone can be done by searching for your ip:
```
windows: ipconfig
mac/linux: ifconfig
```
finding your 'inet' ip, adding :3000 to it and typing this in your browser on your phone.
Asuming you are on the same network, your project should now run on your phone.

### Production
When the project is ready to release, you can make a "as small as possible" version of the project by running:
```
npm run dist
```
The files are located in:
```
builds/dist
```

## Code
To start coding it is good to know how the project is structured.

### Typescript
All the Typescript code will be located in the 'ts' folder. The initial file that will be run is 'app.ts'.
``` 
ts/app.ts 
```
Here the game instance get's created, and the first stage will be start.
After this, the game will go trough the boot state. Here all the assets get preloaded.
Finally the Gameplay state starts. 
This is where you can start coding your game.
```
ts/States/Gameplay.ts
```

### Assets
Implementing assets is done by doing the following:
1. Add the assets to the source_assets folder.
2. Open the file corresponding to the type of assets you are implementing.
```
ts/Data
```
3. Add your asset like so: 
``` typescript
export default class Images 
{

    public static myAsset: string = 'assetFileName';

    public static list: string[] = [
        Images.myAsset
    ];
 
}
```
4. Now you can use the asset by using it's name
``` typescript

import Images from '../Data/Images';

this.game.add.sprite(
    300,
    300, 
    Images.myAsset
);

```

# Credits
A lot of the structure and ideas for this boilerplate are gained from the [OrangeGames boilerplate](https://github.com/orange-games/phaser-ts-boilerplate).

# Handy sources
* [Phaser documentation](https://phaser.io/docs/2.6.2/index)
* [Typescript documentation](https://www.typescriptlang.org/docs/home.html)
* [Sass documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
* [Webpack documentation](https://webpack.js.org/concepts/)
* [And ofcourse good'ol](http://google.com)