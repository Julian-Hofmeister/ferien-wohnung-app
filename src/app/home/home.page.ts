import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from '../authentication/user.model';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';

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

  isAdmin = false;

  currentDate = Date.now();

  user: User = {
    email: localStorage.getItem('user-email'),
    id: localStorage.getItem('user-id'),
    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
    apartment: localStorage.getItem('user-apartment'),
  };

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private modalCtrl: ModalController, private router: Router) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    if (this.user.email === 'admin') {
      this.isAdmin = true;
    }

    console.log(this.user.apartment);
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onLogout() {
    localStorage.clear();

    this.router.navigate(['authentication']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenAdmin() {
    this.router.navigate(['admin']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenBreadOrderPage() {
    this.router.navigate(['bread-order']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenSendMessage() {
    this.router.navigate(['send-message']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenBeforeArrival() {
    this.router.navigate(['before-arrival']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenApartmentDetail() {
    console.log('open Information detail');
    this.router.navigate(['/apartment-detail']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenReservationModal() {
    // this.modalCtrl
    //   .create({
    //     component: ReservationModalComponent,
    //     cssClass: 'reservation-modal-css',
    //     backdropDismiss: true,
    //   })
    //   .then((modalEl) => {
    //     modalEl.present();
    //   });
    this.router.navigate(['sauna-reservation']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenFeedbackModal() {
    this.modalCtrl
      .create({
        component: FeedbackModalComponent,
        cssClass: 'feedback-modal-css',
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
