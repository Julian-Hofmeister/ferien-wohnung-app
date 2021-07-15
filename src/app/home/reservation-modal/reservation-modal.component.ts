import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
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

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////
  minuteValues: string[] = ['0'];
  hourValues: string[] = ['10', '12', '14', '16', '18', '20', '22'];

  selectedDateTime: any;

  date: Date;
  timestamp: number;
  currentDateTime = Date.now();
  userReservation: Reservation;
  loadedReservationList: Reservation[];

  timeIsAvailable = true;
  timeIsOutdated = false;
  isLoading = false;

  user = 'julian@web.de';

  path = this.afs.collection('sauna-reservations');

  private reservationSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    public afs: AngularFirestore,
    private modalCtrl: ModalController,
    private reservationService: ReservationService
  ) {}
  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchReservationsFromFirestore();
  }

  ngOnDestroy() {
    this.reservationSub.unsubscribe();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////
  public onClose() {
    this.modalCtrl.dismiss();
  }

  public onSetReservation() {
    this.onCheckFreeReservation();

    if (this.timeIsAvailable) {
      this.path.doc(this.timestamp.toString()).set({
        date: this.date,
        timestamp: this.timestamp,
        user: 'julian@web.de',
      });

      console.log('TIME IS NOW RESERVED..');

      // this.onClose();
    }
  }

  public onCheckFreeReservation() {
    console.log('RESERVATION LIST:');
    console.log(this.loadedReservationList);

    this.date = new Date(this.selectedDateTime);
    this.timestamp = Math.round(this.date.getTime() / 1000000) * 1000000;

    this.timeIsAvailable = true;
    this.timeIsOutdated = false;

    if (this.timestamp < this.currentDateTime) {
      this.timeIsAvailable = false;
      this.timeIsOutdated = true;
    }

    for (const reservation of this.loadedReservationList) {
      if (reservation.id === this.timestamp.toString()) {
        this.timeIsAvailable = false;
      }
    }
  }

  public onDeleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation.id);
    this.userReservation = null;
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////
  private fetchReservationsFromFirestore() {
    this.isLoading = true;
    this.reservationSub = this.reservationService
      .getAllReservations()
      .subscribe((reservations) => {
        this.loadedReservationList = [];

        for (const loadedReservation of reservations) {
          const fetchedReservation: Reservation = {
            id: loadedReservation.id,
            timestamp: loadedReservation.timestamp,
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

  private deleteOutdatedReservations(reservation: Reservation) {
    if (Number(reservation.timestamp) < this.currentDateTime) {
      this.reservationService.deleteReservation(reservation.id);
    }
  }

  private checkIfUserHasReservation() {
    this.userReservation = null;

    for (const reservation of this.loadedReservationList) {
      if (reservation.user === 'julian@web.de') {
        this.userReservation = reservation;
      }
    }
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion
}
