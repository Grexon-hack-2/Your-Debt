import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonModal, IonicModule } from '@ionic/angular';
import { InitialService, listaDetallada } from 'src/app/page-content/initial.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/Models/productModel';
import { OverlayEventDetail } from '@ionic/core/components';
import { deudaModel } from 'src/Models/deudaModel';

@Component({
  selector: 'app-detalle-deudor',
  templateUrl: './detalle-deudor.page.html',
  styleUrls: ['./detalle-deudor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalleDeudorPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  public NameDeudor: string;
  public selectProduct: string;
  public quantity:number;
  public idClient:string;

  public errorSelect: boolean = false;
  public errorCantidad:boolean = false;

  public dataUser: listaDetallada;
  public showDetail: boolean = false;
  public listProducts : Product[] =[];

  constructor(private service$: InitialService, private route$: ActivatedRoute) { }

  ngOnInit() {
    this.route$.params.subscribe(param => {
      const id = param['idClient'];
      this.idClient = id;
      this.getDetailClient(id);
    })

  }

  getDetailClient(id: string) {
    this.dataUser = this.service$.getDetailDebt(id);
    this.listProducts = this.service$.getAllProducts();
    this.NameDeudor = this.dataUser.Name;
    this.showDetail = true;
  }

  getNameProduct(id: string): string{
    return this.listProducts.find((item) => item._id === id).Name
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null,'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      let isValid = this.validatorsFunction();

      if(isValid) {
        let product = this.getProductById(this.selectProduct);
       let cantidadAdeudada = this.quantity * product.UnitPrice;
        let deuda: deudaModel = {
          _id: `${Math.random() * 999}`,
          idCliente: this.idClient,
          idProduct:product._id,
          quantity: this.quantity,
          totalAccount: cantidadAdeudada,
          dateOfPurchase: new Date()
        }

        this.service$.addOneDebtTable(deuda);
        this.service$.addOneDebtMore(this.idClient, cantidadAdeudada);
        this.selectProduct = '';
        this.quantity = 0;
        this.getDetailClient(this.idClient);
      }
    }
  }

  validatorsFunction(): boolean{

    if(this.quantity === 0 || this.quantity === null) {
      this.errorCantidad = true;
      return false;
    }
    if(this.selectProduct === null || this.selectProduct === '') {
      this.errorSelect = true;
      return false;
    }
    return true;
  }

  getProductById(id: string): Product {
    return this.listProducts.find((item) => item._id === id)
  }

}
