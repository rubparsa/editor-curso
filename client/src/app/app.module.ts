//import componentes básicos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

//import funcionalidades
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';

import { AsignaturaEditComponent } from './components/asignatura-edit.component';

import { CapituloAddComponent } from './components/capitulo-add.component';

import { HomeComponent } from './components/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AsignaturaEditComponent,
    CapituloAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
