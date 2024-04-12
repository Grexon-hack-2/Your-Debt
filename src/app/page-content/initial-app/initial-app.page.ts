import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from 'src/app/home/Session.service';
import { AuthService } from 'src/Utils/Auth.service';
import { UserData } from 'src/Models/sessionModel';
import { Product } from 'src/Models/productModel';
import { InitialService } from '../initial.service';
import {
  NgApexchartsModule,
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexFill,
  ApexLegend,
  ApexResponsive,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';

import { InterfaceIonic } from '../../../Utils/ExpInterfaceIonic';
import { IonPopover } from '@ionic/angular/standalone';
import { PersistenceService } from 'src/Utils/Persistence.service';

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
};

@Component({
  selector: 'app-initial-app',
  templateUrl: './initial-app.page.html',
  styleUrls: ['./initial-app.page.scss'],
  standalone: true,
  imports: [
    ...InterfaceIonic.ArrayInterface,
    CommonModule,
    FormsModule,
    NgApexchartsModule,
  ],
})
export class InitialAppPage implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptionsBar: Partial<ChartOptions>;
  public chartOptionsPie: Partial<ChartOptions>;

  themeToggle = false;
  @ViewChild('popover') popover: IonPopover;
  public isOpen = false;
  public listProducts: Product[] = [];

  public nameUser: string;

  public isDataProduct: boolean = false;

  public productData: Product;
  private readonly keyThemeColor: string = "color-Theme";
  constructor(
    private session$: SessionService,
    private _auth: AuthService,
    private service$: InitialService,
    private _persistence: PersistenceService
  ) {}

  ngOnInit() {
    this._auth.getDataUser.subscribe(
      (resp: UserData) => (this.nameUser = resp.PersonName)
    );

    let colorThemeInitial = this._persistence.get(this.keyThemeColor);
    let prefersDark: MediaQueryList;

    if(colorThemeInitial === null) {
      this._persistence.save(this.keyThemeColor, "light");

      prefersDark = window.matchMedia('(prefers-color-scheme: light)');
    }
    else {
      prefersDark = window.matchMedia(`(prefers-color-scheme: ${colorThemeInitial})`);
    }

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) =>
      this.initializeDarkTheme(mediaQuery.matches)
    );

    this.initData();
  }

  ionViewWillEnter() {
    this.initData();
  }

  initializeDarkTheme(isDark: boolean) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  toggleChange(ev: CustomEvent) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  // Add or remove the "dark" class on the document body
  toggleDarkTheme(shouldAdd: boolean) {
    if(shouldAdd) this._persistence.save(this.keyThemeColor, "dark");
      else this._persistence.save(this.keyThemeColor, 'light')
    document.body.classList.toggle('dark', shouldAdd);
  }

  sessionOut(): void {
    this.session$.logout();
  }

  initData() {
    this.isDataProduct = false;
    this.service$.getAllProducts().subscribe((item: Product[]) => {
      this.listProducts = item;

      this.chartOptionsBar = {
        series: [
          {
            name: 'My-series',
            data: item.map(
              (x) => x.unitPrice * x.quantityPurchased - x.moneyInvested
            ),
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
        title: {
          text: 'Graficos, ganancias por producto',
        },
        xaxis: {
          categories: item.map((x) => x.name),
        },
      };
    });
  }

  onChange(event: CustomEvent) {
    if (event.detail.value !== undefined) {
      this.isDataProduct = true;
      const dataLegend = ['Inversión', 'Ganancias'];
      this.productData = event.detail.value;

      this.chartOptionsPie = {
        series2: [
          this.productData.moneyInvested,
          this.productData.unitPrice * this.productData.quantityPurchased -
            this.productData.moneyInvested,
        ],
        chart: {
          width: 500,
          type: 'donut',
        },
        dataLabels: {
          enabled: true,
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          formatter: function (val, opts) {
            return (
              dataLegend[opts.seriesIndex] +
              ' - ' +
              opts.w.globals.series[opts.seriesIndex]
            );
          },
          containerMargin: {
            left: 5,
            top: 5,
          },
        },
        title: {
          text: 'Graficos, ganancias por producto',
        },
        responsive: [
          {
            breakpoint: 700,
            options: {
              chart: {
                width: '100%',
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      };
    }
  }
}
