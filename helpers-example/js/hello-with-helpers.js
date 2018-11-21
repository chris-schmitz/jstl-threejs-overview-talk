// * This control switcher drives the buttons in the upper left of the window
// * It's not really necessary to the threejs code we're looking at so I
// * abstracted it to keep the demo file small and to the point.
import CameraControls from "./CameraControlSwitcher.js"

/**
 * ? ==================================================================================
 * ? Grabbing dimensions
 *
 * * We're going to do some crazy screen splitting with the renderer so we'll
 * * grab the dimensions and calculate the aspect ratio up top.
 *
 * * Note that in both this and the hello-js example I'm not adjusting the renderer
 * * when the window is resized. I left that out to keep the demo files simple and
 * * because it's covered in all of the threejs website's examples, but it is important
 * * to include in your threejs projects.
 *
 * ? https://threejs.org/docs/#api/en/cameras/PerspectiveCamera.updateProjectionMatrix
 * ? ==================================================================================
 */
let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight
let aspectRatio = SCREEN_WIDTH / SCREEN_HEIGHT

/**
 * ? ==================================================================================
 * ? Create the renderer
 *
 * * This is mostly the same as the previous example. The difference is that here we're
 * * setting `autoClear` to false (it defaults to true). The `autoClear` property tells
 * * the renderer to automatically clear out the previous content of the renderer
 * * before running it's current render task. We're going to use the same renderer to
 * * draw both sections of the split screen, so if we left `autoRender` set to true
 * * then we would draw the first half of the screen, delete it, and then draw the
 * * second half. We'll disable autoRender and clear the renderer manually at the top
 * * of our anmiation loop
 *
 * ? https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer.autoClear
 * ? ==================================================================================
 */
let renderer = new THREE.WebGLRenderer()
renderer.autoClear = false
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
document.body.appendChild(renderer.domElement)

/**
 * ? ==================================================================================
 * ? Create the scene and 3D object
 *
 * * This is the same conceptually as the hello demo so I'm not going to belaber the
 * * comment.
 * ? ==================================================================================
 */
const scene = new THREE.Scene()

let geometry = new THREE.BoxGeometry(10, 10, 10)
let material = new THREE.MeshNormalMaterial()
let box = new THREE.Mesh(geometry, material)

scene.add(box)

/**
 * ? ==================================================================================
 * ? Adding multiple cameras
 *
 * * This section isn't required for using helpers, but it does help give some visual
 * * context to the helpers for this demo and it provides a good example of how you can
 * * use multiple cameras to give a different kind of experience with a tool like
 * * threejs.
 * ? ==================================================================================
 */

// * First well create a camera that we'll use to give our typical user view into the experience. This camera
// * is "what the user will see".
let cameraOne = new THREE.PerspectiveCamera(
    60, // * setting our field of view
    aspectRatio * 0.5, // * Making sure our aspect ratio for this camera is half of the overall aspect ratio
    10, // * setting the near boundry
    50 // * setting the far boundry
)
cameraOne.position.z = 30 // * we want to move this camera back a bit relative to the origin so we can see our object

// * rather than doing a bunch of rotational math to figure out where the box is relative to our camera we can use
// * this _uuuuuulllltra_ helpful threejs helper method to point our camera to the given object. _very nice_
cameraOne.lookAt(box)

// * Now we're going to create a second camera that's going to be used as kind of a utility view. Really it's no
// * different from our first camera, but we're going to use it to kind of look over the user's shoulder to see what
// * they're looking at.
let cameraTwo = new THREE.PerspectiveCamera(90, aspectRatio * 0.5)

// * moving the camera to be a bit further back
cameraTwo.position.z = 50
cameraTwo.position.y = 50

// * and looking at the scene
cameraTwo.lookAt(scene.position)

/**
 * ? ==================================================================================
 * ? Setting up our camera controls
 *
 * * This is also pretty similar to what we were doing in the hello.js. The difference
 * * in this demo is that we're abstratcting some camera juggling to an external module
 * * because the juggling isn't really important to this demo.
 * ? ==================================================================================
 */
let controls = new THREE.OrbitControls(cameraOne)
CameraControls.begin(controls, cameraOne, cameraTwo)

/**
 * ? ==================================================================================
 * ? Adding helpers
 *
 * * Threejs provides a lot of really useful helpers to help visualize various aspects
 * * and objects of your three experience. Some helpers are attached to your objects
 * * (e.g. the camera helpers) while other are just added to the scene in general (e.g.
 * * the grid and axis helpers).
 *
 * ? https://threejs.org/docs/#api/en/helpers/AxesHelper
 * ? https://threejs.org/docs/#api/en/helpers/GridHelper
 * ? https://threejs.org/docs/#api/en/helpers/AxesHelper
 * ? ==================================================================================
 */

let cameraOneHelper = new THREE.CameraHelper(cameraOne)
scene.add(cameraOneHelper)

let gridHelper = new THREE.GridHelper(50, 10)
scene.add(gridHelper)

let axesHelper = new THREE.AxesHelper(30)
scene.add(axesHelper)

function animate() {
    requestAnimationFrame(animate)
    box.rotation.x += 0.01
    box.rotation.y += 0.01

    renderer.clear()

    cameraOneHelper.visible = false
    gridHelper.visible = false

    renderer.setViewport(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT)
    renderer.render(scene, cameraOne)

    cameraOneHelper.visible = true
    gridHelper.visible = true
    renderer.setViewport(
        SCREEN_WIDTH / 2, // * Start half way across the screen horizontally
        0, // * start at the top of the screen
        SCREEN_WIDTH / 2, // * your draw width is half of the entire screen width
        SCREEN_HEIGHT // * your draw height is the entire screen height
    )

    renderer.render(scene, cameraTwo)
}

animate()