import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';
import { InitialService } from '../initial.service';
import { OtherDebtsRequest, OtherDebtsResponse, listDebt } from 'src/Models/listDebtsModel';
import { ToastService } from 'src/Utils/ToastService';
import { HttpErrorResponse } from '@angular/common/http';
import { IonModal, IonSearchbar, IonLoading, IonRefresherContent, IonRefresher } from "@ionic/angular/standalone";

@Component({
  selector: 'app-others-debts',
  templateUrl: './others-debts.page.html',
  styleUrls: ['./others-debts.page.scss'],
  standalone: true,
  imports: [IonRefresher, IonRefresherContent,  IonLoading, ...InterfaceIonic.ArrayInterface, CommonModule, FormsModule, ReactiveFormsModule]
})
export class OthersDebtsPage {
  public showPage: boolean = false;
  public formOtherDebt: FormGroup;
  public isOpen:boolean = false;
  public listOtherDebts: OtherDebtsResponse[] = [];
  public listResultFilter: OtherDebtsResponse[] = [];
  public listNameDebt : string[] = [];
  public listDebts: listDebt[] = [];

  public showLoading: boolean = false;

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonSearchbar) search: IonSearchbar;

  constructor(
    private _service$: InitialService, 
    private _formBuilder: FormBuilder,
    private _toastService: ToastService
  ) { }

  ionViewWillEnter(){
    this._service$.getAllOtherDebts().subscribe((resp:OtherDebtsResponse[]) => {
      this.listOtherDebts = resp;
      this.listResultFilter = [...this.listOtherDebts];

      this._service$.getAllDebts().subscribe((resp: listDebt[]) => {
        this.listDebts = resp;

        this.showPage = true;

        this.formOtherDebt = this._formBuilder.group({
          nameDebt: ['', Validators.required],
          debtorsID: ['', [Validators.required]],
          money: ["", Validators.required]
        })
    
        if(this.listDebts.length === 0) this.formOtherDebt.controls['debtorsID'].disable();
      })
    });

  }

  onWillDismiss(event: Event): void {
    this.isOpen = false;
  }

  onClick(id: string) {
    this.listNameDebt = this.getNamesDebt(id);
    this.isOpen = !this.isOpen;
  }

  getNamesDebt(id: string): string[]{
    return this.listOtherDebts.find(x => x.debtorsID == id)?.nameDebt.split(',');
  }

  onSubmit(){
    const { nameDebt, debtorsID, money } = this.formOtherDebt.value;

    const dataDebtor = debtorsID as listDebt;
    this.showLoading = true;
    const otherDebt:OtherDebtsRequest = {
      nameDebt: nameDebt.toLocaleLowerCase().trim(),
      debt: money,
      debtorsID: dataDebtor.debtorsID,
      debtorName: dataDebtor.name
    }

    this._service$.insertNewDebt(otherDebt).subscribe((resp:string) => {
      this._toastService.presentToast(resp,'rocket', 'success');
      this.modal.dismiss(null, 'confirm');
      this.resetForm();
      this.ionViewWillEnter();
    },
    ({ error }: HttpErrorResponse) => {
      this._toastService.presentToast(error, 'close-circle', 'danger');
    }); 
  }

  resetForm(){
    this.formOtherDebt.reset();
  }

  handlerInput(event){
    const query = event.target.value.toLocaleLowerCase();
    this.listResultFilter = this.listOtherDebts.filter(x => x.debtorName.toLocaleLowerCase().indexOf(query) > -1);

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
