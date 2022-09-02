import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, NavController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.page.html',
  styleUrls: ['./send-message.page.scss'],
})
export class SendMessagePage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  message = '';

  email = localStorage.getItem('user-email');

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    public afs: AngularFirestore,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {}

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onBack() {
    this.navCtrl.back();
  }

  // ----------------------------------------------------------------------------------------------

  onSendMessage() {
    this.afs.collection('messages').add({
      email: this.email,
      message: this.message,
    });

    this.message = '';

    this.modalCtrl
      .create({
        component: ConfirmationModalComponent,
        cssClass: 'bread-order-confirmation-modal-css',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
