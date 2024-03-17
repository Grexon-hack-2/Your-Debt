import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InitialAppPage } from './initial-app/initial-app.page';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.page.html',
  styleUrls: ['./page-content.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, InitialAppPage, RouterLink]
})
export class PageContentPage{

  constructor() { }
}
