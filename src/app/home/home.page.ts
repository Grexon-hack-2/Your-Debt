import { IonContent, IonLabel, IonText, IonInput, IonButton } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from './Session.service';
import { ToastService } from 'src/Utils/ToastService';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonText, IonInput,IonContent,IonButton, IonLabel, CommonModule, FormsModule, RouterLink, ReactiveFormsModule]
})
export class HomePage implements OnInit {
  public formUser: FormGroup;
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

}
