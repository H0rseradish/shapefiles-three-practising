import * as THREE from 'three';

import Experience from "../Experience";
import Environment from './Environment';
import FieldsDataLoader from './FieldsDataLoader';
import Fields from './Fields.js'

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        //not sure what I am actually doing here - brain has melted.
        this.fields = new Fields();
        

        //Test mesh 
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshStandardMaterial({ wireframe: false })
        )
        this.scene.add(testMesh);

        // Setup:
        this.environment = new Environment();
    }

}