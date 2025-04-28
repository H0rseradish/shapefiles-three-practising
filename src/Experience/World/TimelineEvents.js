import * as THREE from 'three';
import Experience from "../Experience";
import Fields from './Fields';

export default class TimelineEvents {
    constructor(){
        console.log('TimelineEvents, Go!')

        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.fields = new Fields();
    }

    yearEvents2013() {
        
    }


}