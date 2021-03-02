import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, SimpleChanges } from '@angular/core';

import { FieldComponent } from '../../base/iField';

@Component( {
    selector: 'iCompare',
    templateUrl: 'iCompare.html',
    inputs: ['headWidth', 'gridHeight', 'headerData', 'rowHeight', 'colWidth','headerData', 'dataItemList'],
    styleUrls: ['iCompare.css']

} )

export class CompareComponent extends FieldComponent {

    public dataList: any = [];
    public headerData: any = [];    
    public gridHeight: string = '25vw';
    public rowHeight: string = '1vw';
    public colWidth: string = '10vw';
    public headWidth: string = '90vw';
    dataItemList = [];
    public advSearchLabelType: any;
    labelPrefix: string = "";   
    public compareList: any = [];

    constructor( _renderer: Renderer2, _elementRef: ElementRef ) {
        super( _renderer, _elementRef );
    }


    ngOnInit() {
        if ( this.requestType && this.requestType.length > 0 ) {
            this.loadData();
        } else if (this.dataItemList && this.dataItemList.length != 0 ) {
            this.dataList = this.dataItemList[1];
            this.headerData = this.dataItemList[0];
            for(let k = 0; k < this.dataItemList[1].length; k++){
                this.compareList.push(Array(this.headerData.length).fill('same-text'));
            }
            this.compareData();              
        }  
    }

     compareData() {      
         if ( this.dataList.length > 1 ) {
             for ( let i = 0; i < (this.dataList.length-1); i++ ) {
                 for ( let j = 0; j < this.headerData.length; j++ ) {
                     if (this.dataList[i][j] != this.dataList[i + 1][j]) {
						this.compareList[i][j] = "diff-text";
						this.compareList[i + 1][j] = "diff-text";
					}
					else{
						this.compareList[i][j] = "same-text";
						this.compareList[i + 1][j] = "same-text";
					}
                 }
             }
         }
 
     }

    loadData() {
        if ( this.requestType && this.requestType.length > 0 ) {
            this.globalService.progressMode = "indeterminate";
            this.dataService.getData( this.contextUrl + this.requestType, '' ).subscribe(( listItems: any[] ) => {                
                    this.dataList = listItems[1];                   
                    this.headerData = listItems[0];   
                    this.compareData();    
                    this.globalService.progressMode = "";
            } );
            setTimeout(() => {
                this.globalService.progressMode = "";
            }, 8000 );
        }
    }
    
    

    /**
     * To get only number(X) from the measurement data( X%,Xpx,Xvw,Xvh).
     */
    parseNumber( val: string ) {
        let valNum: number = 0;
        let len: number = val.length;
        if ( val.indexOf( "%" ) > 0 ) {
            valNum = Number( val.substring( 0, len - 1 ) );
        } else if ( val.indexOf( "px" ) > 0 || val.indexOf( "vw" ) > 0 || val.indexOf( "vh" ) > 0 ) {
            valNum = Number( val.substring( 0, len - 2 ) );
        } else {
            valNum = Number( val );
        }
        return valNum;
    }

    /**
     *  This method  will call automatically when data changes, grid is refreshed.
     */
    ngOnChanges( changes: SimpleChanges ){
        // To get the headerName 
        if ( this.advSearchLabelType && this.advSearchLabelType.length > 0 ) 
            this.labelPrefix = this.inputParams.moduleType + "." + this.advSearchLabelType + ".";
    }

}