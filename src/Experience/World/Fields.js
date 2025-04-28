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

            //separating out the fields:
            //what is going to be the best way
            this.selectedFields = this.fields.slice(6, 9);
            console.log(this.selectedFields);

            this.getFieldNames();
            this.makeOneField([0]);
            this.makeAllFields();
            this.makeSelectedFields(this.selectedFields);
            // this.makeAllFields2();
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

        const fieldcoords = this.fields[index].geometry.coordinates[0][0];

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

        //going to have to separate out the colour though - maybe split this function into two - one to do the geometries and one to make and render the meshes.
        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            color: '#ff0033',
            side: THREE.DoubleSide
        }))

        mesh.rotation.x = Math.PI * -0.5
        mesh.rotation.z = Math.PI * 0.5;
        mesh.position.set(0, 3, 0)
        this.scene.add(mesh);
    }

    makeAllFields() {

        this.fields.forEach((field, index) => {
            //no need to repeat though, use function above?
            //JUST MAKE SURE - REPEAT IT FIRST!
            const shape = new THREE.Shape()
            // console.log(field.geometry.coordinates[0][0])
            const coordinates = field.geometry.coordinates[0][0]

            coordinates.forEach((coordinate, i) => {
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
                color: '#119933',
                side: THREE.DoubleSide
            }))

            mesh.rotation.x = Math.PI * - 0.5
            mesh.rotation.z = Math.PI * 0.5;

            this.scene.add(mesh);
        })
    }

    //now try it without repeating myself!!!!!
    makeAllFields2() {
        this.fields.forEach((field, index) => {
            this.makeOneField(index)
        })
    }

    //thinking about this.. what is the best way?? bearing in mind systems, changes to systems etc
    // makeFieldGeometry(index) {
    // }
    // makeFieldMaterial(color) {
    // }
    // makeFieldMesh() {
    // }

    // make color a param:
    makeSingleField(index, color) {
        //making lowerWheaty!
        console.log(this.fields[index].geometry.coordinates[0][0]);

        const shape = new THREE.Shape();

        const fieldcoords = this.fields[index].geometry.coordinates[0][0];

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
            color: color,
            side: THREE.DoubleSide
        }))

        mesh.rotation.x = Math.PI * -0.5
        mesh.rotation.z = Math.PI * 0.5;
        mesh.position.set(0, 3, 0)
        this.scene.add(mesh);
    }

    //is this the best way??? - I could pass in the relevant array eg blueFields THIS IS NOT DOING WHAT I EXPECTED!!! its just picking the first three of the original array - because of the code in makeOne Field is using the original array.  
    makeSelectedFields(array) {
        array.forEach((field, index) => {
            this.makeOneField(index)
        })
    }
   

}





