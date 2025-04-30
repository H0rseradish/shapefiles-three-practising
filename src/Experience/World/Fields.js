import * as THREE from 'three';
import Experience from "../Experience";
import FieldsDataLoader from "./FieldsDataLoader";

export default class Fields {
    // I asked chatgpt about the best place for these. It recommended using static, which seemed to make sense, for the moment? Maybe a separate place for constants (utils) if eventually needed by other classes???
    static OFFSET_X = 265900;
    static OFFSET_Z = 98200;

    constructor() {
        console.log('Fields, go!');

        this.OFFSET_X = Fields.OFFSET_X;
        this.OFFSET_Z = Fields.OFFSET_Z;

        // dont forget Experience is a singleton so it is not a different instance...
        this.experience = new Experience();
        this.scene = this.experience.scene;

        // the geojson resource:
        this.fieldsData = new FieldsDataLoader();
        // console.log(this.fieldsData)
        // all the fields:
        this.fields = null;

        // setting up stuff here to hold the needed arrays of fields:
        // baseline fields fenced - 2010
        this.baselineFields2010 = null;

        // first system change:
        this.greenFields2013 = null
        this.blueFields2013 = null
        this.redFields2013 = null


        // do I need the on() here? YES.
        this.fieldsData.on('fieldsData ready', (fieldsData) => {
            console.log('fields here hopefully')

            this.fields = this.fieldsData.geojson.features;

            // Separating out the fields:
            // spread operator to obtain stuff from middle of array from wes bos 

            // NB no index 16(Burrows new shape) or 21(Burrows old shape) or 22-25(various new shapes/changes)
            this.baselineFields2010 = [
                ...this.fields.slice(0, 16),
                ...this.fields.slice(17, 22),
            ]

            this.greenFields2013 = [
                // 3:Golden Rove, 4:Orchard Dean (old):
                ...this.fields.slice(3, 5),
                // 11:Longlands South, 12:Dairy North, 
                ...this.fields.slice(11, 13),
                // 16:Burrows(new boundary), 17:Bottom Burrows
                ...this.fields.slice(16, 18)
            ];
            // console.log(this.greenFields2013);

            this.blueFields2013 = [
                // 0:Higher Wyke Moor, 1:Middle Wyke Moor, 2:Lower Wyke Moor
                ...this.fields.slice(0, 3),
                // 5:Dairy South
                ...this.fields.slice(5, 6),
                // 10:Longlands North
                ...this.fields.slice(10, 11),
                // 14:Dairy East
                ...this.fields.slice(14, 15),
                // 19:Dairy Corner
                ...this.fields.slice(19, 20),
            ];    

            this.redFields2013 = [
                // 6:Lower Wheaty, 7:Pecketsford, 8:Great Field, 9:Longlands East
                ...this.fields.slice(6, 10),
                // 13:Poor Field
                ...this.fields.slice(13, 14),
                // 15:Ware Park
                ...this.fields.slice(15, 16),
                // 18:Little Pecketsford
                ...this.fields.slice(18, 19),
            ];
            
            //useful to see in the console:
            this.getFieldNames();
            this.makeSingleField(20, '#880022', 2)

            this.drawSingleFieldBoundary(20, '#ffff11', 8)
            this.drawSelectedFieldsBoundaries(this.baselineFields2010, '#ffff11', 8)
            
        })
        
    }
    // ok try this
    getFieldNames() {
        // console.log(this.fields)
        const fieldNames = [];

        this.fields.forEach((feature) => {
            // console.log(feature.properties.Field_Name);
            fieldNames.push(feature.properties.Field_Name);
        })
        console.log(fieldNames)
        return fieldNames;
    }
    

    makeSingleField(index, color, y) {
        // console.log(this.fields[index].geometry.coordinates[0][0]);

        const shape = new THREE.Shape();
        //this below is the problem with reusing this function in the other function:
        const coordinates = this.fields[index].geometry.coordinates[0][0];

        coordinates.forEach((coordinate, i) => {
            if(i === 0) {
                shape.moveTo(coordinate[0] - this.OFFSET_X, coordinate[1] - this.OFFSET_Z);
            } else { 
                shape.lineTo(coordinate[0] - this.OFFSET_X, coordinate[1] - this.OFFSET_Z);
            }
        })

        const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: false })

        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
        }))

        mesh.rotation.x = Math.PI * - 0.5
        mesh.rotation.z = Math.PI * 0.5;
        mesh.position.set(0, y, 0)
        this.scene.add(mesh);
    }


    // because there are no non-duplicated properties in the data, so I couldnt easily make a condition to account for the changed array indexes meaning I couldnt just call makeSingleField() in here:

    makeSelectedFields(fieldsArray, color, y) {

        fieldsArray.forEach((field, index) => {
            //no need to repeat though, use function above?
            //JUST MAKE SURE - REPEAT IT FIRST!
            const shape = new THREE.Shape()
            // console.log(field.geometry.coordinates[0][0])
            const coordinates = field.geometry.coordinates[0][0]

            coordinates.forEach((coordinate, i) => {
                if(i === 0) {
                    shape.moveTo(coordinate[0] - this.OFFSET_X, coordinate[1] - this.OFFSET_Z);
                } else { 
                    shape.lineTo(coordinate[0] - this.OFFSET_X, coordinate[1] - this.OFFSET_Z);
                }
            })
            const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: false })

            const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: color,
                // wireframe: true,
                side: THREE.DoubleSide
            }))

            mesh.rotation.x = Math.PI * - 0.5
            mesh.rotation.z = Math.PI * 0.5;
            mesh.position.set(0, y, 0)
            this.scene.add(mesh);
        })
    }

    //woo hoo this works
    drawSingleFieldBoundary(index, color, y) {

        const coordinatesXZ = this.fields[index].geometry.coordinates[0][0];
        // console.log(coordinatesXZ);
        const coordinatesXZCount = coordinatesXZ.length;

        const boundaryCoords = new Float32Array(coordinatesXZCount * 3);

        for(let i = 0; i < coordinatesXZCount; i++) {
            //the Bruno method:
            const i3 = i * 3;
            //think about this:
            boundaryCoords[i3 + 0] = (coordinatesXZ[i][0]) - this.OFFSET_X;
            boundaryCoords[i3 + 1] = 0;
            boundaryCoords[i3 + 2] = (coordinatesXZ[i][1]) - this.OFFSET_Z;
        }
        // console.log(boundaryCoords)

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(boundaryCoords, 3));

        const material = new THREE.LineBasicMaterial({ color: color });

        const mesh = new THREE.Line(geometry, material);

        mesh.rotation.x = Math.PI * - 0.5;
        mesh.rotation.y = Math.PI * - 0.5;
        mesh.rotation.z = Math.PI * 0.5;
        // controlling the y here
        mesh.position.set(0, y, 0);

        this.scene.add(mesh);
    }

    //now try this - it works:
    drawSelectedFieldsBoundaries(fieldsArray, color, y) {       

        fieldsArray.forEach((field) => {

            const coordinatesXZ = field.geometry.coordinates[0][0];
        // console.log(coordinatesXZ);
            const coordinatesXZCount = coordinatesXZ.length;

            const boundaryCoords = new Float32Array(coordinatesXZCount * 3);

            for(let i = 0; i < coordinatesXZCount; i++) {
                //the Bruno method:
                const i3 = i * 3;
                //think about this:
                boundaryCoords[i3 + 0] = (coordinatesXZ[i][0]) - this.OFFSET_X;
                boundaryCoords[i3 + 1] = 0;
                boundaryCoords[i3 + 2] = (coordinatesXZ[i][1]) - this.OFFSET_Z;
            }
        console.log(boundaryCoords)

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(boundaryCoords, 3));

        const material = new THREE.LineBasicMaterial({ color: color });

        const mesh = new THREE.Line(geometry, material);

        mesh.rotation.x = Math.PI * - 0.5;
        mesh.rotation.y = Math.PI * - 0.5;
        mesh.rotation.z = Math.PI * 0.5;
        // controlling the y here
        mesh.position.set(0, y, 0);

        this.scene.add(mesh);
        })
        
    }

}





