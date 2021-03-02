import { Component,Inject } from '@angular/core';
import {GlobalStyleComponent} from './services/global.style';
import {GlobalService} from './services/global.service';

// declare var __moduleName: string;
@Component({
  // moduleId: __moduleName,
  selector: 'my-app',
  templateUrl: 'treasury.home.html'
})

export class TreasuryHomeComponent {
   //public __moduleName: string;
  constructor(@Inject(GlobalStyleComponent) private globalStyle: GlobalStyleComponent,@Inject(GlobalService) private globalService: GlobalService){}
}