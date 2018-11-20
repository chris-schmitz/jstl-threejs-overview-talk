let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight
let aspectRatio = SCREEN_WIDTH / SCREEN_HEIGHT

let renderer = new THREE.WebGLRenderer()
renderer.autoClear = false
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

let geometry = new THREE.BoxGeometry(10, 10, 10)
let material = new THREE.MeshNormalMaterial()
let box = new THREE.Mesh(geometry, material)

scene.add(box)


let cameraOne = new THREE.PerspectiveCamera(
    60,
    aspectRatio * 0.5,
    10,
    50
)
cameraOne.position.z = 30

cameraOne.lookAt(box)
let cameraOneHelper = new THREE.CameraHelper(cameraOne)
scene.add(cameraOneHelper)

let gridHelper = new THREE.GridHelper(50, 10)
scene.add(gridHelper)


let cameraTwo = new THREE.PerspectiveCamera(
    90,
    aspectRatio * 0.5
)
cameraTwo.position.z = 50
cameraTwo.position.y = 50

cameraTwo.lookAt(scene.position)

let controls = new THREE.OrbitControls(cameraOne)

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