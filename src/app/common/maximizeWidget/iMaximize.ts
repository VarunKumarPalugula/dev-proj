import { Component, Input, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { GlobalStyleComponent } from '../../services/global.style';
import { TranslateService } from '@ngx-translate/core';
import { IconComponent } from '../../common/icon/iIcon';

@Component({
    // moduleId: __moduleName,
    selector: 'iMaximize',
    templateUrl: 'iMaximize.html',
    styleUrls: ['iMaximize.css'],
    inputs: ['modalFlag', 'popUpType', 'title', 'popUpHeight', 'popUpWidth', 'actionType']
})

//This component is built for Rate Values 
export class MaximizeComponent implements OnInit {

    // public __moduleName: string;
    modalFlag: boolean;
    popType: string;
    popUpType: string;

    constructor(private globalStyle: GlobalStyleComponent, @Inject(TranslateService) translate: TranslateService) { }
    @Output() popupclick = new EventEmitter<string>();

    ngOnInit() {
        if (this.popUpType != 'undefined') {
            this.popType = this.popUpType;
        }
    }

    // This methode send the value to the Component
    onConfirmation(value) {
        this.modalFlag = !this.modalFlag;
        this.popupclick.emit(value);
    }
}