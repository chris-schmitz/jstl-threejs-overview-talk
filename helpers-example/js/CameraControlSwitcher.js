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

            this.controls.object = this.cameras.one
        } else if (cameraName === 'cameraTwo') {
            this.cameraButtonOne.classList.remove('active-button')
            this.cameraButtonTwo.classList.add('active-button')

            this.controls.object = this.cameras.two
        } else {
            throw Error("A correct camera name wasn't provided")
        }

    }
}

export default CameraControls