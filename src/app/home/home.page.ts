import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user.model';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  isAdmin = false;

  loadedUsers: User[] = [];
  isLoading = false;

  currentDate = Date.now();

  user: User = {
    email: localStorage.getItem('user-email'),
    id: localStorage.getItem('user-id'),
    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
    apartment: localStorage.getItem('user-apartment'),
  };

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private userSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private authService: AuthService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    if (this.user.email === 'admin') {
      this.isAdmin = true;
      this.fetchUsers();
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

  onOpenUserDetailModal(user: User) {
    this.modalCtrl
      .create({
        component: UserDetailModalComponent,
        cssClass: 'user-detail-modal-css',
        componentProps: {
          user,
        },
      })
      .then((modalEl) => {
        modalEl.present();
      });
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

  private fetchUsers() {
    this.isLoading = true;
    this.userSub = this.authService.getUsers().subscribe((users) => {
      this.loadedUsers = [];

      // * DEFINE NEW ITEM
      for (const currentUser of users) {
        // const imagePath = this.afStorage
        //   .ref(currentLoadedItem.imagePath)
        //   .getDownloadURL();

        const fetchedUser: User = {
          id: currentUser.id,
          email: currentUser.email,
          arriveDate: currentUser.arriveDate,
          leaveDate: currentUser.leaveDate,
          apartment: currentUser.room,
        };

        if (fetchedUser.leaveDate > this.currentDate) {
          this.loadedUsers.push(fetchedUser);
        }

        this.isLoading = false;
        console.log(this.loadedUsers);
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
