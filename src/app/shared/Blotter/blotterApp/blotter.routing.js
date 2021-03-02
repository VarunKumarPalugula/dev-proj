System.register(["@angular/router", "app/page.loader", "blotterApp/blotter.main"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, page_loader_1, blotter_main_1, appRoutes, appRoutingProviders, routing;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (page_loader_1_1) {
                page_loader_1 = page_loader_1_1;
            },
            function (blotter_main_1_1) {
                blotter_main_1 = blotter_main_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                { path: '', redirectTo: 'blotter/:id', pathMatch: 'full' },
                { path: 'blotter/:id', component: blotter_main_1.BlotterMainComponent },
                { path: '**', component: page_loader_1.PageLoaderComponent }
            ];
            exports_1("appRoutingProviders", appRoutingProviders = []);
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    };
});
//# sourceMappingURL=blotter.routing.js.map