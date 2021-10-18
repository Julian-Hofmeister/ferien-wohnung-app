import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from './reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  reservationList: Observable<any[]>;

  path = this.afs.collection('sauna-reservations', (ref) =>
    ref.orderBy('timestamp')
  );

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getAllReservations() {
    this.reservationList = this.path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((a) => {
          const data = a.payload.doc.data() as Reservation;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );

    return this.reservationList;
  }

  // ----------------------------------------------------------------------------------------------

  deleteReservation(reservationId) {
    this.path.doc(reservationId).delete();
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
