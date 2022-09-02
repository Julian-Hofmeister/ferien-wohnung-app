import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apartment } from 'src/app/home/apartment.model';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  apartments: Observable<Apartment[]>;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  loadApartments(houseId: string): Observable<Apartment[]> {
    this.apartments = this.afs
      .collection('houses')
      .doc(houseId)
      .collection('apartments')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((item) => {
            const data = item.payload.doc.data() as Apartment;
            data.id = item.payload.doc.id;

            return data;
          })
        )
      );
    return this.apartments;
  }

  // ----------------------------------------------------------------------------------------------

  loadApartment(houseId: string, apartmentId: string): Observable<Apartment[]> {
    const path = this.afs
      .collection('houses')
      .doc(houseId)
      .collection('apartments', (ref) =>
        ref.where(firebase.firestore.FieldPath.documentId(), '==', apartmentId)
      );

    this.apartments = path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as Apartment;
          data.id = item.payload.doc.id;

          return data;
        })
      )
    );
    return this.apartments;
  }
  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
