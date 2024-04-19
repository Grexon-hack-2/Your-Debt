import { Component, EventEmitter, Input, NgModule, Output, inject } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { AuthService } from 'src/Utils/Auth.service';
import { InterfaceIonic } from 'src/Utils/ExpInterfaceIonic';
import { Platform } from '@ionic/angular';
import { AuthorizationResponse, RegisterData, UserData } from 'src/Models/sessionModel';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PictureService, UserPhoto } from 'src/Utils/Picture.service';
import { SessionService } from 'src/app/home/Session.service';
import { ToastService } from 'src/Utils/ToastService';
import { IonLoading } from "@ionic/angular/standalone";

@Component({
  selector: 'app-updateInfo',
  templateUrl: './updateInfo.page.html',
  styleUrls: ['./updateInfo.page.css'],
  standalone: true,
  imports:[...InterfaceIonic.ArrayInterface, ReactiveFormsModule, FormsModule, CommonModule]

})
export class UpdateInfoPage {

  public isOpenUpdate: boolean = false;
  private _toast= inject(ToastService);

  @Input('isOpen') set isOpen(value: boolean) {
    this.isOpenUpdate = value;
  }

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() refreshPage: EventEmitter<boolean> = new EventEmitter();

  private _PlatForm= inject(Platform);
  private _auth = inject(AuthService);
  private _pictureService$ = inject(PictureService);
  private _service$ = inject(SessionService);
  public nameUser: string = "";
  public urlImg: string = "";
  public email: string = "";
  public platform: Platform;

  public showLoading:boolean = false;

  public formUpdate: FormGroup;

  private _formBuild = inject(FormBuilder);

  public saveFileData: UserPhoto;


  ngOnInit() {
    this.platform = this._PlatForm;
    this._auth.getDataUser.subscribe(
      async (resp: UserData) => {

        this.nameUser = resp.PersonName;
        this.email = resp.Email;
        let img = resp.Image !== null ? JSON.parse(resp.Image) : "https://ionicframework.com/docs/img/demos/avatar.svg";
        if(!this.platform.is('hybrid') && typeof img !== "string") {
          const readfile = await Filesystem.readFile({
            path: img?.filepath,
            directory: Directory.Data
          });

          img.webviewPath = `data:image/jpeg;base64,${readfile.data}`
        }

        this.urlImg = img.webviewPath ?? img;
        this.setFormUpdate();
      }
    );
  }

  setFormUpdate(){
    this.formUpdate = new FormGroup({
      nameUser: new FormControl(),
      email: new FormControl()
    });

    this.formUpdate = this._formBuild.group({
      nameUser: [this.nameUser, Validators.required],
      email: [this.email, Validators.required],
    })
  }

  setCloseModal(){
    this.closeModal.emit(false)
  }

  handlerSelectImg(url: string){
    this.urlImg = url;
  }

  public async addNewToGallery() {
    // Take a photo
    const {url, saveFile} = await this._pictureService$.addNewToGallery();

    this.urlImg = url;

    this.saveFileData = saveFile;

  }

  onSubmit() {
    this.showLoading = true;
    const updateData: RegisterData = {
      name: this.formUpdate.get('nameUser').value,
      email: this.formUpdate.get('email').value,
      image: JSON.stringify(this.saveFileData ?? this.urlImg),
      user:"trrhryjry",
      password: "rtyjrjsyj"
    }

    this._service$.updateRegister(updateData).subscribe(async(resp:AuthorizationResponse) => {
      this.refreshPage.emit(true);
      await this._toast.presentToast("Actualización exitosa", 'rocket', 'success');
      this.setCloseModal();
      this.formUpdate.reset();
    },
  (error)=> {
    this._toast.presentToast(error.error, 'close-circle', 'danger');
  })
  }

  outLoading(){
    this.showLoading = false;
  }

}
