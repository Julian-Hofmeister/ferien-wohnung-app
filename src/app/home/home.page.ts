import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { House } from './house.model';
import { Card } from './action-card/card.model';
import { User } from '../authentication/user.model';
import { HouseService } from '../shared/services/house.service';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../authentication/auth.service';
import { ApartmentsService } from '../shared/services/apartments.service';
import { Apartment } from './apartment.model';

// ----------------------------------------------------------------------------------------------

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @ViewChild(IonModal) logoutModal: IonModal;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  isAdmin = false;

  isLoading = true;

  currentDate = Date.now();

  // ----------------------------------------------------------------------------------------------

  house: House;

  apartment: Apartment;

  loadedUsers$: Observable<User[]>;
  loadedApartment$: Observable<Apartment>;

  backgroundImage: string;

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

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private houseSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private storage: AngularFireStorage,
    private houseService: HouseService,
    private userService: UserService,
    private authService: AuthService,
    private apartmentService: ApartmentsService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    if (this.user.role == 'admin') {
      this.loadedUsers$ = this.userService.getActiveUsers();
    }

    this.fetchHouse();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    if (this.houseSub) {
      this.houseSub.unsubscribe();
    }
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onOpenMaster() {
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

  onOpenFeedbackLink() {
    window.location.href = 'https://g.page/r/CcgiqX68TxgkEAg/review';
  }

  // ----------------------------------------------------------------------------------------------

  onLogout() {
    this.authService.logout();

    this.onDismissLogoutModal();
  }

  // ----------------------------------------------------------------------------------------------

  onDismissLogoutModal() {
    this.logoutModal.dismiss();
  }

  // ----------------------------------------------------------------------------------------------

  onOpenAdminPage(userToEdit?: User) {
    if (userToEdit) {
      this.navCtrl.navigateForward('admin', { state: userToEdit });
    } else {
      this.router.navigate(['admin']);
    }
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private async fetchHouse() {
    this.isLoading = true;

    this.houseSub = this.houseService
      .getHouses(this.user.houseId)
      .subscribe(async (houses) => {
        for (const currentHouse of houses) {
          this.house = {
            ...currentHouse,
          };

          this.backgroundImage = await this.storage
            .ref(currentHouse.backgroundImage)
            .getDownloadURL()
            .toPromise();

          // this.backgroundImage = '/assets/images/mountain-1.jpg';
        }

        console.log(this.backgroundImage);
        this.isLoading = false;
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
