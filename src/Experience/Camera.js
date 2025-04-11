import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Experience from './Experience.js'

export default class Camera {
    constructor() {
        // Get access to all the things VIA Experience class (because Experience is a singleton this below does not make a new instance!...):
        this.experience = new Experience();
        //so - get what we need for the camera:
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        // console.log(this.experience.scene);

        this.setInstance()
        this.setOrbitControls()
    }

    // Make the creation of the camera a method (called in the constructor):
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 50, 3000);
        this.instance.position.set(20, 900, 20);
        // do this here to avoid issues:
        this.scene.add(this.instance);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }

    // Update camera on resize -  called in Experience:
    resize() {
        // console.log('resize on the Camera')
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix()
    }
    // Update controls on tick -  called in Experience:
    update() {
        this.controls.update()
    }

}