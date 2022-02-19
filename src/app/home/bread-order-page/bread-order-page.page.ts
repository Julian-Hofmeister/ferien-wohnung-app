import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { BreadOrderService } from './bread-order-page.service';
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

  bakerEmail = '';

  savedBakerEmail = '';

  room = localStorage.getItem('user-apartment');

  isLoading = false;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private breadOrderSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    public afs: AngularFirestore,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private breadOrderService: BreadOrderService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchBakerEmail();
  }

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
      senderEmail: this.bakerEmail,
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

  onChangeBakerEmail() {
    this.afs.collection('data').doc('baker-email').set({
      bakerEmail: this.bakerEmail,
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchBakerEmail(): void {
    this.isLoading = true;
    this.breadOrderSub = this.breadOrderService
      .getBakerEmail()
      .subscribe((data) => {
        for (const loadedData of data) {
          this.bakerEmail = loadedData.bakerEmail;
          this.savedBakerEmail = loadedData.bakerEmail;
          console.log(loadedData);
        }

        this.isLoading = false;
      });
  }

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
