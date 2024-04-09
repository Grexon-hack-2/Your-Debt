import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';

@Component({
  selector: 'app-others-debts',
  templateUrl: './others-debts.page.html',
  styleUrls: ['./others-debts.page.scss'],
  standalone: true,
  imports: [...InterfaceIonic.ArrayInterface, CommonModule, FormsModule]
})
export class OthersDebtsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
