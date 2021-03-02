System.register(["@angular/router", "app/page.loader", "app/app.main", "app/components/Analytics/Dashboard","app/shared/Eod/iPreEodAuth"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, page_loader_1, app_main_1, Dashboard_1, iPreEodAuth_1,appRoutes, appRoutingProviders, routing;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (page_loader_1_1) {
                page_loader_1 = page_loader_1_1;
            },
            function (app_main_1_1) {
                app_main_1 = app_main_1_1;
            },
            function (Dashboard_1_1) {
                Dashboard_1 = Dashboard_1_1;
            },
			 function (iPreEodAuth_1_1) {
                iPreEodAuth_1 = iPreEodAuth_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                { path: '', redirectTo: 'OneTreasury', pathMatch: 'full' },
				{ path: 'adhocReport', loadChildren: 'app/components/Reports/report.module#ReportModule' },
				{ path: 'preEodCheck', component: iPreEodAuth_1.PreEodAuthComponent },
                {
                    path: 'OneTreasury', component: app_main_1.AppComponent,
					
                    children: [
                        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                        { path: 'dashboard', component: Dashboard_1.DashboardComponent },
						 { path: 'preEodCheck', component: iPreEodAuth_1.PreEodAuthComponent },
                        { path: 'CD', loadChildren: '/cds/app/cds.module#CDSModule' },
                        { path: 'SP', loadChildren: '/sp/app/sp.module#SPModule' },
                        { path: 'FI', loadChildren: '/vft/app/vft.module#VFTModule' },
                        { path: 'MM/ISM', loadChildren: '/ism/app/ism.module#ISMModule' },
                        { path: 'BN', loadChildren: '/bn/app/bn.module#BNModule' },
                        { path: 'COL', loadChildren: '/collateral/app/collateral.module#CollateralModule' },
                        { path: 'MM', loadChildren: '/dcd/app/dcd.module#DCDModule' },
                        { path: 'FX', loadChildren: '/fx/app/fx.module#FXModule' },
                       // { path: 'NR', loadChildren: '/nr/app/statement.module#statementModule' },
                        { path: 'CP', loadChildren: '/cp/app/cp.module#ComplianceModule' },
                        { path: 'adhocReport', loadChildren: 'app/components/Reports/report.module#ReportModule' }
                    ]
                },
                { path: '**', component: page_loader_1.PageLoaderComponent }
            ];
            exports_1("appRoutingProviders", appRoutingProviders = []);
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    };
});
//# sourceMappingURL=app.routing.js.map