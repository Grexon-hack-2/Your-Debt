import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  standalone: true,
  imports: [...InterfaceIonic.ArrayInterface, CommonModule, FormsModule]
})
export class NotFoundPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
