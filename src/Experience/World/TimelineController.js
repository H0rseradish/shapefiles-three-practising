import * as THREE from 'three';
import Experience from "../Experience";
import Fields from './Fields';


export default class TimelineController {
    constructor() {
        console.log('user controls')
        // dont forget Experience is a singleton:
        this.experience = new Experience();
        this.scene = this.experience.scene;

        //will need this because of using different Fields methods- do i need trigger() again in Fields, and on() here? Yes?, if its used in theconstructor here???
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
        yearHeading.innerText = '';
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
            //decide what year it is and set stuff to happen: 
            switch (event.target.value) {
                case '2011':
                    console.log('2011 clicked');
                    this.fields.makeAllFields2();
                    break;

                    
            
                default:
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
