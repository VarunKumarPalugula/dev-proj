import {Component,Renderer2, ElementRef} from '@angular/core';
import { FieldComponent } from '../../../base/iField';


@Component({
    selector: 'blotterMain',
    templateUrl: 'blotter.main.html'
})

export class BlotterMainComponent extends FieldComponent { 
    
    constructor(_renderer: Renderer2, _elementRef: ElementRef) {
        super(_renderer, _elementRef);  
	}    
}