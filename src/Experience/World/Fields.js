import Experience from "../Experience";
import FieldsDataLoader from "./FieldsDataLoader";

export default class Fields {
    constructor(){
        console.log('Fields, go!');
        // dont forget Experience is a singleton so it is not a different instance...
        this.experience = new Experience();
        this.scene = this.experience.scene;

        // the geojson resource:
        this.fieldsData = new FieldsDataLoader();
        // console.log(this.fieldsData)
        this.fields = null;
        // some methods that happen here: what will I need?

        // do I need the on here? YES
        this.fieldsData.on('fieldsData ready', (fieldsData) => {
            console.log('fields here hopefully')

            //and this is no longer undefined after remembering the this.... chatgpt was totally USELESS at spotting that I had missed it. It took me hours to work it out.
            this.fields = this.fieldsData.geojson.features;
            console.log(this.fields);

            this.getFieldNames();
        })
        
    }
    // ok try this
    getFieldNames() {
        console.log(this.fields)
        const fieldNames = [];

        this.fields.forEach((feature) => {
            // console.log(feature.properties.Field_Name);
            fieldNames.push(feature.properties.Field_Name);
        })

        console.log(fieldNames)
        return fieldNames;
    }

    // ok try something else:
    makeAField() {

    }

}

