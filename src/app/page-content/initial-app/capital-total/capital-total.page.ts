import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-capital-total',
  templateUrl: './capital-total.page.html',
  styleUrls: ['./capital-total.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CapitalTotalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
