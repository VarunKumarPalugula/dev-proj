import {Component,Renderer2, ElementRef} from '@angular/core';


@Component({
    selector: 'blotterMain',
    templateUrl: 'blotter.main.html'
})

export class BlotterMainComponent  { 
    
    constructor(_renderer: Renderer2, _elementRef: ElementRef) {
        super(_renderer, _elementRef);  
	}    
}