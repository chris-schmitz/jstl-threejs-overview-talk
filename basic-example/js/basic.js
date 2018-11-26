/**
 * ? ==============================================================================
 * ? Simple Threejs breakdown
 *
 * * This is a bit of an expansion on the "Creating a Scene" section of
 * * the Threejs docs:
 * * https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
 *
 * * For really simple threejs applications taking a procedural approach like this
 * * is fine (and if writing js like this in more complex examples is your style
 * * then by all means do it), but as the application becomes more complex it's a
 * * good idea to start breaking parts out into classes and composing it all
 * * together.
 * ? ==============================================================================
 */

/**
 * ? ===========================================
 * ? Setting up the renderer
 *
 * * Here we're setting up the renderer that
 * * will create the canvas element that threejs
 * * uses and set the size/resolution of our
 * * output.
 *
 * ? https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer
 * ? ===========================================
 */

let renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight) // * setting the resolution for the canvas

// ! Check it out in the browser tools
// debugger
// console.log(renderer.domElement)

document.body.appendChild(
    renderer.domElement // * adding the <canvas> element that three's renderer creates
)


/**
 * ? ===========================================
 * ? Create the scene
 *
 * * The scene is a container that we use to
 * * hold all of the The stuff that we want to
 * * render. Items added to the scene are
 * * positioned relative to the scene origin.
 *
 * ? https://threejs.org/docs/index.html#api/en/scenes/Scene
 * ? ===========================================
 */
let scene =
    window.scene = // ! if you want to use the threejs dev tool you'll need to attach the scene to the window
    new THREE.Scene()

// * If you're going to use the three inspector it's a good idea to give the parts of the experience
// * names. They're not required, but it makes it considerably easier to identify entities in the dev tools.
scene.name = "demo-scene"


/**
 * ? ===========================================
 * ? Create a camera
 *
 * * The camera is our view into the scene. Here
 * * we are configuring the frustrum that the
 * * Camera will use to show us the scene.
 *
 * ? The perspective camera: https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
 * ? Camera example: https://threejs.org/examples/?q=camera#webgl_camera
 * ? The camera helper: https://threejs.org/docs/index.html#api/en/helpers/CameraHelper
 * ? ===========================================
 */
let camera = new THREE.PerspectiveCamera(
    75, // * field of view
    window.innerWidth / window.innerHeight, // * aspect ratio
    0.1, // * near clipping plane
    1000 // * far clipping plane
)


/**
 * ? ===========================================
 * ? Adding the 3D stuff!!
 *
 * * Now that we have our renderer, scene, and
 * * camera set up, we'll add some 3D objects.
 *
 * ! Note that you don't necessarily have to do
 * ! it in this order as it all gets knitted
 * ! together in the animation loop.
 *
 * * Creating simple 3D objects typically
 * * consists of 4 steps:
 * * 1. Create a geometry
 * * 2. Create a material used to shade
 * *    the geometry
 * * 3. Create a mesh that combines the geometry
 * *    and material
 * * 4. Add that mesh to the scene
 *
 * * Something important to note about this
 * * combination of objects is that they can be
 * * updated after creation, so you want to say,
 * * change the color of the
 *
 * ? Box geometry: https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
 * ? Mesh normal material: https://threejs.org/docs/index.html#api/en/materials/MeshNormalMaterial
 * ? Mesh: https://threejs.org/docs/index.html#api/en/objects/Mesh
 * ? ===========================================
 */

// * Create our 3D Object
let geometry = new THREE.BoxGeometry(1, 1, 1)
let material = new THREE.MeshNormalMaterial()
let cube = new THREE.Mesh(geometry, material)

cube.name = 'Box mesh' // * again, giving it a name isn't necessary, but it helps in the dev tools

// * Add that object to the scene
scene.add(cube)

// * Move the camera back on the Z axis so we can see it
camera.position.z = 5


/**
 * ! Note that at this point we have everything outside of
 * ! adding the animation loop to have a working scene. If
 * ! we didn't want to add controls the above plus an animation
 * ! loop would render a scene.
 *
 * * If you uncomment the anmiation loop below you can see the
 * * scene work without controls.
 **/
/*
function animate() {
    requestAnimationFrame(animate) // * javascript's requestAnimationFrame

    // * make our cube move!
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
}
animate()
*/

/**
 * ? ===========================================
 * ? Add controls
 *
 * * To make the scene interactive we need to
 * * give the user the ability to control the
 * * camera. In this case we'll create orbit
 * * controls and hook them onto the camera.
 * * The controls also exposes a dom element so
 * * we can hook event listeners onto that to
 * * capture click and tap events.
 *
 * ? Orbit controls docs: https://threejs.org/docs/index.html#examples/controls/OrbitControls
 * ? Orbit controls code that you'll need to pull in: https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js
 * ? Orbit controls example: https://threejs.org/examples/?q=orbit#misc_controls_orbit
 * ? ===========================================
 */
// * Create the actual control object
let controls = new THREE.OrbitControls(camera)

// * Adding click handlers so we can
let mouseDown = false
controls.domElement.addEventListener('mousedown', setMouseDown, false)
controls.domElement.addEventListener('mouseup', setMouseUp, false)

function setMouseDown() {
    mouseDown = true
}

function setMouseUp() {
    mouseDown = false
}



/**
 * ? ===========================================
 * ? Animate our scene
 *
 * * Now that we have our scene built up we need
 * * to animate it. Note that we need to run
 * * this animation loop just to get things to
 * * show on the screen. Without it we'll still
 * * get a blank screen even with the renderer
 * * attached to the dom.
 *
 * ? ===========================================
 */
function animate() {
    requestAnimationFrame(animate) // * javascript's requestAnimationFrame

    // * make our cube move!
    if (!mouseDown) {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
    }

    // * Update the controls
    controls.update()

    renderer.render(scene, camera)
}
animate()