import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, IonModal, IonicModule, ToastController } from '@ionic/angular';
import { InitialService, listaDetallada } from 'src/app/page-content/initial.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/Models/productModel';
import { OverlayEventDetail } from '@ionic/core/components';
import { abono, deudaModel } from 'src/Models/deudaModel';

@Component({
  selector: 'app-detalle-deudor',
  templateUrl: './detalle-deudor.page.html',
  styleUrls: ['./detalle-deudor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalleDeudorPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonModal) modal_abono: IonModal;

  public NameDeudor: string;
  public selectProduct: string;
  public quantity:number;
  public idClient:string;

  public errorSelect: boolean = true;
  public errorCantidad:boolean = true;

  public dataUser: listaDetallada;
  public showDetail: boolean = false;
  public listProducts : Product[] =[];
  public isToastOpen = false;
  public messageToast:string;

  public isOpenModalAbono:boolean = false;
  public nameDeudor:string;
  public montoAdeudado:number;

  constructor(
    private service$: InitialService, 
    private route$: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    private toastController: ToastController
    ) { }

  ngOnInit():void {
    this.route$.params.subscribe(param => {
      const id = param['idClient'];
      this.idClient = id;
      this.getDetailClient(id);
    })

  }

  getDetailClient(id: string):void {
    this.dataUser = this.service$.getDetailDebt(id);
    this.listProducts = this.service$.getAllProducts();
    this.NameDeudor = this.dataUser.Name;
    this.showDetail = true;
    this.nameDeudor = this.dataUser.Name
  }

  getNameProduct(id: string): string{
    return this.listProducts.find((item) => item._id === id).Name
  }

  cancel(): void {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm(): Promise<void> {
    if(!this.errorCantidad && !this.errorSelect && await this.canDismiss()) this.modal.dismiss(null,'confirm');
  }

  onWillDismiss(event: Event): void {
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

  canDismiss = async (message: string = null) : Promise<boolean> => {
    let text = message != null ? 'Estás segur@? ' + message : 'Estás segur@?'
    const actionSheet = await this.actionSheetCtrl.create({
      header: text,
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  async onDeleteClient(): Promise<void> {
    let text = this.dataUser.Debt > 0 ? `su deuda es de $${this.dataUser.Debt}` : null;
    if(await this.canDismiss(text)) {
      this.messageToast = this.service$.deleteClient(this.idClient)
      this.setOpen(true);
      window.history.back()
    }
  }


  setOpen(isOpen: boolean): void {
    this.isToastOpen = isOpen;
  }

  cancel_abono() {
    this.montoAdeudado = 0;
    this.setOpen_abono(false);
  }

  setOpen_abono(isOpen: boolean){
    this.isOpenModalAbono = isOpen;
  }

  confirm_abono() {
      
      if(this.montoAdeudado === undefined || this.montoAdeudado === null || this.montoAdeudado === 0){
        this.presentToast("El monto adeudado no puede ser 0", "close-circle", "danger")
      }
      else if(this.montoAdeudado > this.dataUser.Debt) {
        this.presentToast("El monto a pagar no puede ser mayor a la deuda", "close-circle", "danger");
      }
      else {
        const objAbono : abono = {
          _id: `${Math.random() * 9999}`,
          idCliente: this.idClient,
          pay: this.montoAdeudado
        }

        const response = this.service$.addAbonoClient(objAbono);

        this.presentToast(response, "rocket" , "success");
        this.montoAdeudado = 0;
        this.setOpen_abono(false);
        this.getDetailClient(this.idClient);
      }
  }

  async presentToast(message: string, icon: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'top',
      icon:icon,
      color:color
    });

    await toast.present();
  }

  onInputQuantityChange(event: Event) {
    if(event != null) this.errorCantidad = false;
      else this.errorCantidad = true;
  }

  onInputProductChange(event: Event){
    if(event != null) this.errorSelect = false;
      else this.errorSelect = true;
  }

}
