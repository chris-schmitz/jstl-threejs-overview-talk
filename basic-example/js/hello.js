// ! The setup
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
    75, // * field of view
    window.innerWidth / window.innerHeight, // * aspect ratio
    0.1, // * near clipping plane
    1000 // * far clipping plane
)

let renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight) // * setting the resolution for the canvas

document.body.appendChild(
    renderer.domElement // * adding the <canvas> element that three's renderer creates
)

// TODO: fix this
// // White directional light at half intensity shining from the top.
// var directionalLight = new THREE.DirectionalLight(0xff00ff, 0.5);
// scene.add(directionalLight);

// ! Adding the 3D stuff!!

// * Create our 3D Object
let geometry = new THREE.BoxGeometry(1, 1, 1)
let material = new THREE.MeshBasicMaterial({
    color: 0x11BBFF
})
let cube = new THREE.Mesh(geometry, material)

// * Add that object to the scene
scene.add(cube)

// * Move the camera back on the Z axis so we can see it
camera.position.z = 5

// ! Add controls
let controls = new THREE.OrbitControls(camera)

// ! Animate our scene

function animate() {
    requestAnimationFrame(animate) // * javascript's requestAnimationFrame

    // * make our cube move!
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // * Update the controls
    controls.update()

    renderer.render(scene, camera)
}
animate()