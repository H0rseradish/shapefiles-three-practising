import Experience from "../Experience";
import GeojsonLoader from "../Utils/GeojsonLoader";

export default class FieldsDataLoader extends GeojsonLoader {
    constructor() {
        super('./geojson/utm/fields-fenced-area.geojson');
        // console.log('fields, Go!');

        this.experience = new Experience();

        //ok confusion largely resolved??? maybe.

        //storing   
        this.fieldsData = null;

        // Using on to ensure has loaded before attempting to store it:
        this.on('json ready', (geojson) => {
            // I can do this now, (after actually passing the geojson in the trigger...)
            this.fieldsData = geojson;
            
            //and functions now get called here where the data exists.. except I dont think I neec this because trigger does it?
            // this.getFieldsData()
            //console.log(this.fieldsData)//
            this.trigger('fieldsData ready', this.fieldsData);
        })
    }
}