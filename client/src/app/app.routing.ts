//import componentes básicos
import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

//import main
import { AppComponent } from './app.component';

//import componentes creados
import { HomeComponent } from './components/home.component';
import { AsignaturaEditComponent } from './components/asignatura-edit.component';
import { CapituloAddComponent } from './components/capitulo-add.component';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'editar-asignatura/:asignatura', component: AsignaturaEditComponent},
    {path: 'crear-capitulo/:asignatura', component: CapituloAddComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);