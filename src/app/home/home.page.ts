import { ApexLegend } from 'ng-apexcharts';
import { IonContent, IonLabel, IonText, IonInput, IonButton, IonIcon, IonItem } from '@ionic/angular/standalone';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from './Session.service';
import { ToastService } from 'src/Utils/ToastService';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItem, IonIcon, IonText, IonInput,IonContent,IonButton, IonLabel, CommonModule, FormsModule, RouterLink, ReactiveFormsModule]
})
export class HomePage implements OnInit {
  public formUser: FormGroup;
  public showIconEye: boolean = false;
  public showText: boolean = false;

  @ViewChild('password') password: IonInput;

 constructor(
  private _formBuilder: FormBuilder, 
  private loginSession$: SessionService, 
  private router$: Router,
  private _toast: ToastService
  ) {}

  ngOnInit(): void {
    this.formUser = this._formBuilder.group({
      user: ['',[Validators.required]],
      password:['', [Validators.required]]
    })
  }

 onSubmit(){
    if(!this.formUser.invalid) {
      this.loginSession$.sessionLogin(this.formUser.value).subscribe(()=> {
        this.router$.navigate(['inicio']);
      },
      ({error: {msg}}) => {
        this._toast.presentToast(msg, "close-circle", "danger");
      }
      )
    }
  
 }

 onChange(){
    let password: string = this.formUser.get('password').value;
    if(password.length > 0){
      this.showIconEye = true;
    }else{
      this.showText = false;
      this.showIconEye = false;
    }
 }

 showInputText(event: Event){
    this.showText = !this.showText;
    if(this.showText){
      this.password.type = "text";
    }else{
      this.password.type = "password";
    }
 }

}
