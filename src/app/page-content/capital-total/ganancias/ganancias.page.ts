import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel } from '@ionic/angular/standalone';
import { InitialService } from '../../initial.service';
import { Product } from 'src/Models/productModel';
import { OtherDebtsResponse, listDebt } from 'src/Models/listDebtsModel';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexTitleSubtitle, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';
import { RouterLink } from '@angular/router';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  series2: ApexNonAxisChartSeries;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.page.html',
  styleUrls: ['./ganancias.page.scss'],
  standalone: true,
  imports: [...InterfaceIonic.ArrayInterface ,IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NgApexchartsModule, RouterLink]
})
export class GananciasPage {
  public chartOptionsBar: Partial<ChartOptions>;
  public totalInvested: number = 0;
  public totalDebts: number = 0;
  public ganancias: number = 0;
  public showGrafic : boolean = false;

  private listOtherDebts: OtherDebtsResponse[] = [];
  public totalOtherDebts:number = 0;
  public selectNameOtherDebts: string[] = [];
  public totalOneDebt: number = 0;

  public totalCobrado: number = 0;
  public fiadoTotal: number = 0;

  @Input('products') set dataProduct(products: Product[]){
    this.totalInvested = products?.reduce((prev, curr) => prev += curr.moneyInvested, 0);
    this.totalDebts = products?.reduce((prev, curr) => prev += ((curr.quantityPurchased - curr.quantityInStock) * curr.unitPrice) ,0);
    this.ganancias = this.totalDebts - this.totalInvested < 0 ? 0 : this.totalDebts - this.totalInvested;
    
    if(products !== undefined) this.getGraficTotal(products);
    
  }
  @Input('otherDebts') set dataOtherDebts(otherDebts: OtherDebtsResponse[]){
    this.totalOtherDebts = otherDebts?.reduce((prev, curr) => prev += curr.debt, 0);

    if(otherDebts !== undefined){
      this.listOtherDebts = otherDebts;
      this.getNameSelect(otherDebts);
      
    }
  }
  @Input('debtors') set dataDebtors(debtors: listDebt[]){
    this.fiadoTotal = debtors?.reduce((acum,curr) => acum + curr.debt ,0)
    this.totalCobrado = debtors?.reduce((prev, curr) => prev + curr.amountPaid ,0)
  }

  constructor(private service$: InitialService) { }

  getGraficTotal(products: Product[]){
    this.chartOptionsBar = {
      series: [
        {
          data: [
            {
              x: 'Invertido',
              y: this.totalInvested
            },
            {
              x: 'Vendido',
              y:this.totalDebts
            },
            {
              x:'Ganancia',
              y:this.ganancias
            }
          ]
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      fill: {
        type: 'gradient',
        colors: ['#69bb7b', '#7BDAF5'],
      },
      xaxis: {
        categories: ['Invertido', 'Vendido', 'Ganancia']
      },
    };
    this.showGrafic = true;
  }

  getNameSelect(otherDebts: OtherDebtsResponse[]){
    for (const debt of otherDebts) {
      let name = debt.nameDebt.toLocaleLowerCase();
        if (!this.selectNameOtherDebts.includes(name)) {
          this.selectNameOtherDebts.push(name);
        }
    }
  }

  handlerSelect(event: CustomEvent){
    const objetosFiltrados:OtherDebtsResponse[]  = this.listOtherDebts.reduce((acumulador, objeto) => {
      if (objeto.nameDebt.toLocaleLowerCase() === event.detail.value) {
          acumulador.push(objeto);
      }
      return acumulador;
    }, []);
    
    this.totalOneDebt = objetosFiltrados.reduce((acum, obj) => acum += obj.debt, 0);
    
  }

}
