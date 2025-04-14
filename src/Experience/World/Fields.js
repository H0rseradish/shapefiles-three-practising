import Experience from "../Experience";
import GeojsonLoader from "../Utils/GeojsonLoader";

export default class Fields {
    constructor() {
        // console.log('fields, Go!');
        
        this.experience = new Experience();
        this.geojsonLoader = new GeojsonLoader('./geojson/utm/fields-fenced-area.geojson')

        //ok confusion largely resolved.

        //storing   
        this.fieldsData = null;

        //   Should this be in a method? need to think

        // Using on to ensure has loaded before attempting to store it:
        this.geojsonLoader.on('json ready', (geojson) => {
            // I can do this now, (after actually passing the geojson in the trigger...)
            this.fieldsData = geojson;
            
            //and functions now get called here where the data exists.. 
            this.getFieldsData()
            //console.log(this.fieldsData)//
        })
    }

    // experiment - this DOES work now...
    getFieldsData() {
        // console.log(this.fieldsData.features);

        // maybe this elsewhere in a different class to do with building fields?
        // const fieldsNames = []
        // this.fieldsData.features.forEach((feature) => {
        //     console.log(feature.properties.Field_Name); // halle bleeding luyah
        //     fieldsNames.push(feature.properties.Field_Name)
        // })
        // return fieldsNames;
        return this.fieldsData;
    }

    //more methods or elsewhere?
}