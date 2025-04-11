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

    // actually load:
    async load() {
        // (console.log('load function Go'))
        const response = await fetch(this.geojsonUrl);
        const geojson = await response.json();

        // this.loaded = true; // is this bollox from chat? YES IT WAS? or would it be better to do if geojson? will investigate.
        //maybe use Bruno's way. Or have I made a more fundamental mistake YES YOU HAVE!! - with the async

        // console.log(geojson) // woo hoo at least this works
        
        if (geojson) { 
            //use EventEmitter:
            
            this.geojson.push(geojson);
            this.trigger('json ready');
            // console.log(this.geojson) // it worked!
        }
        
    }
}