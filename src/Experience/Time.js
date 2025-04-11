import * as THREE from 'three';

import EventEmitter from "./Utils/EventEmitter.js";
export default class Time extends EventEmitter {

    constructor() {

        super()
        // console.log('Time instantiated')

        // Setup
        this.clock = new THREE.Clock();
        this.previousTime = 0;
        this.elapsedTime = 0;
        this.delta = 16;

        // Bruno recommends: Don't call tick() here immediately: do this below to wait one frame, otherwise won't be able to calculate the delta.. because it won't be there?:
        window.requestAnimationFrame(() => {
            this.tick()
        })
        
    }

    tick() {
        
        this.elapsedTime = this.clock.getElapsedTime();
        this.deltaTime = this.elapsedTime - this.previousTime;
        // update the previous to elapsed on each frame, so the delta calc works:
        this.previousTime = this.elapsedTime;
        // console.log(this.elapsedTime);

        // to provide info that tick has occurred
        this.trigger('tick');
        
        // keeping the context: 
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}