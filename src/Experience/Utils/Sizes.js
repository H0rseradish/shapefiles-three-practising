import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor() 
    {
        // Needed to reference the constructor of the inherited class:
        super();
        // console.log('Sizes, go');

        // Setup: 
        // size to be the viewport size:
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        // pixel ratio to be max of 2:
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        // Resize event
        window.addEventListener('resize', () =>
        {
            // Update sizes on the resize event
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);

            // using trigger() from EventEmitter to tell other locations that resize event has occurred:
            this.trigger('resize')
        })

    }
}