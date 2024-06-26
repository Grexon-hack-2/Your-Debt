import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActionSheetController,
  AnimationController
} from '@ionic/angular';
import { InitialService } from '../initial.service';
import { Product } from 'src/Models/productModel';
import { ToastService } from 'src/Utils/ToastService';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';
import { IonModal, IonSearchbar, IonLoading, IonRefresher, IonRefresherContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonLoading, ...InterfaceIonic.ArrayInterface, CommonModule, ReactiveFormsModule],
})
export class ProductosPage {
  public filterProduct: FormGroup = new FormGroup({});
  public submitted = false;
  public isOpenModal: boolean = false;
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonSearchbar) search: IonSearchbar;
  public viewPage: boolean = false;
  public listProducts: Product[] = [];
  public listResultFilter: Product[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10; // Número de ítems por página
  public presentingElement: Element | null = null;

  public showLoading: boolean = false;

  constructor(
    private service$: InitialService,
    private animationCtrl: AnimationController,
    private actionSheetCtrl: ActionSheetController,
    private formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {
    this.filterProduct = new FormGroup({
      Name: new FormControl(''),
      Quantity: new FormControl(),
      MoneyInvested: new FormControl(),
      UnitPrice: new FormControl(),
    });
  }

  ionViewWillEnter() {
    this.initialData();
    this.presentingElement = document.querySelector('.ion-page');
  }

  initialData() {
    this.service$.getAllProducts().subscribe((item: Product[]) => {
      this.listProducts = item;
      this.listResultFilter = [...this.listProducts];
      this.viewPage = true;
    });
    this.buildFilterValidations();
  }

  toggleOpenModal() {
    this.isOpenModal = true;
  }

  buildFilterValidations() {
    this.filterProduct = this.formBuilder.group({
      Name: ['', Validators.required],
      Quantity: ['', [Validators.required, Validators.min(1)]],
      MoneyInvested: ['', [Validators.required, Validators.min(1)]],
      UnitPrice: ['', [Validators.required, Validators.min(1)]],
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.filterProduct.invalid) {
      this.filterProduct.markAllAsTouched();
      return;
    }

    let valueConfirm = await this.confirm();
    this.showLoading = true;
    if (valueConfirm) {
      let value = this.filterProduct.value;
      this.filterProduct.reset();
      this.modal.dismiss();
      this.isOpenModal = false;
      let productEnd: Product = {
        ...value,
        QuantityInStock: value.Quantity
      };

      this.service$.addOneProduct(productEnd).subscribe(
        async (resp) => {
          await this._toastService.presentToast(resp, 'checkmark-done-circle', 'success');
          this.initialData();
        },
        async (error) => {
          await this._toastService.presentToast(error, 'close-circle', 'danger');
        }
      );
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.listResultFilter.length / this.itemsPerPage);
  }

  getPageItems(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.listResultFilter.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getCountItem(): string[] {
    return new Array(this.getTotalPages());
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  close() {
    this.filterProduct.reset();
    this.modal.dismiss('cerrar');
    this.isOpenModal = false;
  }

  async confirm(): Promise<boolean> {
    return await this.canDismiss();
  }

  canDismiss = async (): Promise<boolean> => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Estás segur@?',
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

  deleteProduct(id: string) {
      this.showLoading = true;
      this.service$.deleteProduct(id).subscribe((resp: string) => {
        this.initialData();
        this._toastService.presentToast(
          resp,
          'checkmark-done-circle',
          'success'
        );
      },
      (error) => {
        this._toastService.presentToast(error, 'close-circle', 'danger');
      })
  }

  handlerInput(event) {
    const query = event.target.value.toLocaleLowerCase();
    this.listResultFilter = this.listProducts.filter((item) => item.name.toLocaleLowerCase().indexOf(query) > -1)

  }

  ionViewWillLeave(){
    this.search.value = "";
  }

  outLoading(event: Event) {
    this.showLoading = false;
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }

}
