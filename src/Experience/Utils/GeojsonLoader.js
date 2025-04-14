import EventEmitter from "./EventEmitter.js";

export default class GeojsonLoader extends EventEmitter {

    constructor(geojsonUrl) {
        super() 
        // console.log('geojsonLoader Go');
        this.geojsonUrl = geojsonUrl;
        this.geojson = [];

        // Investigate! I think it is not going to work?
        this.loaded = false;
        
        // calling the method in the constructor:
        this.load()

        // console.log(this.geojson)//ok they are there
    }

    // actually load with this function:
    async load() {
        // (console.log('load function Go'))
        const response = await fetch(this.geojsonUrl);
        const geojson = await response.json();
        //try this: oh look I did it here...fool
        // this.trigger('json ready', geojson);
        
        if (geojson) { 
            this.geojson.push(geojson);
            //use EventEmitter:
            // aha I needed to pass this.geojson to the trigger!!!!!! 
            this.trigger('json ready', this.geojson);
            // console.log(this.geojson) // it worked!
        }
    }
}