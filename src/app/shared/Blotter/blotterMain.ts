import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { BlotterModule } from './blotterApp/blotter.module';

//enableProdMode();

platformBrowserDynamic().bootstrapModule(BlotterModule, [ 
    // {provide: APP_BASE_HREF, useValue: '/ucf/app/shared/Blotter/'}
]);