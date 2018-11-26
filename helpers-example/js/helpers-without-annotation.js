import CameraControls from "./CameraControlSwitcher.js"

let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight
let aspectRatio = SCREEN_WIDTH / SCREEN_HEIGHT

let renderer = new THREE.WebGLRenderer()
renderer.autoClear = false
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
document.body.appendChild(renderer.domElement)

const scene =
    window.scene =
    new THREE.Scene()

scene.name = "helper-demo"

let geometry = new THREE.BoxGeometry(10, 10, 10)
let material = new THREE.MeshNormalMaterial()
let box = new THREE.Mesh(geometry, material)

box.name = "another-box"

scene.add(box)

let cameraOne = new THREE.PerspectiveCamera(60, aspectRatio * 0.5, 10, 50)
cameraOne.position.z = 30

cameraOne.lookAt(box)

let cameraTwo = new THREE.PerspectiveCamera(90, aspectRatio * 0.5)

cameraTwo.position.z = 50
cameraTwo.position.y = 50

cameraTwo.lookAt(scene.position)

let controls = new THREE.OrbitControls(cameraOne)
CameraControls.begin(controls, cameraOne, cameraTwo)

let cameraOneHelper = new THREE.CameraHelper(cameraOne)
cameraOneHelper.name = 'camera-one-helper'
scene.add(cameraOneHelper)

let gridHelper = new THREE.GridHelper(50, 10)
gridHelper.name = 'grid-helper'
scene.add(gridHelper)

let axesHelper = new THREE.AxesHelper(30)
axesHelper.name = 'axes-helper'
scene.add(axesHelper)

function animate() {
    requestAnimationFrame(animate)

    renderer.clear()

    box.rotation.x += 0.01
    box.rotation.y += 0.01
    cameraOneHelper.visible = false
    // gridHelper.visible = false
    // axesHelper.visible = false

    renderer.setViewport(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT)

    renderer.render(scene, cameraOne)

    cameraOneHelper.visible = true
    gridHelper.visible = true
    // axesHelper.visible = true

    renderer.setViewport(SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT)

    renderer.render(scene, cameraTwo)
}

animate()