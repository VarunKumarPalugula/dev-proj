import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoaderComponent } from 'src/app/page.loader';
import { BlotterMainComponent } from './blotter.main';


const appRoutes: Routes = [
    { path: '', redirectTo: 'blotter/:id', pathMatch: 'full' },
    { path: 'blotter/:id', component: BlotterMainComponent },
	{ path: '**', component: PageLoaderComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);