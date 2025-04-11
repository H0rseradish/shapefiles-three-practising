import Experience from "../Experience";
import GeojsonLoader from "../Utils/GeojsonLoader";

export default class Fields {
    constructor() {
        console.log('fields, Go!');
        
        this.experience = new Experience();
        this.geojsonLoader = new GeojsonLoader('./geojson/utm/fields-fenced-area.geojson')

        // wait is this relevant now?
        this.fieldsData = this.geojsonLoader.geojson;
        // console.log(this.fields)//YESSSS
        this.fields = [];
        // so now to do stuff: 
        // watch out for the async!!!!! :o 

        //   Should this be in a method? need to think
        // Load , using on to ensure has loaded:
        this.geojsonLoader.on('json ready', () => {
            this.fields.push(this.fieldsData);

            this.fieldsData[0].features.forEach((item) => {
                console.log(item);//yes this gets it
            })
        })

        console.log(this.fields) // Got it now!!!
        // But still not everywhere... eg
        this.fieldNames()
    }

    // experiment - this does NOT work - the stuff has not loaded here:
    fieldNames() {
        console.log(this.fields[0].features)
    }
    
}