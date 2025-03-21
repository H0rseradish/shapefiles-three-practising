import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sky } from 'three/addons/objects/Sky.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import GUI from 'lil-gui'

// console.log(DRACOLoader)


/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



/**
 * Update all materials - all the shadows - problem because the shadow cam is a mesh apparently..
 */
// const updateAllMaterials = () =>
//     {
//         scene.traverse((child) =>
//         {
//             if(child.isMesh)
//             {
//                 // Activate shadows here
//                 child.castShadow = true
//                 child.receiveShadow = true
//             }
//         })
//     }


/**
 * Models
*/
//OK THE FOX HAS DISAPPEARED SINCE DOING THE STUFF TO GET IT ON TO GITHUB PAGES - ok sorted - needed a dot before the slash in the path...


//Have left draco loader in because hope to add my own blender model
// // have to instantiate DRACOLoader ***BEFORE*** GLTFLoader
// const dracoLoader = new DRACOLoader()
// // first copy the draco lib (from node_modules/three/examples/jsm/libs) to the static folder, then set the path to it using setDecoderPath():
// dracoLoader.setDecoderPath('/draco/')

//instantiate glTFLoader:
// const gltfLoader = new GLTFLoader()

// // finally, give the dracoLoader instance to the the gltf loader, using setDRACOLoader():
// // gltfLoader.setDRACOLoader(dracoLoader)

// // //You have to load it -  and then do something with it
// // //takes path to gltf file, and 3 callbacks tracking progress



// // neeed to create this in global scope because need to pass it into the tick function to update it on each frame
// let foxMixer = null
// let foxModel = null
// let foxStand = null
// let foxWalk = null
// let foxRun = null
// //load the fox
// gltfLoader.load(
//     './models/Fox/glTF/Fox.gltf',
//     (gltf) => {
//         // console.log(gltf)

//         //Model: scale the fox:
//         gltf.scene.scale.set(0.025, 0.025, 0.025)
//         gltf.scene.position.set(0, 0, -90)
//         // console.log(gltf.scene);
//         foxModel = gltf.scene;

//         //need an animation mixer to deal with the included animations
//         foxMixer = new THREE.AnimationMixer(gltf.scene)
//         //add clips to the mixer:
//         foxStand = foxMixer.clipAction(gltf.animations[0])
//         foxWalk = foxMixer.clipAction(gltf.animations[1])
//         foxRun = foxMixer.clipAction(gltf.animations[2])
//         // console.log(action)
//         // foxWalk.play()
//         // foxStand.play()
    
//         //Shadow:        
//         scene.add(gltf.scene)
//         gltf.scene.traverse((child) => {
//             child.castShadow = true
//         })
//     }
// )

/**
 * Test cone
 */
// const coneMesh = new THREE.Mesh(
//     new THREE.ConeGeometry(2, 7, 20),
//     new THREE.MeshStandardMaterial({
//         color: '#118833',
//         metalness: 0,
//         roughness: 0.9,
//     })
// ) 
// coneMesh.position.set(6, 2, 1)
// coneMesh.castShadow = true;
// coneMesh.receiveShadow = true;
// scene.add(coneMesh);


/**
 * Field(s)
 */
// -------------- ok so now what????? --------------------
// x = 0, y = 0;
// const lowerWheatyShape = new THREE.Shape();
// lowerWheatyShape.moveTo()

//Lower Wheaty Field only:
const lowerWheatyGeojson =
{ 
"type": "Feature", 
"properties": { "OBJECTID": 7, "Shape_Leng": 522.42343231200005, "Shape_Area": 18198.625191499999, "Field_Name": "Lower Wheaty", "Field_code": "NW015", "Flume_ID": 10, "DB_CatchID": 10, "Farmlet": "Red", "FP_active": 1, "Old_FP": 1, "New_FP": 1, "Enterprise": "D", "Comments": null, "Area_ha": 1.81986251915, "OrgSprArea": 13856.724337, "InOrgSprAr": 17770.571717499999, "F_Basin": 19361.372076799998, "F_CutArea": 17666.738444899998, "East_Centr": 266191.63305599999, "North_Cent": 98202.484542599996 }, 
"geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 266158.267500000074506, 98114.168600000441074 ], [ 266147.772599999792874, 98130.991699999198318 ], [ 266133.415900000371039, 98153.783500000834465 ], [ 266114.775000000372529, 98183.458399999886751 ], [ 266098.344399999827147, 98209.066600000485778 ], [ 266128.341099999845028, 98230.787699999287724 ], [ 266159.424999999813735, 98251.678999999538064 ], [ 266178.261699999682605, 98263.676100000739098 ], [ 266203.958999999798834, 98279.949200000613928 ], [ 266225.8443, 98293.921499999240041 ], [ 266227.269199999980628, 98294.678300000727177 ], [ 266230.076899999752641, 98292.124600000679493 ], [ 266231.346400000154972, 98291.682199999690056 ], [ 266241.924200000241399, 98281.40430000051856 ], [ 266258.189000000245869, 98265.49239999987185 ], [ 266261.7955, 98259.871799999848008 ], [ 266262.690799999982119, 98253.555800000205636 ], [ 266261.411700000055134, 98226.85249999910593 ], [ 266258.435300000011921, 98190.859600000083447 ], [ 266257.026999999769032, 98176.347300000488758 ], [ 266255.3602, 98165.298800000920892 ], [ 266237.41399999987334, 98153.191800000146031 ], [ 266218.701200000010431, 98140.723300000652671 ], [ 266201.037100000306964, 98129.017100000753999 ], [ 266185.677500000223517, 98120.435499999672174 ], [ 266184.910899999551475, 98120.300300000235438 ], [ 266180.340499999932945, 98118.864399999380112 ], [ 266179.214499999769032, 98118.442999999970198 ], [ 266169.451999999582767, 98116.383400000631809 ], [ 266158.267500000074506, 98114.168600000441074 ] ] ] ] } }

const coordinates = lowerWheatyGeojson.geometry.coordinates[0][0];
// console.log(coordinates);

const shape = new THREE.Shape();

// drawing the shape:
coordinates.forEach((coordinate, i) => {
    const offsetX = 265900;
    const offsetY = 98200;
    if (i === 0) {
        shape.moveTo(coordinate[0] - offsetX, coordinate[1] - offsetY);
    } else { 
        shape.lineTo(coordinate[0] - offsetX, coordinate[1] - offsetY);
    }
});
// console.log(shape);

const lowerWheatyGeometry = new THREE.ExtrudeGeometry(
    shape, 
    { 
    depth: 0.1, 
    bevelEnabled: false 
});
// console.log(lowerWheatyGeometry);

const lowerWheaty = new THREE.Mesh(
    lowerWheatyGeometry, new THREE.MeshBasicMaterial({
    // wireframe: true,
    color: '#118833',
    // metalness: 0,
    // roughness: 0.9,
    side: THREE.DoubleSide
}))
// console.log(lowerWheaty);
lowerWheaty.rotation.x = Math.PI * -0.5
lowerWheaty.rotation.z = Math.PI * 0.5;
lowerWheaty.position.set(0, 8, 0)
lowerWheaty.receiveShadow = true
scene.add(lowerWheaty);


// All the fields: ---------------:

// ok now just get stuff out of separate file (utm version):

// But wait... won't I want the fields separately anyway in their own variables and put the  drawing of the shape into a function?


//but this will be separated into modules anyway?
fetch('./geojson/utm/fields-fenced-area.geojson')
    .then(response => response.json()) 
    .then(geojsonData => {
        //make these to stop me getting too confused?
        const fields = {};
        fields.names = []
        fields.coordinates = [];
        // push the relevant bits:
        geojsonData.features.forEach((field, i) => {          
            // console.log(field.geometry.coordinates[0][0]);
            // console.log(field.properties.Field_Name)
            fields.names.push(field.properties.Field_Name)
            fields.coordinates.push(field.geometry.coordinates[0][0]);
        })

        //get each field's coordinates - there are 26 - ok theres a better way I know!
        const field1Coordinates = fields.coordinates[0];
        const field2Coordinates = fields.coordinates[1];
        const field3Coordinates = fields.coordinates[2];
        const field4Coordinates = fields.coordinates[3];
        const field5Coordinates = fields.coordinates[4];
        const field6Coordinates = fields.coordinates[5];
        const field7Coordinates = fields.coordinates[6];
        const field8Coordinates = fields.coordinates[7];
        const field9Coordinates = fields.coordinates[8];
        const field10Coordinates = fields.coordinates[9];
        const field11Coordinates = fields.coordinates[10];
        const field12Coordinates = fields.coordinates[11];
        const field13Coordinates = fields.coordinates[12];
        const field14Coordinates = fields.coordinates[13];
        const field15Coordinates = fields.coordinates[14];
        const field16Coordinates = fields.coordinates[15];
        const field17Coordinates = fields.coordinates[16];
        const field18Coordinates = fields.coordinates[17];
        const field19Coordinates = fields.coordinates[18];
        const field20Coordinates = fields.coordinates[19];
        const field21Coordinates = fields.coordinates[20];
        const field22Coordinates = fields.coordinates[21];
        const field23Coordinates = fields.coordinates[22];
        const field24Coordinates = fields.coordinates[23];
        const field25Coordinates = fields.coordinates[24];
        const field26Coordinates = fields.coordinates[25];


        // const shape = new THREE.Shape();

        const makeFieldShape = (coordinates) => {

            const shape = new THREE.Shape();

            if(coordinates) {
                coordinates.forEach((coordinate, i) => {
                    // These determine the centre of the scene - can it be calculated rather than hardcoded???? Is that even desirable??
                    const offsetX = 265900;
                    const offsetY = 98200;
                    //ok so this only works on each field separately because it keeps drawing from the last point!
                    if (i === 0) {
                        shape.moveTo(coordinate[0] - offsetX, coordinate[1] - offsetY);
                    } else { 
                        shape.lineTo(coordinate[0] - offsetX, coordinate[1] - offsetY);
                    }
                });
            } 
              
            const fieldMesh = new THREE.Mesh(
                new THREE.ExtrudeGeometry(shape, {
                    depth: 0.1, 
                    bevelEnabled: false
                }),
                new THREE.MeshBasicMaterial({
                    // wireframe: true,
                    color: '#55dd88',
                })
            )
            fieldMesh.rotation.x = Math.PI * - 0.5;
            fieldMesh.rotation.z = Math.PI * 0.5;
            scene.add(fieldMesh) 
        }
        // makeFieldShape(coordinates)

        // ok so these are all getting added to shape but I will also need them separately before long - at least I can see them though
        // ** AND probably?? won't even be eventually doing this anyway ...
        const field1Shape = makeFieldShape(field1Coordinates);
        // console.log(field1Shape);
        console.log(fields);
        const field2Shape = makeFieldShape(field2Coordinates);
        const field3Shape = makeFieldShape(field3Coordinates);
        const field4Shape = makeFieldShape(field4Coordinates);
        const field5Shape = makeFieldShape(field5Coordinates);
        const field6Shape = makeFieldShape(field6Coordinates);
        const field7Shape = makeFieldShape(field7Coordinates);
        const field8Shape = makeFieldShape(field8Coordinates);
        const field9Shape = makeFieldShape(field9Coordinates);
        const field10Shape = makeFieldShape(field10Coordinates);
        const field11Shape = makeFieldShape(field11Coordinates);
        const field12Shape = makeFieldShape(field12Coordinates);
        const field13Shape = makeFieldShape(field13Coordinates);
        const field14Shape = makeFieldShape(field14Coordinates);
        const field15Shape = makeFieldShape(field15Coordinates);
        const field16Shape = makeFieldShape(field16Coordinates);
        const field17Shape = makeFieldShape(field17Coordinates);
        const field18Shape = makeFieldShape(field18Coordinates);
        const field19Shape = makeFieldShape(field19Coordinates);
        const field20Shape = makeFieldShape(field20Coordinates);
        const field21Shape = makeFieldShape(field21Coordinates);
        const field22Shape = makeFieldShape(field22Coordinates);
        const field23Shape = makeFieldShape(field23Coordinates);
        const field24Shape = makeFieldShape(field24Coordinates);
        const field25Shape = makeFieldShape(field25Coordinates);
        const field26Shape = makeFieldShape(field26Coordinates);
    

        // const fieldsMesh = new THREE.Mesh(
        //     new THREE.ExtrudeGeometry(shape, {
        //         depth: 0.1, 
        //         bevelEnabled: false
        //     }),
        //     new THREE.MeshBasicMaterial({
        //         // wireframe: true,
        //         color: '#55dd88',
        //         // metalness: 0,
        //         // roughness: 0.9,
        //         // side: THREE.DoubleSide
        //     })
        // )

        // fieldsMesh.rotation.x = Math.PI * -0.5
        // // field1Mesh.position.set(-20, -0.1, 20)
        // // field1Mesh.receiveShadow = true
        // scene.add(fieldsMesh);

    });



/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xfff0dd, 3.8)
directionalLight.castShadow = true
// mipmapping so MUST be power of 2:
directionalLight.shadow.mapSize.set(512, 512)
directionalLight.shadow.camera.far = 200
directionalLight.shadow.camera.left = - 10
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 10
directionalLight.shadow.camera.bottom = - 15
// control blur (does not work on PCFSoftShadowMap):
// directionalLight.shadow.radius = 10
directionalLight.position.set(0, 15, -100)
scene.add(directionalLight)

// Helpers
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.8)
// scene.add(directionalLightHelper);
// directionalLightHelper.visible = false;

// gui.add(directionalLightHelper, 'visible').name('directionalLightHelper')

// const directionalLightShadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightShadowCameraHelper)
// directionalLightShadowCameraHelper.visible = false;
// // console.log(directionalLightShadowCameraHelper)

// gui.add(directionalLightShadowCameraHelper, 'visible').name('dirLightShadowCamHelper')

// gui.add(ambientLight, 'intensity').min(0).max(5).step(0.0001).name('ambientIntensity');
// gui.add(directionalLight, 'intensity').min(0).max(5).step(0.0001);



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 50, 3000)
camera.position.set(20, 900, 20)
scene.add(camera)

console.log(camera.position.x)

const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Sky
 */
// const sky = new Sky()
// sky.scale.set(500, 500, 500)
// scene.add(sky)
// // These are shader things!!: they can be used just as .property but using theses key array thingies is the convention:
// sky.material.uniforms['turbidity'].value = 6
// sky.material.uniforms['rayleigh'].value = 1
// sky.material.uniforms['mieCoefficient'].value = 0.7
// sky.material.uniforms['mieDirectionalG'].value = 0.8
// sky.material.uniforms['sunPosition'].value.set(0.3, 0.03, -10.0)


/**
 * Fog
 */
//Fog() params are color, near and far - Opacity:
// scene.fog = new THREE.Fog('#ff0000', 1, 13)
//alternative - more realistic - params color and density
// scene.fog = new THREE.FogExp2('#333c43', 0.01)

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
let foxWalkSpeed = 1.5;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // // Update mixer (but mixer will always be null because the animation takes time to load so this code gets reached first)
    // if (foxMixer !== null) {

    //     foxMixer.update(deltaTime * 0.5)
    //     // console.log(foxMixer)
    // }
    
    // // console.log(foxModel)
    // if (foxModel) {
    //     if (elapsedTime <= 5){
    //         foxStand.play()
    //     } else if (elapsedTime > 5 ){
    //         //this literally stops everything...:
    //         // foxMixer.stopAllAction()
    //         foxWalk.play()
    //         foxModel.position.z += deltaTime * foxWalkSpeed * 0.5
    //         // Bye, fox!!
    //     } // there are better ways? -see AnimationMixer in the docs..
    // }
    
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()