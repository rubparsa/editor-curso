import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

//import { EditorModule } from '@tinymce/tinymce-angular';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';

import { CapituloAddComponent } from './components/capitulo-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CapituloAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    //EditorModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
