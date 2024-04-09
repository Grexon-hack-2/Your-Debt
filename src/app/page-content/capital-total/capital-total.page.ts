import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';

@Component({
  selector: 'app-capital-total',
  templateUrl: './capital-total.page.html',
  styleUrls: ['./capital-total.page.scss'],
  standalone: true,
  imports: [
    ...InterfaceIonic.ArrayInterface,
    CommonModule,
    FormsModule,
  ],
})
export class CapitalTotalPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
