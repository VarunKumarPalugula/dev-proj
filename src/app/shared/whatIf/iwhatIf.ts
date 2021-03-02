import { Component, Renderer2, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FieldComponent } from '../../base/iField';

@Component({
    selector: 'iWhatIf',
    templateUrl: 'iWhatIf.html',
    inputs: ['whatIfResponce'],
    outputs: ['iWhatIfEvent'],
    styleUrls: ['iWhatIf.css']
})
//This component is built for WhatIf frame
export class WhatIFComponent extends FieldComponent {

    public materials: any = [];
    public headers: string[] = [];
    pagedMaterials: any = [];
    public whatIfResponce: any;
    public whatIfDataList: any = [[
        { "header": "MESSAGE", "divisor": "0.0", "precision": "0", "dataType": "NAN", "width": 0, "isSearchable": "false", "fieldType": "LBL" },
        { "header": "DESCRIPTION", "divisor": "0.0", "precision": "0", "dataType": "NAN", "width": 100, "isSearchable": "false", "fieldType": "LBL" },
        { "header": "LIMIT", "divisor": "0.0", "precision": "0", "dataType": "NAN", "width": 0, "isSearchable": "false", "fieldType": "CLRWTEXT" }
    ]];    

    iWhatIfEvent: EventEmitter<any> = new EventEmitter();

    constructor(renderer: Renderer2, elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        this.createDataList();
    }    
    
    createDataList() {
        let tempArr = [];
        let tempArr1 = [];
        for (let property1 of this.whatIfResponce) {
            tempArr1 = [];
            for (let property2 in property1) {
                if (property2 == "LIMIT") {
                    if (!property1[property2])
						tempArr1.push({ "COLOR": "RED", "TEXT": "LIMIT BURST" });
					else
						tempArr1.push({ "COLOR": "GREEN", "TEXT": "IN LIMIT" });
                }
                else {
                    tempArr1.unshift(property1[property2]);
                }
            }
            tempArr.push(tempArr1);
        }
        this.whatIfDataList.push(tempArr);
    }
    

}