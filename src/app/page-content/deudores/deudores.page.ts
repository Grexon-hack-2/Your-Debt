import { Component,  ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionSheetController, AnimationController, ToastController } from '@ionic/angular';
import { InitialService } from '../initial.service';
import { listDebt } from 'src/Models/listDebtsModel';
import { RouterLink } from '@angular/router';
import { ToastService } from 'src/Utils/ToastService';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';
import { IonModal, IonSearchbar, IonListHeader, IonLoading, IonRefresher, IonRefresherContent } from "@ionic/angular/standalone";

@Component({
    selector: 'app-deudores',
    templateUrl: './deudores.page.html',
    styleUrls: ['./deudores.page.scss'],
    standalone: true,
    imports: [IonRefresherContent, IonRefresher, IonLoading, IonListHeader, ...InterfaceIonic.ArrayInterface, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class DeudoresPage  {
  public filterDebts: FormGroup = new FormGroup({});
  public submitted = false;
  public isOpenModal: boolean = false;
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonSearchbar) searchBar: IonSearchbar;

  public viewPage: boolean = false;
  public listDebts:listDebt[] = [];
  public listResultFilter: listDebt[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10; // Número de ítems por página
  public presentingElement: Element | null = null;

  public showLoading: boolean = false;
  
  constructor(
    private service$: InitialService,
    private animationCtrl: AnimationController,
    private actionSheetCtrl: ActionSheetController,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private _toastService: ToastService
  ) {
      this.filterDebts = new FormGroup({
        Name: new FormControl(),
        Phone: new FormControl(),
        Detail: new FormControl()
      });
    }


  ionViewWillEnter(){
    this.initData();
    this.presentingElement = document.querySelector('.ion-page');
    this.buildFilterValidations();
  }
  
  initData(): void {
    this.service$.getAllDebts().subscribe(data => {
      this.listDebts = data;
      this.listResultFilter = [...this.listDebts]
      this.viewPage = true;
    })
  }

  toggleOpenModal(){
    this.isOpenModal = true;
  }

  buildFilterValidations() {
    this.filterDebts = this.formBuilder.group(
      {
        Name: ['', Validators.required],
        Phone: [''],
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
    this.showLoading = true;
    if(valueConfirm){
      let value = this.filterDebts.value;
      this.filterDebts.reset();
      this.modal.dismiss();
      this.isOpenModal = false;
      let newDebt: listDebt = {
        ...value,
        debt:0,
      };

      this.service$.addNewClient(newDebt).subscribe((resp: string) => {
        this._toastService.presentToast(resp, "rocket" , "success");
        this.initData();
      },
      (error) => {
        this._toastService.presentToast(error, "close-circle", "danger")
      }
      )

    }
  }

  getTotalPages(): number {
    return Math.ceil(this.listResultFilter.length / this.itemsPerPage);
  }

  getPageItems(): listDebt[] {
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

  handlerInput(event):void{
    this.currentPage = 1;
    const query = event.target.value.toLowerCase();
    this.listResultFilter = this.listDebts.filter((item) => item.name.toLocaleLowerCase().indexOf(query) > -1);
  }

  ionViewWillLeave(){
    this.searchBar.value = "";
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
