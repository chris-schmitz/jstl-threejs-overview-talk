// ! The setup
let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// ! Adding the 3D stuff!!

let geometry = new THREE.BoxGeometry(1, 1, 1)
let material = new THREE.MeshBasicMaterial({
    color: 0x11BBFF
})
let cube = new THREE.Mesh(geometry, material)

var axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

scene.add(cube)
camera.position.z = 5



// ! Animate our scene

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
}
animate()