import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from './Session.service';
import { ToastService } from 'src/Utils/ToastService';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ReactiveFormsModule]
})
export class HomePage  {
  public formUser: FormGroup;
 constructor(
  private _formBuilder: FormBuilder, 
  private loginSession$: SessionService, 
  private router$: Router,
  private _toast: ToastService
  ) {
  this.formUser = this._formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
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
