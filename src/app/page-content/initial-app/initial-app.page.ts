import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-initial-app',
  templateUrl: './initial-app.page.html',
  styleUrls: ['./initial-app.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InitialAppPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
