import * as THREE from 'three';
import Experience from "../Experience";
import Fields from './Fields';


export default class TimelineController {
    constructor() {
        console.log('user controls')
        // dont forget Experience is a singleton:
        this.experience = new Experience();
        this.scene = this.experience.scene;

        //will need this because of using different Fields methods- do i need trigger() again in Fields, and on() here? Yes?, if its used in theconstructor here??? ....So far it seems not...
        this.fields = new Fields();
        // console.log(this.fields)

        // will need to make the controls - 
        this.timelineControls()

    }

    // make the necessary html here
    // this function does too much?? 
    timelineControls() {
        // will probs need to tidy h1 and para into a div:
        const yearHeading = document.createElement('h1');
        yearHeading.id = 'yearHeading';
        yearHeading.innerText = '2008';
        document.body.appendChild(yearHeading);

        const explanation = document.createElement('p');
        explanation.id = 'explanation';
        explanation.innerText = 'Initial surveys this year. Planned zooming in on the site from the world/3D Rothamsted logo would end here - maybe show the actual farm in an illustrative way like the Chartogne Taillet site.';
        document.body.appendChild(explanation);

        // make my timeline control from scratch: pretty certain the input should be in a form element for accessibility

        const timelineContainer = document.createElement('form');
        timelineContainer.id = 'timelineContainer';
        document.body.appendChild(timelineContainer)

        const timelineInput = document.createElement('input');
        timelineInput.type = 'range';
        timelineInput.id = 'range';
        timelineInput.min = '2008';
        timelineInput.max = '2025';

        const datalist = document.createElement('datalist');
        datalist.id = 'years';


        const timelineValues = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]

        timelineValues.forEach((year) => {
            const option = document.createElement('option');
            option.id = `${year}`;
            option.value = `${year}`;
            option.label = `${year}`;
            datalist.appendChild(option);
            console.log(option.label)
        })

        timelineContainer.appendChild(datalist)
        timelineInput.setAttribute('list', 'years');
        timelineContainer.appendChild(timelineInput);
        

        //listen to the input
        timelineInput.addEventListener('input', (event) => {
            // console.log('moved')
            // console.log(event.target.value)
            //change the heading:
            yearHeading.innerText = `${event.target.value}`;

            // decide what year it is and set stuff to happen:
            // is using switch here the best way???? Pete?: 
            // will also need to be controlled by scrolling - should they be separate functions instead? 
            // will need to allow for going backwards in time too 
            // Should all this stuff be made into functions and moved into timeline Events Class for neatness?
            // Also, the eventual text content will be kept separately, accessed via Resources class 
            // Will leave paragraphs in here for now, though.
            // Also need to work out how to dispose of things properly on each case switch. 

            switch (event.target.value) {
                // all the years!
                case '2008':
                    console.log('2008 clicked');
                    // Initial surveys
                    explanation.innerText = 'Initial surveys this year. Planned zooming in on the site from the world/3D Rothamsted logo would end here - maybe show the actual farm in an illustrative way like the Chartogne Taillet site.';
                    break;

                case '2009':
                    console.log('2009 clicked');
                    // Enviromental surveys
                    explanation.innerText = 'Environmental surveys description, illustrated by really nice animation of nature etc in three.js. A change of pace.';
                    break;

                case '2010':
                    // console.log('2010 clicked');
                    // Planning consent!!
                    // Construction begins - animation.
                    // Drains and flumes
                    // Lab facilities created
                    
                    explanation.innerText = 'Planning consent obtained. Construction begins. Diagrammatic appearance in contrast to 2009, but still animated - ie boundaries appear and then lower into position, followed by French drains, flumes etc';
                    this.fields.drawSelectedFieldsBoundaries(this.fields.baselineFields2010, '#225511', 8)
                    this.fields.makeSelectedFields(this.fields.baselineFields2010, '#00ff99', 0);
                    break;

                case '2011':
                    // Data collection begins
                    explanation.innerText = 'Data collection begins. Make a visual contrast to 2010 - illustrate by a brief animation (semi-abstract)?';
                    break;

                case '2012':
                    //Water flow/properties data begins
                    explanation.innerText = 'Water properties and flow data collection begins. Very brief animation like 2011?';
                    break;

                case '2013':
                    // console.log('2013 clicked');
                    // First system change implemented, 
                    // reseeding begins
                    // New cattle buildings x 3 - dedicated system housing, silage, manure
                    // Met data begins
                    explanation.innerText = 'Explain the 3 farmlet systems. Zoom in on TopBurrows/Burrows changes. Also show/explain new buildings, start of reseeding, met data collection begins.';

                    
                    // EXPERIMENTING WITH DISPOSAL:
                    // ok this disposal isn't working properly, as in, the page has to refresh to see the changes (deletion), so I need the tick to reapply????
                    // I REMEMBER - need to update it in the tick function!! Need to rewatch video 26.

                    // Bruno Simon dispose method:
                    // Traverse the whole scene
                    this.scene.traverse((child) =>
                        {
                            // need these to switch on again
                            // this.sizes.off('resize')
                            // this.time.off('tick')

                            console.log(child);
                            // Test if it's a mesh
                            if(child instanceof THREE.Mesh)
                            {
                                child.geometry.dispose()
                
                                // Loop through the material properties
                                for(const key in child.material)
                                {
                                    const value = child.material[key]
                
                                    // Test if there is a dispose function
                                    if(value && typeof value.dispose === 'function')
                                    {
                                        value.dispose()
                                    }
                                }
                            }
                        })



                    this.fields.drawSingleFieldBoundary(16, '#ffffff', 10)

                    this.fields.makeSingleField(20, '#225522', 2)

                    this.fields.makeSelectedFields(this.fields.greenFields2013, '#009911', 3);
                    this.fields.makeSelectedFields(this.fields.blueFields2013, '#005599', 3);
                    this.fields.makeSelectedFields(this.fields.redFields2013, '#ff0033', 3);
                    break;

                case '2014':
                    // reseeding
                    // solar radiation measurements
                    //improved rain gauge accuracy
                    explanation.innerText = 'Map - Reseeding. Also solar radiation measurements, improved rain gauge accuracy';
                    break;

                case '2015':
                    // reseeding
                    // Orchard Dean split into North and South
                    explanation.innerText = 'Map - Reseeding. Zoom in on Orchard Dean split - and explain';
                    this.fields.drawSelectedFieldsBoundaries(this.fields.orchardDeanSplit2015, '#ffffff', 10)

                    break;

                case '2016':
                    // Triplet system
                    explanation.innerText = 'Map - Big explanation of triplet system implemented this year';
                    break;

                case '2017':
                    // Equipment upgrades
                    explanation.innerText = 'Equipment upgrades - limit explanation to text?';
                    break;

                case '2018':
                    explanation.innerText = 'Equipment upgrade - again limit explanation to text? Consider how to handle years that have fewer events';
                    break;

                case '2019':
                    // Second system change:
                    // red cattle housed - Brown system
                    // red sheep removed
                    // small ruminant facility built
                    // Pecketsford combined
                    explanation.innerText = 'Another big year. Red system becomes arable with red cattle moved to Brown housed system on different site. (Red sheep removed) Zoom in on Pecketsford (now combined)?. Also show/explain new small ruminant facility.';
                    break;

                case '2020':
                    // Sowing of red system - Winter Wheat
                    // Twin management of green and blue
                    explanation.innerText = 'Red sown with winter wheat, twin management of green and blue';
                    break;

                case '2021':
                    // Sowing of red system - Winter Oats
                    explanation.innerText = 'Red sown with winter oats';
                    break;

                case '2022':
                    // Sowing of red system - Winter Wheat - No Plough (min till)
                    explanation.innerText = 'Red sown with winter wheat. Explain minimum tillage.';
                    break;

                case '2023':
                    explanation.innerText = 'Red sown with? Any other changes?';
                    break;

                case '2024':
                    explanation.innerText = 'Timeline ends here? Map becomes interactive (click on individual fields for stats, links to data etc) Option to return to timeline.';
                    break;

                default:
                    //what, anything?
                    break;
            }  
            
        })

    }

}
