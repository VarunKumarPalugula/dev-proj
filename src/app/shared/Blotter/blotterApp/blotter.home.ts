import {Component,OnInit} from '@angular/core';
import {  Router } from '@angular/router';

// declare var __moduleName: string;

@Component({    
//   moduleId: __moduleName,
  selector: 'blotter-app',
  templateUrl: 'blotter.home.html'
})

export class BlotterHomeComponent implements OnInit { 
    
    quryParam:any;
    constructor(private router: Router,) {}
    
	getParameterByName(name, url) {
        if (!url) url = window.location.href;
        console.log("-- url ",url);
        name = name.replace(/[\[\]]/g, "\\$&");
        console.log("-- name  ",name);
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        console.log("-- results ",results);
        return {"report":decodeURIComponent(results[2].replace(/\+/g, " "))};
    }
   
    ngOnInit() {
       // this.quryParam = this.getParameterByName('blotter');
       // this.router.navigate(['/blotter'], { queryParams: this.quryParam });
        this.router.navigate(['/blotter/FI_POS_BLTR']);

    }
 
}