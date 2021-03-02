import {Component, OnInit, EventEmitter, Output, Input, ElementRef, Renderer2} from "@angular/core";
import {FieldComponent, MakeProvider} from '../../base/iField';

// declare var __moduleName: string;

@Component({
// moduleId: __moduleName,
    selector: 'iToolbar',
    templateUrl: 'iToolbar.html',
    styleUrls: ['iToolbar.css'],
    inputs: ['status', 'toolbarList', 'formvalid'],
	outputs: ['toolbarEvent','submissionValue'],
    providers: [MakeProvider(ToolbarComponent)],
})
//This component is built for ToolBar for Actions
export class ToolbarComponent extends FieldComponent implements OnInit {
    
    public actionList: any;
    pathInfo: string;
	formvalid: boolean= false;
    flag: boolean = false;
    toolbarPath: string;

    submissionValue = new EventEmitter<string>();
    toolbarEvent = new EventEmitter<string>();
    
    constructor(renderer: Renderer2, elementRef: ElementRef){
        super(renderer, elementRef);
    }
    
    ngOnInit() {
        //Getting Toolbar actions based on request Type
        this.dataService.getListItems(this.requestType).subscribe((listItems: any) => {

            listItems.map((item)=>{
                if(item.imagePath){
                    item.imagePath = 'assets/' + item.imagePath; 
                }
            });
            
            this.actionList = listItems;
        });

    }


    //On click of any actions sending Path to perform operation
    onClick(path, disabled) {
        this.toolbarPath = path;		
        this.flag = !disabled;
        this.toolbarEvent.emit();
		/*if(this.flag){
			
		}*/
    }

    //Sending the action path to Component (Example : Deal Capture)
    onConfirmation(value) {
        this.flag = !this.flag;
		console.log("onChange  toolbar: ",value);
        if (value == true) {
            this.submissionValue.emit(this.toolbarPath);
        }
    }
}