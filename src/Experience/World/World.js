import * as THREE from 'three';

import Experience from "../Experience";
import Environment from './Environment';
// import Fields from './Fields.js'
import TimelineController from './TimelineController.js';
import TimelineEvents from './TimelineEvents.js';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        
        
        // Setup:
        // NB not actually needing environment at the moment.. (not needed for field materials)
        this.environment = new Environment();

        // below not needed because they are in the Timeline Events
        // this.fields = new Fields();
        
        this.timelineEvents = new TimelineEvents();

        this.timelineController = new TimelineController();

        // will need an update method in here
    }

}