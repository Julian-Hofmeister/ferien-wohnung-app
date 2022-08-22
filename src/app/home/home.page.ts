import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';

import { House } from './house.model';
import { User } from '../authentication/user.model';

import { AuthService } from '../authentication/auth.service';

import { Subscription } from 'rxjs/internal/Subscription';
import { HouseService } from '../master/house.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

// ----------------------------------------------------------------------------------------------

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

  // ----------------------------------------------------------------------------------------------

  loadedUsers: User[] = [];

  loadedHouses: House[] = [];

  // loadedHouse: House;

  currentDate = Date.now();

  data = null;

  // ----------------------------------------------------------------------------------------------

  house: House;

  loadedHouse$: Observable<House>;

  // ----------------------------------------------------------------------------------------------

  user: User = {
    id: localStorage.getItem('user-id'),

    email: localStorage.getItem('user-email'),
    password: localStorage.getItem('user-password'),

    role: localStorage.getItem('user-role'),

    houseId: localStorage.getItem('house-id'),
    apartmentId: localStorage.getItem('user-apartment'),

    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
  };

  // ----------------------------------------------------------------------------------------------

  validDevice: boolean;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private userSub: Subscription;

  private houseSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private authService: AuthService,
    private houseService: HouseService,
    private platform: Platform,
    private storage: AngularFireStorage,
    private navCtrl: NavController
  ) {
    platform.ready().then(() => {
      console.log('Width: ' + platform.width());

      this.validDevice = platform.width() <= 1000 ? true : false;
    });
  }

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchUsers();

    this.fetchHouses();

    this.loadedHouse$ = this.houseService.loadHouse(this.user.houseId);

    console.log(this.user.houseId);

    console.log(this.user.arriveDate);
    console.log(this.user.leaveDate);

    // this.isAdmin = true;

    console.log(this.user.role);
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    if (this.houseSub) {
      this.houseSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onOpenAdminPage(user?: User) {
    if (user) {
      this.navCtrl.navigateForward('admin', { state: user });
    } else {
      this.router.navigate(['admin']);
    }
  }

  // ----------------------------------------------------------------------------------------------

  onOpenPageCreator() {
    this.router.navigate(['master']);
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

  private async fetchUsers() {
    this.isLoading = true;

    this.userSub = this.authService
      .getUsers(this.currentDate)
      .subscribe((users) => {
        // this.user = null;
        this.loadedUsers = [];

        for (const currentUser of users) {
          const fetchedUser: User = {
            ...currentUser,
          };

          console.log(fetchedUser);

          if (
            fetchedUser.leaveDate > this.currentDate &&
            fetchedUser.role === 'guest'
          ) {
            this.loadedUsers.push(fetchedUser);
          }

          this.isLoading = false;
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  private async fetchHouses() {
    this.isLoading = true;

    this.houseSub = this.houseService
      .getHouses(this.user.houseId)
      .subscribe(async (houses) => {
        this.loadedHouses = [];

        for (const currentHouse of houses) {
          const fetchedHouse: House = {
            ...currentHouse,
          };

          this.house = fetchedHouse;

          this.house.backgroundImage = await this.storage
            .ref(fetchedHouse.backgroundImage)
            .getDownloadURL()
            .toPromise();

          this.isLoading = false;
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
