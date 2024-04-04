import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { regExps } from 'src/Utils/Util_Validator';
import { Event, Router } from '@angular/router';
import { RegisterData, UserData } from 'src/Models/sessionModel';
import { SessionService } from '../Session.service';
import { ToastService } from 'src/Utils/ToastService';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage {
  public formRegister: FormGroup;
  constructor(
    private _formBuild: FormBuilder, 
    private _service$: SessionService,
    private _toast: ToastService,
    private router$: Router
    ) 
  { 
    this.formRegister = this._formBuild.group({
      Name: new FormControl('', Validators.required),
      UserName: new FormControl('', [Validators.required, Validators.pattern(regExps["username"])]),
      Email: new FormControl('', [Validators.required, Validators.pattern(regExps['emailComplet'])]),
      Password: new FormControl('', [Validators.required,  Validators.minLength(8), Validators.pattern(regExps['regexPassword'])]),
      Password_confirm: new FormControl('', [Validators.required])
    })
  }

  ionViewWillEnter(){
   
  }

  onSubmit(){

    if(this.formRegister.invalid){
      return;
    }
    const { UserName, Name, Email, Password } = this.formRegister.value;
    const dataRegister: RegisterData = {
      user: UserName,
      name: Name,
      email: Email,
      password: Password
    }

    this._service$.registerUser(dataRegister).subscribe(async (resp: string) => {
      await this._toast.presentToast(resp, "rocket" , "success");
      this.router$.navigate(['']);
    },
    ({error}: HttpErrorResponse) => {
      this._toast.presentToast(error, "close-circle", "danger");
    }
    )
    
  }

  checkPasswords(event: Event){
    if(this.formRegister.get('Password').value !== event){
      this.formRegister.get('Password_confirm').setErrors({MatchPassword : true});
    }
    else{
      this.formRegister.get('Password_confirm').setErrors(null);
    }
  }
}
