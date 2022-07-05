import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user.model';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House } from './house.model';
import { HouseService } from './house.service';

// ----------------------------------------------------------------------------------------------

// import Data from '../../assets/json/ohrwumslar.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  isAdmin = false;

  isLoading = true;

  loadedUsers: User[] = [];

  loadedHouse: House;

  currentDate = Date.now();

  data = null;

  // ----------------------------------------------------------------------------------------------

  user: User = {
    id: localStorage.getItem('user-id'),
    email: localStorage.getItem('user-email'),
    apartment: localStorage.getItem('user-apartment'),
    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
    houseId: localStorage.getItem('house-id'),
  };

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private userSub: Subscription;

  private houseSub: Subscription;

  private _jsonURL = 'assets/json/ohrwumslar.json';

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private authService: AuthService,
    private houseService: HouseService,
    private http: HttpClient
  ) {
    this.getJSON().subscribe((data) => {
      console.log(data);

      this.data = data;

      this.isLoading = false;
    });
  }

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    if (this.user.email === 'admin') {
      this.isAdmin = true;
      this.fetchUsers();
    }

    this.fetchHouseData();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onOpenAdminPage() {
    this.router.navigate(['admin']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenBeforeArrivalPage() {
    this.router.navigate(['before-arrival']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenBreadOrderPage() {
    this.router.navigate(['bread-order']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenReservationPage() {
    this.router.navigate(['sauna-reservation']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenApartmentDetailPage() {
    this.router.navigate(['apartment-detail']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenMessagePage() {
    this.router.navigate(['/message']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenContactsPage() {
    this.router.navigate(['/contacts']);
  }

  // ----------------------------------------------------------------------------------------------

  onOpenFeedbackLink() {
    window.location.href = 'https://g.page/r/CcgiqX68TxgkEAg/review';
  }

  // ----------------------------------------------------------------------------------------------

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

  onLogout() {
    this.modalCtrl
      .create({
        component: LogoutModalComponent,
        cssClass: 'logout-modal-css',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

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
          houseId: currentUser.houseId,
        };

        if (fetchedUser.leaveDate > this.currentDate) {
          this.loadedUsers.push(fetchedUser);
        }

        this.isLoading = false;
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  private fetchHouseData() {
    this.isLoading = true;

    this.houseSub = this.houseService.getUsers().subscribe((houses) => {
      this.loadedUsers = [];

      // * DEFINE NEW ITEM
      for (const currentHouse of houses) {
        // const imagePath = this.afStorage
        //   .ref(currentLoadedItem.imagePath)
        //   .getDownloadURL();

        const fetchedHouse: House = {
          id: currentHouse.id,

          pageTitle: currentHouse.pageTitle,
          pageSubtitle: currentHouse.pageSubtitle,

          backgroundImage: currentHouse.backgroundImage,

          welcomeMessage: currentHouse.welcomeMessage,

          periodOfStayWidget: currentHouse.periodOfStayWidget,

          apartmentDetailService: currentHouse.apartmentDetailService,
          breakfastService: currentHouse.breakfastService,
          saunaService: currentHouse.saunaService,
          feedbackService: currentHouse.feedbackService,

          feedbackLink: currentHouse.feedbackLink,

          bakerEmail: currentHouse.bakerEmail,
          clientEmail: currentHouse.clientEmail,
        };

        if (fetchedHouse.id == this.user.houseId) {
          this.loadedHouse = fetchedHouse;

          console.log(fetchedHouse);
        }

        this.isLoading = false;
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  private getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  //#endregion
}
