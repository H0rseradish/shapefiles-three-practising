import * as THREE from 'three';
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
            this.makeOneField(0);
            this.makeAllFields()
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
    makeOneField(index) {
        //making lowerWheaty!
        console.log(this.fields[index].geometry.coordinates[0][0]);

        const shape = new THREE.Shape();

        const fieldcoords = this.fields[0].geometry.coordinates[0][0];

        fieldcoords.forEach((coordinate, i) => {
            const offsetX = 265900;
            const offsetY = 98200;
                if(i === 0) {
                    shape.moveTo(coordinate[0] - offsetX, coordinate[1] - offsetY);
                } else { 
                    shape.lineTo(coordinate[0] - offsetX, coordinate[1] - offsetY);
                }
        })

        const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: false })

        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            color: '#118833',
            side: THREE.DoubleSide
        }))

        mesh.rotation.x = Math.PI * -0.5
        mesh.rotation.z = Math.PI * 0.5;
        mesh.position.set(0, 1, 0)
        this.scene.add(mesh);
    }

    makeAllFields() {
        
    }

    // hey what about a switch case thingy to make all the fields at once ??

}

