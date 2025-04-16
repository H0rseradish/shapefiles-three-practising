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


#### Code used that was suggested by chatgpt:
  async load() {
    const response = await fetch(this.geoJsonUrl);
    const geojson = await response.json();
  }

  Also the shape build loop offset

    

