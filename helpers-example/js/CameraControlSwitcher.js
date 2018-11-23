// * Most of this class is just adding handlers to the two buttons that we're adding
// * to the window to allow the user to determine which camera to attach the orbit
// * controls to.
// * The important threejs related part is the `attachControlsToCamera` method where
// * we actually move the camera.

class CameraControls {
    constructor(controls, cameraOne, cameraTwo) {
        this.controls = controls
        this.cameras = {
            one: cameraOne,
            two: cameraTwo
        }
        this.cameraButtonOne = document.querySelector('#camera-button-one')
        this.cameraButtonTwo = document.querySelector('#camera-button-two')

        this.initializeCameraControlButtons()
    }

    static begin(controls, cameraOne, cameraTwo) {
        return new CameraControls(controls, cameraOne, cameraTwo)
    }

    initializeCameraControlButtons() {
        this.cameraButtonOne.addEventListener('click', () => this.attachControlsToCamera('cameraOne'))
        this.cameraButtonTwo.addEventListener('click', () => this.attachControlsToCamera('cameraTwo'))
    }

    attachControlsToCamera(cameraName) {
        if (!cameraName) throw Error("A camera name wasn't provided")

        if (cameraName === 'cameraOne') {
            this.cameraButtonOne.classList.add('active-button')
            this.cameraButtonTwo.classList.remove('active-button')

            // * this is how we're moving the controls from camera to camera
            this.controls.object = this.cameras.one
        } else if (cameraName === 'cameraTwo') {
            this.cameraButtonOne.classList.remove('active-button')
            this.cameraButtonTwo.classList.add('active-button')

            // * this is how we're moving the controls from camera to camera
            this.controls.object = this.cameras.two
        } else {
            throw Error("A correct camera name wasn't provided")
        }

    }
}

export default CameraControls