import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, NavController } from '@ionic/angular';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-bread-order-page',
  templateUrl: './bread-order-page.page.html',
  styleUrls: ['./bread-order-page.page.scss'],
})
export class BreadOrderPagePage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  nextDay = Date.now() + 86400000;

  message: string;

  email = localStorage.getItem('user-email');

  room = localStorage.getItem('user-apartment');

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

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

  onOrderBread() {
    this.afs.collection('breakfast-orders').add({
      email: this.email,
      room: this.room,
      order: this.message,
      dateRaw: this.nextDay,
      date: new Date(this.nextDay).toLocaleDateString(),
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

  onChangeMessage(event: any) {
    this.message = event.detail.value;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
