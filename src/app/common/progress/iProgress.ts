import {Component, Input} from '@angular/core';

// declare var __moduleName: string;

@Component({
// moduleId: __moduleName,
    selector: 'iProgress',
    templateUrl: 'iProgress.html',
    styleUrls: ['iProgress.css'],
    inputs: ['layout', 'progressMode']
})
export class ProgressBarComponent {
    
    layout: string;
    progressMode: string;
    public determinateValue: number = 0;
    
}