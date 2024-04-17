import { ToastController } from "@ionic/angular";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
    /**
     *
     */
    constructor(private toastController: ToastController) {}

    async presentToast(message: string, icon: string, color: string) {
        const toast = await this.toastController.create({
          message: message,
          duration: 2500,
          position: 'bottom',
          icon:icon,
          color:color
        });
    
        await toast.present();
    }
}