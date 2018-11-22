let renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight) // * setting the resolution for the canvas

document.body.appendChild(renderer.domElement)


let scene =
    window.scene =
    new THREE.Scene()

scene.name = "demo-scene"


let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)


// * Create our 3D Object
let geometry = new THREE.BoxGeometry(1, 1, 1)
let material = new THREE.MeshNormalMaterial()
let cube = new THREE.Mesh(geometry, material)

cube.name = 'Box mesh'

scene.add(cube)


camera.position.z = 5



let controls = new THREE.OrbitControls(camera)

let mouseDown = false
controls.domElement.addEventListener('mousedown', setMouseDown, false)
controls.domElement.addEventListener('mouseup', setMouseUp, false)

function setMouseDown() {
    mouseDown = true
}

function setMouseUp() {
    mouseDown = false
}

function animate() {
    requestAnimationFrame(animate)

    if (!mouseDown) {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
    }

    controls.update()

    renderer.render(scene, camera)
}
animate()