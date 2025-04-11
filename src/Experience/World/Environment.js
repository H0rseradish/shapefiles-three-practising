import * as THREE from 'three';
import Experience from "../Experience";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.directionalLight = new THREE.DirectionalLight('#ffffff', 4);
        this.directionalLight.position.set(0, 15, - 50)
        this.scene.add(this.directionalLight);
    }  

}