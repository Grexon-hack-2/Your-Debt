import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';
import { IonApp } from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [ 
    ...InterfaceIonic.ArrayInterface,
    IonApp,
    RouterLink
  ],
})
export class AppComponent {
  constructor() {}
}
