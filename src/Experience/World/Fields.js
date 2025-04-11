import Experience from "../Experience";
import GeojsonLoader from "../Utils/GeojsonLoader";

export default class Fields {
    constructor() {
        console.log('fields, Go!');
        
        this.experience = new Experience();
        this.geojsonLoader = new GeojsonLoader('./geojson/utm/fields-fenced-area.geojson')


        this.fields = this.geojsonLoader.geojson;
        console.log(this.fields)//YESSSS

    }
}