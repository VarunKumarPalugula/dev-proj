System.register(["@angular/core", "@angular/common", "@ngx-translate/core", "@angular/material", "app/modules/basic.module", "app/common/widgetcontainer/iWidgetContainer", "app/common/maximizeWidget/iMaximize", "app/widgets/barchart/barchart.component", "app/widgets/linechart/linechart.component", "app/widgets/piechart/piechart.component", "app/widgets/sunburst/sunburst.component", "app/widgets/stackedBars/stackedBars.component", "app/widgets/heatmap/heatmap.component", "app/widgets/surface3D/surface3D.component", "app/widgets/MultiLineZoom/MultiLineZoom", "app/widgets/radialprogress/radialprogress.component", "app/components/Analytics/Dashboard","app/widgets/horizontalStackedBar/horzStackedBar.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, core_2, material_1, basic_module_1, iWidgetContainer_1, iMaximize_1, barchart_component_1, linechart_component_1, piechart_component_1, sunburst_component_1, stackedBars_component_1, heatmap_component_1, surface3D_component_1, MultiLineZoom_1, radialprogress_component_1, Dashboard_1,horzStackedBar_1, WidgetsModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (material_1_1) {
                material_1 = material_1_1;
            },
            function (basic_module_1_1) {
                basic_module_1 = basic_module_1_1;
            },
            function (iWidgetContainer_1_1) {
                iWidgetContainer_1 = iWidgetContainer_1_1;
            },
            function (iMaximize_1_1) {
                iMaximize_1 = iMaximize_1_1;
            },
            function (barchart_component_1_1) {
                barchart_component_1 = barchart_component_1_1;
            },
            function (linechart_component_1_1) {
                linechart_component_1 = linechart_component_1_1;
            },
            function (piechart_component_1_1) {
                piechart_component_1 = piechart_component_1_1;
            },
            function (sunburst_component_1_1) {
                sunburst_component_1 = sunburst_component_1_1;
            },
            function (stackedBars_component_1_1) {
                stackedBars_component_1 = stackedBars_component_1_1;
            },
            function (heatmap_component_1_1) {
                heatmap_component_1 = heatmap_component_1_1;
            },
            function (surface3D_component_1_1) {
                surface3D_component_1 = surface3D_component_1_1;
            },
            function (MultiLineZoom_1_1) {
                MultiLineZoom_1 = MultiLineZoom_1_1;
            },
            function (radialprogress_component_1_1) {
                radialprogress_component_1 = radialprogress_component_1_1;
            },
            function (Dashboard_1_1) {
                Dashboard_1 = Dashboard_1_1;
            },
			function (horzStackedBar_1_1) {
                horzStackedBar_1 = horzStackedBar_1_1;
            }

        ],
        execute: function () {
            WidgetsModule = (function () {
                function WidgetsModule() {
                }
                WidgetsModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                            core_2.TranslateModule,
                            material_1.MaterialModule,
                            basic_module_1.BasicModule
                        ],
                        exports: [
                            barchart_component_1.BarchartComponent, linechart_component_1.LineComponent, piechart_component_1.PiechartComponent, sunburst_component_1.SunburstComponent, stackedBars_component_1.StackedBarsComponent,
                            heatmap_component_1.HeatmapComponent, surface3D_component_1.Surface3DComponent, MultiLineZoom_1.MultiLineZoomComponent, radialprogress_component_1.RadialComponent, iWidgetContainer_1.WidgetContainerComponent,
                            iMaximize_1.MaximizeComponent, Dashboard_1.DashboardComponent,horzStackedBar_1.HorizontalStackedBarComponent
                        ],
                        declarations: [
                            barchart_component_1.BarchartComponent, linechart_component_1.LineComponent, piechart_component_1.PiechartComponent, sunburst_component_1.SunburstComponent, stackedBars_component_1.StackedBarsComponent,
                            heatmap_component_1.HeatmapComponent, surface3D_component_1.Surface3DComponent, MultiLineZoom_1.MultiLineZoomComponent, radialprogress_component_1.RadialComponent, iWidgetContainer_1.WidgetContainerComponent,
                            iMaximize_1.MaximizeComponent, Dashboard_1.DashboardComponent,horzStackedBar_1.HorizontalStackedBarComponent
                        ],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA, core_1.NO_ERRORS_SCHEMA]
                    })
                ], WidgetsModule);
                return WidgetsModule;
            }());
            exports_1("WidgetsModule", WidgetsModule);
        }
    };
});
//# sourceMappingURL=widgets.module.js.map