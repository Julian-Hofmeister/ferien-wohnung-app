import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { Reservation } from './reservation.model';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
})
export class ReservationModalComponent implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  minuteValues: string[] = ['0'];
  hourValues: string[] = ['10', '12', '14', '16', '18', '20', '22'];

  selectedDateTime: any;
  selectedTimestamp: number;

  currentDateTime = Date.now();

  fetchedUserReservation: Reservation;
  loadedReservationList: Reservation[];

  timeIsAvailable = true;
  timeIsOutdated = false;

  isLoading = false;
  isLoggedIn = true;

  user: User = {
    id: localStorage.getItem('user-id'),

    email: localStorage.getItem('user-email'),
    password: localStorage.getItem('user-password'),

    role: localStorage.getItem('user-role'),

    houseId: localStorage.getItem('user-houseId'),
    apartment: localStorage.getItem('user-apartment'),

    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
  };

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private path = this.afs.collection('sauna-reservations');

  private reservationSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    public afs: AngularFirestore,
    private modalCtrl: ModalController,
    private router: Router,
    private reservationService: ReservationService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.checkUserAuthorization();
    this.fetchReservations();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.reservationSub.unsubscribe();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onClose() {
    this.modalCtrl.dismiss();
  }

  // ----------------------------------------------------------------------------------------------

  onSetReservation() {
    this.onCheckFreeReservation();

    if (this.timeIsAvailable) {
      this.path.doc(this.selectedTimestamp.toString()).set({
        timestamp: this.selectedTimestamp,
        user: this.user.email,
      });

      console.log('TIME IS NOW RESERVED..');

      // this.onClose();
    }
  }

  // ----------------------------------------------------------------------------------------------

  onCheckFreeReservation() {
    const date = new Date(this.selectedDateTime);
    this.selectedTimestamp = Math.round(date.getTime() / 1000000) * 1000000;

    this.timeIsAvailable = true;
    this.timeIsOutdated = false;

    // ### CHECK IF RESERVATION IS IN THE PAST
    if (this.selectedTimestamp < this.currentDateTime) {
      this.timeIsAvailable = false;
      this.timeIsOutdated = true;
    }

    // ### CHECK IF RESERVATION IS DURING THE STAY
    if (
      this.selectedTimestamp > this.user.leaveDate ||
      this.selectedTimestamp < this.user.arriveDate
    ) {
      this.timeIsAvailable = false;
    }

    // ### CHECK IF RESERVATION IS NOT RESERVED BEFORE
    for (const reservation of this.loadedReservationList) {
      if (reservation.id === this.selectedTimestamp.toString()) {
        this.timeIsAvailable = false;
      }
    }
  }

  // ----------------------------------------------------------------------------------------------

  onDeleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation.id);
    this.fetchedUserReservation = null;
  }

  // ----------------------------------------------------------------------------------------------

  toAuthentication() {
    this.onClose();
    this.router.navigate(['authentication']);
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] //////////////////////////////////////////////////////////////////////////

  private fetchReservations(): void {
    this.isLoading = true;
    this.reservationSub = this.reservationService
      .getAllReservations()
      .subscribe((reservations) => {
        this.loadedReservationList = [];

        for (const loadedReservation of reservations) {
          const fetchedReservation: Reservation = {
            id: loadedReservation.id,
            time: loadedReservation.time,
            user: loadedReservation.user,
          };

          this.deleteOutdatedReservations(fetchedReservation);

          this.loadedReservationList.push(fetchedReservation);

          this.checkIfUserHasReservation();
        }
        this.isLoading = false;
        console.log(this.loadedReservationList);
      });
  }

  // ----------------------------------------------------------------------------------------------

  private deleteOutdatedReservations(reservation: Reservation) {
    if (Number(reservation.time) < this.currentDateTime) {
      this.reservationService.deleteReservation(reservation.id);
    }
  }

  // ----------------------------------------------------------------------------------------------

  private checkIfUserHasReservation() {
    this.fetchedUserReservation = null;

    for (const reservation of this.loadedReservationList) {
      if (reservation.user === this.user.email) {
        this.fetchedUserReservation = reservation;
      }
    }
  }

  // ----------------------------------------------------------------------------------------------

  private checkUserAuthorization() {
    if (!this.user.email || !this.user.id) {
      this.isLoggedIn = false;
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
