import { Component, OnInit } from '@angular/core';
import { CarDetailsService } from '../../services/commonBlotter.service';


// declare var __moduleName: string;

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
 
];

@Component({
  selector: 'app-commonblotter',
  // moduleId: __moduleName,
  templateUrl: 'commonblotter.component.html',
  styleUrls: ['commonblotter.component.css']
})
export class CommonBlotterComponent implements OnInit {
  public moduleArr = ["Module1","Module2","Module3"];
  public viewArr = ["View1","View2","View3"];
  public branchArr = ["Branch1","Branch2","Branch3"];
  public item: string;
  public filterValue = {
    "Module":null,
    "View":null,
    "Branch":null,
    
  }

 

  onClick(){
    console.log(this.filterValue);
  }
  public rowData = [];

  constructor(private _carService: CarDetailsService) { }
  
  columnDefs = [
    { headerName: "Car", field: 'make', filter: 'agTextColumnFilter', sortable: true, checkboxSelection: true},
    { headerName: "Model", field: 'model', filter: 'agTextColumnFilter', sortable: true },
    { headerName: "Price", field: 'price', filter: 'agNumberColumnFilter', sortable: true},
    { headerName: "Date", field: 'Date', filter: 'agDateColumnFilter', sortable: true },
    { headerName: "Car", field: 'make', filter: 'agTextColumnFilter', sortable: true },
    { headerName: "Model", field: 'model', filter: 'agTextColumnFilter', sortable: true },
    { headerName: "Price", field: 'price', filter: 'agNumberColumnFilter', sortable: true},
    { headerName: "Date", field: 'Date', filter: 'agDateColumnFilter', sortable: true },
    { headerName: "Car", field: 'make', filter: 'agTextColumnFilter', sortable: true },
    { headerName: "Model", field: 'model', filter: 'agTextColumnFilter', sortable: true },
    { headerName: "Price", field: 'price', filter: 'agNumberColumnFilter', sortable: true},
    { headerName: "Date", field: 'Date', filter: 'agDateColumnFilter', sortable: true },
    { headerName: "Car", field: 'make', filter: 'agTextColumnFilter', sortable: true },
    { headerName: "Model", field: 'model', filter: 'agTextColumnFilter', sortable: true },
    { headerName: "Price", field: 'price', filter: 'agNumberColumnFilter', sortable: true},
    { headerName: "Date", field: 'Date', filter: 'agDateColumnFilter', sortable: true } 
];






  ngOnInit() {
   this._carService.getcars().subscribe(data=> this.rowData = data);
  
  }

}


