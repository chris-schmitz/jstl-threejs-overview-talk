# Threejs

# Intro slide

- Who I am

# I'm not a designer

- Specifically not a designer
- Showing really basic intros, but you can get very detailed

# What is it

At an ultra basic level, it's a library that makes working with WebGL easier.

# What is WebGL

WebGL is a javascript API implemented by all browsers for rendering interactive 2D and 3D graphics.

It allows you to access your computer's graphics hardware from your browser.

# Why do 3D in the browser vs native?

- Leverage existing web knowledge
- Easier delivery / Lower barrier to entry
- More accessible to average user
- Can be integrated into an greater web experience

# Note: Three.js can be used for 2D, but we'll be covering 3D

- Threejs has 2D renderers, but it's main focus is 3D
- There are lots of 2D alternatives
  - paper.js
  - Pixi.js
  - two.js
  - melon.js
  - etc

# Parts of a three.js experience

**NOTE** that the [three.js examples](https://threejs.org/examples) are a great way of learning about the parts.

- See a live example of the tool
- Link to source directly on example

## Scene

- Setup what will be rendered and where it's positioned
- Positioning is relative to scene origin
- Further grouping can be done via Groups

## Camera

### Frustum

- Used to determine what's in view of the camera
- Objects outside of the frustum aren't rendered (speeds up rendering)
  - Objects partially outside of frustum still rendered, stratagy
- ![](axis-and-frustrum.jpg)

## Creating 3D objects

- Geometry + material = Mesh

### Mesh

- These become the main objects that we interact with
- Mesh geometry can be ready made shapes via THREE helpers or constructed
- Mesh constituent parts can be edited after the fact

## renderer

- Converts 3D scene to 2D so we can put it on a screen
- Think of how taking a photograph works
- Different types of renderers available
- some of these renderers can be used as fallbacks for older browsers

## Animating

- [Request Animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame): a hook into the browser's repaint cycle - Note that request animation frame will pause itself when the user goes to another tab or window

# Basic demo

- Review index file
- Review annotated version of js
- Show unannotated to make it less intimidating

## browser support

https://threejs.org/docs/#manual/en/introduction/Browser-support

## Dev tools

## Helpers

-

## A weird note about tooling

- Some of the tooling

## Orbit controls

## Mention recasting

# Devices

- Mobile vs desktop
- Know what devices you're going to be on
- Test frequently - Criteria1 - criteria2

## VR Headsets

- With an additional library called [StereoEffects](https://github.com/mrdoob/three.js/blob/master/examples/js/effects/StereoEffect.js) you can create a stereoscopic view to create a 3d experience
- [codepen demo](https://codepen.io/kyolee310/pen/bpeRmm)
- [PCVR](http://vr.pc1.fun/)

## WebVR

- [A javascript API that supports virtual reality devices and cell phones]()
- Goals: - Detect available Virtual Reality devices. - Query the devices capabilities. - Poll the device’s position and orientation. - Display imagery on the device at the appropriate frame rate.
- WebVR handles the controls; the 3D experience can be built with three.js (or alternatives)

## Snags we ran into

- Performance on phones - Less on three.js, more on the video content we tried to use
- Dynamic fonts in VR - [outline of a good approach from google](https://developers.google.com/web/showcase/2017/within)
- Dev cycle in WebVR - Again, less three and more building a web experience in the oculus go - [screen mirroring tool vysor](https://www.vysor.io/)

# Examples

- [ddance party](https://dddance.party/)
- [cassini's grand tour](https://www.nationalgeographic.com/science/2017/09/cassini-saturn-nasa-3d-grand-tour/)
- [star tour](http://stars.chromeexperiments.com/)
- [cube slam](https://www.cubeslam.com/lrevyq)
- Paradowski tour: http://vr.pc1.fun/
- Graybar vid

# Alternatives and complements

- [babylon js ](https://www.babylonjs.com/)
- [paper js(2D)](http://paperjs.org/)
- [playcanvas](https://playcanvas.com/)
- [aframe](https://aframe.io/)

# Further exploration

- [three's website](https://threejs.org/)
- [three's examples](https://threejs.org/examples/)
- [an introduction to three.js](https://humaan.com/blog/web-3d-graphics-using-three-js/)
