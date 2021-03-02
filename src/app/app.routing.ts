import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.main';
import { DashboardComponent } from './components/Analytics/Dashboard';
import { CommonBlotterComponent } from './components/commonblotter/commonblotter.component';
import { PageLoaderComponent } from './page.loader';
import { PreEodAuthComponent } from './shared/Eod/iPreEodAuth';


const appRoutes: Routes = [

    { path: '', redirectTo: 'OneTreasury', pathMatch: 'full' },
    { path: 'adhocReport', loadChildren: 'app/components/Reports/report.module#ReportModule' },
    { path: 'preEodCheck', component: PreEodAuthComponent },
    { path: 'commonBlotter', component: CommonBlotterComponent },

    {
        path: 'OneTreasury', component: AppComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'preEodCheck', component: PreEodAuthComponent },
            { path: 'commonBlotter', component: CommonBlotterComponent },
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
    { path: '**', component: PageLoaderComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
