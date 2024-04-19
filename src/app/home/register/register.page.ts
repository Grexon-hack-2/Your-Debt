import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { regExps } from 'src/Utils/Util_Validator';
import { Event, Router } from '@angular/router';
import { RegisterData, UserData } from 'src/Models/sessionModel';
import { SessionService } from '../Session.service';
import { ToastService } from 'src/Utils/ToastService';
import { HttpErrorResponse } from '@angular/common/http';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';
import { IonImg } from "@ionic/angular/standalone";
import { PictureService, UserPhoto } from 'src/Utils/Picture.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonImg, 
    ...InterfaceIonic.ArrayInterface,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterPage {
  public formRegister: FormGroup;
  public urlImg: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
  private savedImageFile: UserPhoto;

  constructor(
    private _formBuild: FormBuilder,
    private _service$: SessionService,
    private _toast: ToastService,
    private router$: Router,
    private _pictureService: PictureService
  ) {
    this.formRegister = this._formBuild.group({
      Name: new FormControl('', Validators.required),
      UserName: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps['username']),
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps['emailComplet']),
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(regExps['regexPassword']),
      ]),
      Password_confirm: new FormControl('', [Validators.required]),
    });
  }

  ionViewWillEnter() {}

  onSubmit() {
    if (this.formRegister.invalid) {
      return;
    }
    const { UserName, Name, Email, Password } = this.formRegister.value;
    
    const dataRegister: RegisterData = {
      user: UserName,
      name: Name,
      email: Email,
      password: Password,
      image: JSON.stringify(this.savedImageFile ?? this.urlImg),
    };

    this._service$.registerUser(dataRegister).subscribe(
      async (resp: string) => {
        await this._toast.presentToast(resp, 'rocket', 'success');
        this.router$.navigate(['']);
      },
      ({ error }: HttpErrorResponse) => {
        this._toast.presentToast(error, 'close-circle', 'danger');
      }
    );
  }

  checkPasswords(event: Event) {
    if (this.formRegister.get('Password').value !== event) {
      this.formRegister
        .get('Password_confirm')
        .setErrors({ MatchPassword: true });
    } else {
      this.formRegister.get('Password_confirm').setErrors(null);
    }
  }

  handlerSelectImg(url: string){
    this.urlImg = url;
  }

  public async addNewToGallery() {
    // Take a photo
    const { url, saveFile } = await this._pictureService.addNewToGallery();

    this.urlImg = url;
    this.savedImageFile = saveFile;
  }

}