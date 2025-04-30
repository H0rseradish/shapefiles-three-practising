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
        this.makeUserControls()

    }

    // make the necessary html here
    makeUserControls() {
        // const timeControls = document.getElementById('time-controls');
        // const button2011 = document.getElementById('2011');
        // const button2016 = document.getElementById('2016');
        // const explanation = document.createElement('p');

        //make my timeline control from scratch: pretty certain the input should be in a form element for accessibility
        const yearHeading = document.createElement('h1');
        yearHeading.id = 'yearHeading';
        yearHeading.innerText = '2008';
        document.body.appendChild(yearHeading)

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
            yearHeading.innerText = `${event.target.value}`

            // decide what year it is and set stuff to happen:
            // is using switch here the best way???? Pete?: 
            // will also need to be controlled by scrolling - should they be separate functions instead? 
            // will need to allow for going backwards in time too 
            //should all this stuff be made into functions and moved into timeline Events Class for neatness?
            switch (event.target.value) {
                // all the years!
                case '2008':
                    console.log('2008 clicked');
                    // Initial surveys
                    break;

                case '2009':
                    console.log('2009 clicked');
                    // Enviromental surveys
                    break;

                case '2010':
                    // console.log('2010 clicked');
                    // Planning consent!!
                    // Construction begins - animation.
                    // Drains and flumes
                    // Lab facilities created
                    this.fields.makeSelectedFields(this.fields.baselineFields2010, '#00ff99', 0);
                    break;

                case '2011':
                    console.log('2011 clicked');
                    // Data collection begins
                    break;

                case '2012':
                    console.log('2009 clicked');
                    //Water flow/properties data begins
                    break;

                case '2013':
                    // console.log('2013 clicked');
                    // First system change implemented, 
                    // reseeding begins
                    // New cattle buildings x 3 - dedicated system housing, silage, manure
                    // Met data begins
                    this.fields.makeSelectedFields(this.fields.greenFields2013, '#009911', 3);
                    this.fields.makeSelectedFields(this.fields.blueFields2013, '#005599', 3);
                    this.fields.makeSelectedFields(this.fields.redFields2013, '#ff0033', 3);
                    break;

                case '2014':
                    console.log('2009 clicked');
                    // reseeding
                    // solar radiation measurements
                    //improved rain gauge accuracy
                    break;

                case '2015':
                    console.log('2009 clicked');
                    // reseeding
                    // Orchard Dean split into North and South
                    break;

                case '2016':
                    console.log('2009 clicked');
                    // Triplet system
                    break;

                case '2017':
                    console.log('2009 clicked');
                    break;

                case '2018':
                    console.log('2009 clicked');
                    break;

                case '2019':
                    console.log('2009 clicked');
                    // Second system change:
                    // red cattle housed - Brown system
                    // red sheep removed
                    // small ruminant facility built
                    // Pecketsford combined
                    break;

                case '2020':
                    console.log('2009 clicked');
                    // Sowing of red system - Winter Wheat
                    // Twin management of green and blue
                    break;

                case '2021':
                    console.log('2009 clicked');
                    // Sowing of red system - Winter Oats
                    break;

                case '2022':
                    console.log('2009 clicked');
                    // Sowing of red system - Winter Wheat - No Plough (min till)
                    break;

                case '2023':
                    console.log('2009 clicked');
                    break;

                case '2024':
                    console.log('2009 clicked');
                    break;

                default:
                    //what, anything?
                    break;
            }  
            
        })

        // // experimenting:
        // button2011.addEventListener('click', () => {
        //     explanation.innerText = '';
        //     console.log('clicked')
        //     this.fields.makeAllFields2();
        // })

        // button2016.addEventListener('click', () => {
        //     explanation.innerText = '';
        //     console.log('clicked')
        //     this.fields.makeSingleField(6, '#0000ff');
        //     // console.log(timeControls.innerHTML);
        //     timeControls.appendChild(explanation);
        //     explanation.innerText = 'A single field'
        // })
    }

    timelineController() {

    }
}
