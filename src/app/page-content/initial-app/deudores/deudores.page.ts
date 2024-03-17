import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionSheetController, AnimationController, IonModal, IonicModule } from '@ionic/angular';
import { InitialService } from '../../initial.service';
import { listDebt } from 'src/Models/listDebtsModel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.page.html',
  styleUrls: ['./deudores.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class DeudoresPage implements OnInit {
  public filterDebts: FormGroup = new FormGroup({});
  public submitted = false;
  public isOpenModal: boolean = false;
  @ViewChild(IonModal) modal: IonModal;

  public listDebts:listDebt[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10; // Número de ítems por página
  public presentingElement: Element | null = null;
  
  constructor(
    private service$: InitialService,
    private animationCtrl: AnimationController,
    private actionSheetCtrl: ActionSheetController,
    private formBuilder: FormBuilder
    ) {
      this.filterDebts = new FormGroup({
        Name: new FormControl(''),
        Phone: new FormControl(''),
        Debt: new FormControl(0),
        Detail: new FormControl('')
      });
     }

  ngOnInit() {
    this.listDebts = this.service$.getAllDebts();
    this.presentingElement = document.querySelector('.ion-page');
    this.buildFilterValidations();
  }

  toggleOpenModal(){
    this.isOpenModal = true;
  }

  buildFilterValidations() {
    this.filterDebts = this.formBuilder.group(
      {
        Name: ['', Validators.required],
        Phone: [''],
        Debt: [0, [Validators.required, Validators.min(1)]],
        Detail: ['']
      }
    );
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.filterDebts.invalid) {
      this.filterDebts.markAllAsTouched();
      return;
    }

    let valueConfirm = await this.confirm();
    
    if(valueConfirm){
      let value = this.filterDebts.value;
      this.filterDebts.reset();
      this.modal.dismiss();
      this.isOpenModal = false;
      let newDebt: listDebt = {
        ...value,
        Date: new Date(),
        _id: `${Math.random() * 999}`
      };

      this.service$.addNewClient(newDebt);

      this.listDebts = this.service$.getAllDebts();

    }
  }

  getTotalPages(): number {
    return Math.ceil(this.listDebts.length / this.itemsPerPage);
  }

  getPageItems(): listDebt[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.listDebts.slice(startIndex, endIndex);
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
    this.filterDebts.reset();
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
