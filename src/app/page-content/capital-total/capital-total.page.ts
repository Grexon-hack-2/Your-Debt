import { History_OtherDebt, History_Abono, History_Product } from './../../../Models/historiesInterfaces';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';
import { InitialService } from '../initial.service';
import { GananciasPage } from "./ganancias/ganancias.page";
import { DetailYearPage } from "./detail-year/detail-year.page";
import { Product } from 'src/Models/productModel';
import { OtherDebtsResponse, listDebt } from 'src/Models/listDebtsModel';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-capital-total',
    templateUrl: './capital-total.page.html',
    styleUrls: ['./capital-total.page.scss'],
    standalone: true,
    imports: [
        ...InterfaceIonic.ArrayInterface,
        CommonModule,
        FormsModule,
        GananciasPage,
        DetailYearPage
    ]
})
export class CapitalTotalPage {
  public selectedSeg: string = 'ganancias';

  public products: Product[];
  public otherDebts: OtherDebtsResponse[];
  public debtors: listDebt[];

  public History_OtherDebt: History_OtherDebt[];
  public History_Abono: History_Abono[];
  public History_Product: History_Product[];


  constructor(private service$: InitialService) {}

  ionViewWillEnter(){
    this.service$.getAllProducts().subscribe(products => {
      this.products = products;
    });

    this.service$.getAllOtherDebts().subscribe(orders => {
      this.otherDebts = orders;
    });

    this.service$.getAllDebts().subscribe(orders => {
      this.debtors = orders;
    })

    forkJoin({
      requestOne: this.service$.getHistoryOtherDebts(),
      requestTwo: this.service$.getHistoryAbono(),
      requestThree: this.service$.getHistoryProducts()
    })
    .subscribe(({requestOne, requestTwo, requestThree}) => {
      this.History_OtherDebt = requestOne;
      this.History_Abono = requestTwo;
      this.History_Product = requestThree;
    });
      
  }
}
