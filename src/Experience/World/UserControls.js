import * as THREE from 'three';
import Experience from "../Experience";
import Fields from './Fields';


export default class UserControls{
    constructor() {
        console.log('user controls')
        // dont forget Experience is a singleton:
        this.experience = new Experience();
        this.scene = this.experience.scene;

        //will need this because of using different Fields methods- do i need trigger() again in Fields, and on() here? Yes?, if its used in theconstructor here???
        this.fields = new Fields();
        // console.log(this.fields)

        // will need to make the controls - maybe just try a button for now but will be a slider eventually
        this.makeUserControls()

    }

    // make the necessary html here???: NOT YET just try to reproduce what I did in the spaghetti...
    makeUserControls() {
        const timeControls = document.getElementById('time-controls');
        const button2011 = document.getElementById('2011');
        const button2016 = document.getElementById('2016');
        const explanation = document.createElement('p');
    }

}


