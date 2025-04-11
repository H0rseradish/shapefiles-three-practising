import EventEmitter from "./EventEmitter.js";

export default class GeojsonLoader extends EventEmitter {

    constructor(geojsonUrl) {
        super() 
        // console.log('geojsonLoader Go');
        this.geojsonUrl = geojsonUrl;
        this.fields = [];

        // Investigate! I think it is not going to work?
        this.loaded = false;
        
        // calling the method in the constructor:
        this.load()
        console.log(this.fields)//ok they are there
    }

    // actually load:
    async load() {
        // (console.log('load function Go'))
        const response = await fetch(this.geojsonUrl);
        const geojson = await response.json();

        // this.loaded = true; // is this bollox from chat? YES IT WAS? or would it be better to do if geojson? will investigate.
        //maybe use Bruno's way. Or have I made a more fundamental mistake

        console.log(geojson) // woo hoo at least this works
        
        if (geojson) { 
            //use EventEmitter:
            this.trigger('json ready');
            this.fields.push(geojson);
            console.log(this.fields) // it worked!
        }
        
    }
}