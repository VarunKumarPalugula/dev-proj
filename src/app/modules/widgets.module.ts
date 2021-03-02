import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { BasicModule } from '../modules/basic.module';

import { WidgetContainerComponent } from '../common/widgetcontainer/iWidgetContainer';
import { MaximizeComponent } from '../common/maximizeWidget/iMaximize';

import { BarchartComponent } from '../widgets/barchart/barchart.component';
import { LineComponent } from '../widgets/linechart/linechart.component';
import { PiechartComponent } from '../widgets/piechart/piechart.component';
import { SunburstComponent } from '../widgets/sunburst/sunburst.component';
import { StackedBarsComponent } from '../widgets/stackedBars/stackedBars.component';
import { HeatmapComponent } from '../widgets/heatmap/heatmap.component';
import { Surface3DComponent } from '../widgets/surface3D/surface3D.component';
import { MultiLineZoomComponent } from '../widgets/MultiLineZoom/MultiLineZoom';
import { RadialComponent } from '../widgets/radialprogress/radialprogress.component';

import { DashboardComponent } from '../components/Analytics/Dashboard';
import { HorizontalStackedBarComponent } from '../widgets/horizontalStackedBar/horzStackedBar.component';
import { MaterialModule } from '../material.module';

@NgModule( {
    imports: [
        CommonModule,
        TranslateModule,
        MaterialModule,
        BasicModule
    ],
    exports: [
        BarchartComponent, LineComponent, PiechartComponent, SunburstComponent, StackedBarsComponent,
        HeatmapComponent, Surface3DComponent, MultiLineZoomComponent, RadialComponent, WidgetContainerComponent,
        MaximizeComponent, DashboardComponent,HorizontalStackedBarComponent
    ],
    declarations: [
        BarchartComponent, LineComponent, PiechartComponent, SunburstComponent, StackedBarsComponent,
        HeatmapComponent, Surface3DComponent, MultiLineZoomComponent, RadialComponent, WidgetContainerComponent,
        MaximizeComponent, DashboardComponent,HorizontalStackedBarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
} )

export class WidgetsModule {}