import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ActionSheetController,
  AnimationController,
  IonModal,
  IonicModule,
} from '@ionic/angular';
import { InitialService } from '../../initial.service';
import { Product } from 'src/Models/productModel';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ProductosPage implements OnInit {
  public filterProduct: FormGroup = new FormGroup({});
  public submitted = false;
  public isOpenModal: boolean = false;
  @ViewChild(IonModal) modal: IonModal;
  
  public listProducts: Product[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10; // Número de ítems por página
  public presentingElement: Element | null = null;

  constructor(
    private service$: InitialService,
    private animationCtrl: AnimationController,
    private actionSheetCtrl: ActionSheetController,
    private formBuilder: FormBuilder
  ) 
  {
    this.filterProduct = new FormGroup({
      Name: new FormControl(''),
      Quantity: new FormControl(0),
      MoneyInvested: new FormControl(0),
      UnitPrice: new FormControl(0)
    });
  }

  ngOnInit() {
    this.listProducts = this.service$.getAllProducts();
    this.presentingElement = document.querySelector('.ion-page');
    this.buildFilterValidations();
  }

  toggleOpenModal(){
    this.isOpenModal = true;
  }

  buildFilterValidations() {
    this.filterProduct = this.formBuilder.group(
      {
        Name: ['', Validators.required],
        Quantity: [0, [Validators.required, Validators.min(1)]],
        MoneyInvested: [0, [Validators.required, Validators.min(1)]],
        UnitPrice: [0, [Validators.required, Validators.min(1)]]
      }
    );
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.filterProduct.invalid) {
      this.filterProduct.markAllAsTouched();
      return;
    }

    let valueConfirm = await this.confirm();
    
    if(valueConfirm){
      let value = this.filterProduct.value;
      this.filterProduct.reset();
      this.modal.dismiss();
      this.isOpenModal = false;
      let productEnd: Product = {
        ...value,
        QuantityInStock: value.Quantity,
        _id: `${Math.random() * 999}`
      };

      this.service$.addOneProduct(productEnd);

      this.listProducts = this.service$.getAllProducts();

    }
  }

  getTotalPages(): number {
    return Math.ceil(this.listProducts.length / this.itemsPerPage);
  }

  getPageItems(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.listProducts.slice(startIndex, endIndex);
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

  close(){
    this.filterProduct.reset();
    this.modal.dismiss('cerrar');
    this.isOpenModal = false;
  }

  async confirm(): Promise<boolean> {
    return await this.canDismiss();
  }

  canDismiss = async () : Promise<boolean> => {
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
}