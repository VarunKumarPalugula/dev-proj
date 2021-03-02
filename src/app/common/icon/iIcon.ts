import {Component, Input, Output, EventEmitter, Renderer2, ElementRef} from '@angular/core';
import {FieldComponent} from '../../base/iField';

// declare var __moduleName: string;

@Component({
// moduleId: __moduleName,
    selector: 'iIcon',    
    templateUrl: "iIcon.html",
    inputs: ['color', 'bgcolor', 'ilabel', 'itype'],
	outputs: ['handleClickEvent'],
	styleUrls:['iIcon.css']
})
//This component is used to build the Icon
export class IconComponent extends FieldComponent {
    	
	public color: string = "";
	public bgcolor: string = "transparent";
	public ilabel: string = "";
	public itype: string = "component"; // menu, component, toolbar, application
	public classType: string="";
	
	private handleClickEvent: EventEmitter<any> = new EventEmitter();

    constructor(_renderer: Renderer2, _elementRef: ElementRef){
        super(_renderer, _elementRef);
		
		this.size = "1.7";
	    this.placeholder = "";   
    }
	
	ngOnInit(){
		
	    if(this.itype=='application')
			this.classType = 'ticon';
		else if(this.itype=='menu')
			this.classType = 'tmenuicon';
        else if(this.itype=='error')
            this.classType = 'terroricon';
		else
			this.classType = 'tcompicon';
	}
	
	handleEvent($event){
		console.log("Icon handle event called: " + this.disabled);
		if (!this.disabled){
			console.log("Icon - Event emitted ", $event);
			this.handleClickEvent.emit({"value" : this.placeholder});
		}
	}
}