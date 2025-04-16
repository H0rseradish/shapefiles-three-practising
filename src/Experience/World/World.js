import * as THREE from 'three';

import Experience from "../Experience";
import Environment from './Environment';
import Fields from './Fields.js'
import UserControls from './UserControls.js';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        
        
        // Setup:
        // NB not actually needing environment at the moment.. (not needed for field materials)
        this.environment = new Environment();
        // build fields- 
        this.fields = new Fields();
        
        this.usercontrols = new UserControls();

        // will need an update method in here
    }

}