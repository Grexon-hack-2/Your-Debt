import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-detalle-deudor',
  templateUrl: './detalle-deudor.page.html',
  styleUrls: ['./detalle-deudor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalleDeudorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
