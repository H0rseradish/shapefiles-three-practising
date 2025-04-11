import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resources from './Utils/Resources.js';
import GeojsonLoader from './Utils/GeojsonLoader.js';


// Making Experience class into a singleton - need to define an instance:
let instance = null;

export default class Experience 
{
    constructor(canvas) 
    {
        // Singleton: 
        // convert to singleton - if an instance exists, use it:
        if (instance) {
            return instance;
        }
        // save this as our instance (the first time)
        instance = this;

        // Global access (as recommended by Bruno):
        window.experience = this;

        // Options:
        this.canvas = canvas;
        // console.log(canvas);

        // Setup:
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();

        // still need to sort this out - because will be doing this multiple times. 
        // Not here!!!, call this loader as I use it - ie in Fields to get the fields, in drains to get the drains etc:
        this.geojsonLoader = new GeojsonLoader('./geojson/utm/fields-fenced-area.geojson');
        // this.resources = new Resources();

        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World();


        // using on() - from EventEmitter: - to listen for various events, so we can listen outside of the class where the event listener is:

        // Sizes resize event:
        this.sizes.on('resize', () => {
            // console.log('resize heard')
            //doing it this way (with arrow func) preserves the context of 'this'
            this.resize();
        })

        // Time tick event:
        this.time.on('tick', () => {
            // when a tick occurs we call update on the experience:
            this.update();
        })

        // Load event:
        this.geojsonLoader.on('json ready', () => {
            console.log('hopefully there is a huge array of fields') // there is now!
            
            //call Fieldsmanager class - is that how to do it?
        })

    }

    // this gets called when a resize event is heard. 
    // we listen for it ONCE and it will propagate to the children:
    resize() {
        //resize camera:
        this.camera.resize();
        this.renderer.resize();

        // console.log('action on hearing a resize')
    }

    //this can be here now rather than in a tick function 
    update() {
        this.camera.update();
        this.renderer.update();
        // console.log('action on hearing a tick')
    }

}


