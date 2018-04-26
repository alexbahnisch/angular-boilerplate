"use strict";
import {Component} from "@angular/core";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [require("./app.component.css").toString()]
})
export class AppComponent {
  message = "Hello World!!";
}
