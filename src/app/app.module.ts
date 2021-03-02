import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, Injector, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { CommonBlotterComponent } from '../app/components/commonblotter/commonblotter.component';

import { CarDetailsService } from '../app/services/commonBlotter.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { appRoutingProviders, routing } from './app.routing';
import { WidgetsModule } from './modules/widgets.module';
import { ContainerModule } from './modules/container.module';
import { Router } from '@angular/router';
import { ProgressBarComponent } from './common/progress/iProgress';
import { PageLoaderComponent } from './page.loader';
import { DataService } from './services/data.service';
import { EntitlementService } from './services/entitlement.service';
import { GlobalHelpService } from './services/global.help';
import { GlobalService } from './services/global.service';
import { GlobalStyleComponent } from './services/global.style';
import { ServiceLocator } from './services/locator.service';
import { PreferencesService } from './services/preferences.service';
import { TreasuryHomeComponent } from './treasury.home';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.main';

//AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, 'i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        MaterialModule,
        HttpClientModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        routing,
        WidgetsModule,
        ContainerModule,
        BrowserAnimationsModule
    ],
    exports: [
        TreasuryHomeComponent, PageLoaderComponent, ProgressBarComponent, AppComponent, CommonBlotterComponent
    ],
    declarations: [
        TreasuryHomeComponent, PageLoaderComponent, ProgressBarComponent, AppComponent, CommonBlotterComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
        appRoutingProviders, DataService, GlobalService, GlobalHelpService, GlobalStyleComponent, PreferencesService,
        EntitlementService, ProgressBarComponent, CarDetailsService, { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    entryComponents: [TreasuryHomeComponent],
    bootstrap: [TreasuryHomeComponent]
})

export class AppModule {
    //Required to instantiate all common services in Base class iField
    constructor(private injector: Injector, private router: Router, private _http: HttpClient) {
        ServiceLocator.injector = this.injector;
    }
}
