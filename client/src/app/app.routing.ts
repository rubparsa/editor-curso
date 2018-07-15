//import componentes básicos
import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

//import main
import { AppComponent } from './app.component';

//import componentes creados
import { CapituloAddComponent } from './components/capitulo-add.component';

const appRoutes: Routes = [
    {path: '', component: AppComponent},
    {path: 'crear-capitulo', component: CapituloAddComponent},
    {path: '**', component: AppComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);