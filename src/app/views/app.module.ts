"use strict";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';


const NG_MODULE: NgModule = {
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
};

@NgModule(NG_MODULE)
export class AppModule {
}
