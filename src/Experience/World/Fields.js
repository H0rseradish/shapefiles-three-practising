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
        // all the fields:
        this.fields = null;

        // setting up stuff here to hold the needed arrays of fields:
        // baseline fields fenced - 2010
        this.baselineFields2010 = null;

        // first system change:
        // Fields are separated into Systems:
        // Green: Burrows/Top Burrows fenceline
        //
        this.greenFields2013 = null
        this.blueFields2013 = null
        this.redFields2013 = null


        // do I need the on() here? YES
        this.fieldsData.on('fieldsData ready', (fieldsData) => {
            console.log('fields here hopefully')

            this.fields = this.fieldsData.geojson.features;

            // separating out the fields:
            // spread operator to obtain stuff from middle of array from wes bos 

            // sorting out the various permutation of rendering the fields:

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
            console.log(this.greenFields2013);

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
            console.log(this.blueFields2013);

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
            console.log(this.redFields2013);


            this.getFieldNames();
            // this.makeOneField([0]);
            // this.makeAllFields();

            // this.makeSelectedFields2(this.baselineFields2010, '#00ff99', 0);
            // this.makeAllFields2();
            this.drawLine()
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
    

    // ok try something else:
    makeOneField(index) {
        // console.log(this.fields[index].geometry.coordinates[0][0]);

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

    //now try it without repeating myself!!!!! But wont actually need this - it will always be a selection:
    // makeAllFields2() {
    //     this.fields.forEach((field, index) => {
    //         this.makeOneField(index)
    //     })
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

  
    //try to get it to work - this works:
    // (BUT now need to make it concise and not repetitive)
    makeSelectedFields2(fieldsArray, color, y) {

        fieldsArray.forEach((field, index) => {
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

    drawLine() {
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const y = 10;

        const offsetX = 265900;
        const offsetZ = 98200;


        const points = [];
        points.push(new THREE.Vector3(-100, 10, 0));
        points.push(new THREE.Vector3(0, 10, 100));
        points.push(new THREE.Vector3(100, 10, 0));
        points.push(new THREE.Vector3(-100, 10, 0));
        // points is an array of 4 ojects, each holding xyz (3) key value pairs:
        console.log(points)
        // my data - below -is an array of 30 arrays each containing 2 coordinate values (effectively x and z):
        console.log(this.fields[6].geometry.coordinates[0][0]);
        //so.. I need to make this into the same structure as points
        //Bruno lessons 18, !!
        const fieldPointsCount = this.fields[6].geometry.coordinates[0][0].length;
        console.log(fieldPointsCount);

        //simplify it a bit:
        const coordinatesXZ = this.fields[6].geometry.coordinates[0][0];
        console.log(coordinatesXZ);

        // but will this make my objects inside? or do I want a bunch of vector3s ???? try it, see what happens
        // Actually I think this will be fine because I don't need to use setFromPoints, can just pass it (positions/boundaryPoints) into BufferATTRIBUTE!!!!
        

        const boundaryPoints = new Float32Array(fieldPointsCount * 3)

        for(let i = 0; i < fieldPointsCount; i++) {

            const i3 = i * 3;
            //think about this:
            boundaryPoints[i3 + 0] = (coordinatesXZ[i][0]) - offsetX;
            boundaryPoints[i3 + 1] = y;
            boundaryPoints[i3 + 2] = (coordinatesXZ[i][1]) - offsetZ;
        }
       // woo hoo!
        console.log(boundaryPoints)

        const lineGeometry = new THREE.BufferGeometry().
        setFromPoints(points);
        // console.log(lineGeometry);
        const line = new THREE.Line(lineGeometry, material)
        this.scene.add(line)


        const boundaryGeometry = new THREE.BufferGeometry();

        boundaryGeometry.setAttribute('position', new THREE.BufferAttribute(boundaryPoints, 3))

        //fuck yes.
        const boundaryLine = new THREE.Line(boundaryGeometry, material);
        console.log(boundaryLine)
        this.scene.add(boundaryLine);
        
    }



    makeSingleFieldBoundary(index, color) {
        //making lowerWheaty!
        // need to change all below now to make points, a bfferGeom, a line geometry and a line material. will need to think about this - specially re making the points.
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

}





