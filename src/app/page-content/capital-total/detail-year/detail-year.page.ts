import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  NgApexchartsModule
} from "ng-apexcharts";
import { DataByMonth, History_Abono, History_Product } from 'src/Models/historiesInterfaces';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-detail-year',
  templateUrl: './detail-year.page.html',
  styleUrls: ['./detail-year.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NgApexchartsModule]
})
export class DetailYearPage implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  private annualInvestment: number[] = [];
  private annualAbono: number[] = [];

  @Input('productsByMonth') set getProductsByMonth(productsByMonth: DataByMonth<History_Product>) {

    if(productsByMonth === undefined) return;

    this.annualInvestment = this.generateNumberArray(productsByMonth, "moneyInvested");
    
  }

  @Input('abonoByMonth') set getAbonoByMonth(abonoByMonth: DataByMonth<History_Abono>) {
    if(abonoByMonth === undefined) return;

    this.annualAbono = this.generateNumberArray(abonoByMonth, "amountPaid")
  }

  constructor() 
  { 
  
  }

  ngOnInit() {
    this.activeGrafic();
  }

  public activeGrafic(){

    this.chartOptions = {
      series: [
        {
          name: "Inversión anual",
          data: this.annualInvestment
        },
        {
          name: "Ventas",
          data: this.annualAbono
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "category",
        categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
      },
      tooltip: {
        x: {
          show: true
        }
      }
    };
  }

  generateNumberArray(value: DataByMonth<History_Product | History_Abono>, dataSum: string): number[]{
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const __values = Array(new Date().getMonth() +1).fill(0);
    
    months.forEach((month, index) => {
      month = month.toLocaleLowerCase();
      if (value[month]){
        __values[index] = value[month].reduce((acc, product) => acc + product[dataSum], 0);
      }
    });

    return __values;
  }

}
