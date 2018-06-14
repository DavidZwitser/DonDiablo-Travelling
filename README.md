# Upside Don
![alt text](./assets/sprites/favicon.png)
![alt text](./assets/sprites/favicon.png)
![alt text](./assets/sprites/favicon.png)
![alt text](./assets/sprites/favicon.png)
![alt text](./assets/sprites/favicon.png)
![alt text](./assets/sprites/favicon.png)
###### snap je

## Introduction
Upside Don is an addition for the world of Don Diablo (Hexagonia).

The making of this project is powered by our finals of our game development study at MediacollegeAmsterdam. This game is made in colaboration with Bliksems! Dondersgoeie marketing.

## Gameplay summary
---
The  goal of Upside Don is to immerse you in the world of Don Diablo. We do this, by using his style and his songs and implementing his character: Hex. 

The goal of Upside Don is to get as high of a score as you can get. The difficulty of the game changes depending on how well you are playing.

In the game you are driving a car and can ride lanes. The game is rendered in pseudo 3d and has a maximum of 6 lanes to ride uppon. Don Diablo music will be played and pickups will be spawned on the rythem of the music occros one of the 6 lanes. The goal is to pickup the as much pickups as possible by clicking on the lanes you want to travel to and colliding with them. When you miss one, one of your lives will be taken away. Giving an extra tap when you collide with a pickup will give you extra score and will give you a live back.

There is a bar on the left of the game which will slowly fill over time. When filled, you will be rewarded with a hex part. This collection can be viewed in the hex menu, where you can click on each individual hex body part. This will open a new window displaying all its sub parts and if they are collected or not.

In the main menu, you can also choose which car style you want to play with.

## Interesting classes
---
One of the most interesting things of this game is the pseudo 3d rendering. In the end, this is quite simple and boils down to one simple formula. How we did this can be viewed in the PerspectiveRenderer class:
[PerspectiveRenderer.ts](https://github.com/kmopman/Travelling/blob/master/ts/Rendering/PerspectiveRenderer.ts)

Another interesting thing in the game are the moving buildings in the background. We make this happen by analysing the audio and using that data to change the scale of the buildings. How we do this can be seen in the AudioAnalyser class: [AudioAnalyser.ts](https://github.com/kmopman/Travelling/blob/master/ts/Systems/Sound/AudioAnalyser.ts)

Another class, which you don't necessarily notice while playin the game, but does help the game a lot, is the ObjectPool class. It works quite well and uses some nifty techniques: [ObjectPool.ts](https://github.com/kmopman/Travelling/blob/master/ts/Systems/ObjectPool.ts)

Lastly, we made a small class that fixes some typical html5 problems. Phaser filters didn't work on some phones, so we made a class which checks what type of gpu the device is using and filters out the once, the filters don't work on: [GPUChecker.ts](https://github.com/kmopman/Travelling/blob/master/ts/Systems/GPUChecker.ts)

## Credits
---
[David Zwitser](http://davidzwitser.com)

[Nathan Nieuwenhuizen](http://nathannieuwenhuizen.github.io)

[Sebastiaan Buwalda](https://www.youtube.com/channel/UCUUszITqtqrAu7n8sp873JQ)

[Ferry Elbaghdadi]()

https://github.com/nathannieuwenhuizen/webpack-boilerplate/blob/master/README.md
