import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { Reservation } from '../reservation-modal/reservation.model';
import { ReservationService } from '../reservation-modal/reservation.service';
import { BookingItem } from './booking-item.model';

@Component({
  selector: 'app-sauna-reservation',
  templateUrl: './sauna-reservation.page.html',
  styleUrls: ['./sauna-reservation.page.scss'],
})
export class SaunaReservationPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  bookingDuration = 120 * 60000;
  startTime = 10 * 3600000;
  endTime = 20 * 3600000;

  currentTime = Date.now();

  bookingItems: Reservation[] = [];

  selectedDateTime = Date.now();
  selectedTimestamp: number;
  selectedItem: BookingItem;

  loadedReservationList: Reservation[];
  userReservation: Reservation = null;

  timeIsDuringStay = true;

  isLoading = false;
  isLoggedIn = true;
  isAdmin = false;

  onlyFreeWindows = false;

  // ----------------------------------------------------------------------------------------------

  user: User = {
    id: localStorage.getItem('user-id'),
    email: localStorage.getItem('user-email'),
    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
    apartment: localStorage.getItem('user-apartment'),
    houseId: localStorage.getItem('user-houseId'),
  };

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private path = this.afs.collection('sauna-reservations');

  private reservationSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    public afs: AngularFirestore,
    private router: Router,
    private reservationService: ReservationService,
    private navCtrl: NavController
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    // this.checkUserAuthorization();

    this.fetchReservations();

    this.selectedDateTime = this.roundTimeToDate(this.selectedDateTime);
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

  onBack() {
    this.navCtrl.back();
  }

  // ----------------------------------------------------------------------------------------------

  onNextDay() {
    this.selectedDateTime = this.selectedDateTime + 86400000;

    this.createTimeWindows();
  }

  // ----------------------------------------------------------------------------------------------

  onPreviousDay() {
    this.selectedDateTime = this.selectedDateTime - 86400000;

    this.createTimeWindows();
  }

  // ----------------------------------------------------------------------------------------------

  onShowOnlyFreeWindows() {
    this.createTimeWindows();
  }

  // ----------------------------------------------------------------------------------------------

  onSelectItem(item: BookingItem) {
    this.timeIsDuringStay = true;

    if (item !== this.selectedItem || !item.isFree || item.isOutdated) {
      this.checkIfReservationDuringStay(item);
      this.selectedItem = item;
    } else {
      this.selectedItem = null;
    }
  }

  // ----------------------------------------------------------------------------------------------

  onSetReservation() {
    if (!this.userReservation) {
      this.path.doc(this.selectedItem.time.toString()).set({
        time: this.selectedItem.time,
        duration: this.selectedItem.duration,
        email: this.user.email,
        date: new Date(this.selectedItem.time),
      });
    }
  }

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  onDeleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation.id);
    this.userReservation = null;
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
            duration: loadedReservation.duration,
            isFree: false,
            user: loadedReservation.user,
            isReservedByUser:
              loadedReservation.email === this.user.email ? true : false,
            isSelected: false,
          };

          this.deleteOutdatedReservations(fetchedReservation);

          this.loadedReservationList.push(fetchedReservation);

          // this.checkIfUserHasReservation();

          if (fetchedReservation.isReservedByUser) {
            this.userReservation = fetchedReservation;
            console.log(this.userReservation);
          }
        }

        this.isLoading = false;

        this.createTimeWindows();
      });
  }

  // ----------------------------------------------------------------------------------------------

  private deleteOutdatedReservations(reservation: Reservation) {
    if (Number(reservation.time) < Date.now()) {
      this.reservationService.deleteReservation(reservation.id);
    }
  }

  // ----------------------------------------------------------------------------------------------

  // private checkIfUserHasReservation() {
  //   this.userReservation = null;

  //   for (const reservation of this.loadedReservationList) {
  //     if (reservation.user === this.user.email) {
  //       this.userReservation = reservation;

  //       console.log(this.userReservation);
  //     }
  //   }
  // }

  // ----------------------------------------------------------------------------------------------

  private checkIfReservationDuringStay(item: BookingItem) {
    if (item.time < this.user.arriveDate || item.time > this.user.leaveDate) {
      this.timeIsDuringStay = false;
    }
  }

  // ----------------------------------------------------------------------------------------------

  private roundTimeToDate(timestamp: number): number {
    const d = new Date(timestamp);
    d.setHours(0, 0, 0, 0);

    timestamp = d.getTime();

    return timestamp;
  }

  // ----------------------------------------------------------------------------------------------

  private createTimeWindows() {
    const dayInMs = 86400000;

    this.bookingItems = [];

    // ### CREATE TIME WINDOWS ###
    for (
      let timeSlot = 0;
      timeSlot < dayInMs / this.bookingDuration;
      timeSlot++
    ) {
      const timeWindow =
        this.selectedDateTime + this.bookingDuration * timeSlot;

      // ### CHECK IF TIME WINDOW IS DURING OPENING HOURS ###
      if (
        this.bookingDuration * timeSlot >= this.startTime &&
        this.bookingDuration * timeSlot < this.endTime
      ) {
        // ### BOOKING ITEM ###
        let bookingItem: Reservation = {
          time: timeWindow,
          duration: this.bookingDuration,
          isFree: true,
          isSelected: false,
        };

        // ### CHECK IF TIME SLOT IS RESERVED ###
        this.loadedReservationList.forEach((reservation) => {
          if (reservation.time === timeWindow) {
            bookingItem = reservation;
          }
        });

        // ### CHECK IF TIME SLOT IS OUTDATED ###
        if (bookingItem.time < this.currentTime) {
          bookingItem.isOutdated = true;
        }

        // ### PUSH ITEM IN LIST ###
        if (
          !this.onlyFreeWindows ||
          (bookingItem.isFree && !bookingItem.isOutdated)
        ) {
          this.bookingItems.push(bookingItem);
        }
      }
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
