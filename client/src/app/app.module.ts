import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    //EditorModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
