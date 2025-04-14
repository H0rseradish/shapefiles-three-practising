import Experience from "../Experience";
import GeojsonLoader from "../Utils/GeojsonLoader";

export default class Fields {
    constructor() {
        // console.log('fields, Go!');
        
        this.experience = new Experience();
        this.geojsonLoader = new GeojsonLoader('./geojson/utm/fields-fenced-area.geojson')

        // wait is this relevant now? NO? Have I repeated myself - not sure
        this.fieldsData = this.geojsonLoader.geojson;
        console.log(this.fieldsData)//YESSSS!!.

        //storing   
        // this.fields = [];

        //   Should this be in a method? need to think
        // Load , using on to ensure has loaded:
        this.geojsonLoader.on('json ready', () => {
            // am I just repeating here? No but I am confusing myself.
            // this.fields.push(this.fieldsData);

            // this.fieldsData[0].features.forEach((item) => {
            //     console.log(item);//yes this gets it
            // })
            //what about here? no...YES because Fields passed in here you utter twat
            this.fieldsNames(this.fieldsData)
            console.log(this.fieldsData)
            // console.log(this.fields)
        })
    }

    // experiment - this DOES work now...
    fieldsNames() {
        console.log(this.fieldsData);
        // console.log(this.fields[0]);
        // console.log(this.fields[0][0]);
        // console.log(this.fields[0][0].features);
    }
    
}