import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-init-page',
  templateUrl: './init-page.page.html',
  styleUrls: ['./init-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InitPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
