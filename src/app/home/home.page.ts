import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { ReservationModalComponent } from './reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private modalCtrl: ModalController, private router: Router) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {}
  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////
  public onLogout() {
    console.log('logging out');
    this.router.navigate(['authentication']);
  }

  public onOpenReservationModal() {
    console.log('open reservation');

    this.modalCtrl
      .create({
        component: ReservationModalComponent,
        cssClass: 'reservation-modal-css',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  public onOpenFeedbackModal() {
    this.modalCtrl
      .create({
        component: FeedbackModalComponent,
        cssClass: 'feedback-modal-css',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  public onOpenMessageModal() {
    this.modalCtrl
      .create({
        component: MessageModalComponent,
        cssClass: 'message-modal-css',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  public onOpenInformationDetailWithPath() {
    console.log('open Information detail');
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
