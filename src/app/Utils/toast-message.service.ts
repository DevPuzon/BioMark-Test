import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
 
@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor( 
    private toastController : ToastController
  ) { }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  } 
  
  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Something went wrong',
      duration: 2000
    });
    toast.present();
  } 
}
