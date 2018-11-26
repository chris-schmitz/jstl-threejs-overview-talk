let renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight) // * setting the resolution for the canvas

document.body.appendChild(renderer.domElement)


let scene =
    window.scene =
    new THREE.Scene()

scene.name = "demo-scene"
scene.background = new THREE.Color(0xEE6352)


let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)



let backgroundSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(500, 60, 40),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('assets/street.png')
        // map: new THREE.TextureLoader().load('assets/oldhouse.jpg')
        // map: new THREE.TextureLoader().load('assets/equirectangular-pano.png')
    })
)
backgroundSphere.geometry.scale(-1, 1, 1)
scene.add(backgroundSphere)

let loader = new THREE.STLLoader()

let dragon = null
loader.load('loubie_aria_dragon.stl', (geometry) => {
    let material = new THREE.MeshPhongMaterial({
        color: 0x1098F7,
        specular: 0x111111,
        shininess: 200
    })
    dragon = new THREE.Mesh(geometry, material)

    dragon.rotation.x = -Math.PI / 2
    dragon.position.y = 61

    dragon.castShadow = true
    dragon.receiveShadow = true
    scene.add(dragon)
})

scene.add(new THREE.HemisphereLight(0xffffff, 0x111122))

camera.position.z = 55
camera.position.y = 150
camera.position.x = -150

let gridHelper = new THREE.GridHelper(100, 50)
gridHelper.name = 'grid-helper'
scene.add(gridHelper)

let axesHelper = new THREE.AxesHelper(30)
axesHelper.name = 'axes-helper'
scene.add(axesHelper)



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

    if (dragon !== null && !mouseDown) {
        // * I was trying to add in another quick demo to show off STL loading and background spheres
        // * so I pulled over code from the basic example and tacked stuff in. When I got down here to
        // * the rotation I decided the goofy rotation of the dragon was funny so I left it ;)
        dragon.rotation.x += 0.01
        dragon.rotation.y += 0.01
    }

    controls.update()

    renderer.render(scene, camera)
}
animate()