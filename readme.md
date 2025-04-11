# Practising techniques 
Use shapefiles converted into geojson utm to build a visualisation of a farm, while following the three.js journey course by Bruno Simon 
https://threejs-journey.com


## From Three.js Journey by Bruno Simon:

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```


## Use of chatgpt:

### Refactoring:
Hi chat, I am refactoring my spaghetti three.js app into modules/classes. There is a single huge file of  geojson data that I fetching and using to draw geometries - they are fields on a farm, 21 in total. I will need to have these fiels separately in my app to do various things with them. At the moment I am doing everything within the fetch. How do I separate this out into a class so my geojson fields are available wherever I want them? (sic)

#### Code Suggested by chatgpt:
// FieldManager.js
export default class FieldManager {
  constructor(geoJsonUrl) {
    this.geoJsonUrl = geoJsonUrl;
    this.fields = []; // Array of objects, each field with geometry + properties
    this.loaded = false;
  }

  async load() {
    const response = await fetch(this.geoJsonUrl);
    const geojson = await response.json();

    this.fields = geojson.features.map((feature, index) => {
      const geometry = this.convertGeoJSONToGeometry(feature.geometry);
      return {
        id: feature.properties.id || index,
        name: feature.properties.name || `Field ${index + 1}`,
        geometry,
        properties: feature.properties
      };
    });

    this.loaded = true;
  }

  convertGeoJSONToGeometry(geo) {
    // Convert geoJSON Polygon/MultiPolygon to THREE.Shape/Geometry
    // Example for simple polygons:
    const shape = new THREE.Shape();

    geo.coordinates[0].forEach(([x, y], i) => {
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });

    return shape;
  }

  getFieldById(id) {
    return this.fields.find(field => field.id === id);
  }

  getAllFields() {
    return this.fields;
  }
}

And, as a second step:

// main.js
import FieldManager from './FieldManager.js';

const fieldManager = new FieldManager('path/to/your/fields.geojson');

await fieldManager.load(); // load the data before you use it

const allFields = fieldManager.getAllFields();
allFields.forEach(field => {
  const geometry = new THREE.ShapeGeometry(field.geometry);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});

