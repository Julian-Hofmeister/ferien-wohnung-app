import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import firebase from 'firebase/app';
import { House } from 'src/app/home/house.model';
@Injectable({
  providedIn: 'root',
})
export class HouseService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  houses: Observable<any[]>;

  house: Observable<House>;

  // path: AngularFirestoreCollection<unknown>;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore, private router: Router) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getHouses(houseId?: string): Observable<any[]> {
    // * DEFINE PATH
    const path = houseId
      ? this.afs.collection('houses', (ref) =>
          ref.where(firebase.firestore.FieldPath.documentId(), '==', houseId)
        )
      : this.afs.collection('houses');

    this.houses = path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as House;
          data.id = item.payload.doc.id;

          console.log(data);

          return data;
        })
      )
    );
    return this.houses;
  }

  // ----------------------------------------------------------------------------------------------

  loadHouses(houseId?: string): Observable<any[]> {
    // * DEFINE PATH
    const path = houseId
      ? this.afs.collection('houses', (ref) =>
          ref.where(firebase.firestore.FieldPath.documentId(), '==', houseId)
        )
      : this.afs.collection('houses');

    this.houses = path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as House;
          data.id = item.payload.doc.id;

          return data;
        })
      )
    );
    return this.houses;
  }

  // ----------------------------------------------------------------------------------------------

  updateHouse(house: House) {
    this.afs.collection('houses').doc(house.id).update({
      id: house.id,

      // clientId: house.clientId,

      // clientEmail: house.clientEmail,

      pageTitle: house.pageTitle,
      pageSubtitle: house.pageSubtitle,

      backgroundImage: house.backgroundImage,

      welcomeMessage: house.welcomeMessage,

      periodOfStayWidget: house.periodOfStayWidget,

      apartmentDetailService: house.apartmentDetailService,
      breakfastService: house.breakfastService,
      saunaService: house.saunaService,
      feedbackService: house.feedbackService,

      feedbackLink: house.feedbackLink,

      // bakerEmail: house.bakerEmail,
    });
  }

  // ----------------------------------------------------------------------------------------------

  createHouse(house: House) {
    this.afs.collection('houses').add({
      id: house.id,

      clientId: house.clientId,

      clientEmail: house.clientEmail,

      pageTitle: house.pageTitle,
      pageSubtitle: house.pageSubtitle,

      backgroundImage: house.backgroundImage,

      welcomeMessage: house.welcomeMessage,

      periodOfStayWidget: house.periodOfStayWidget,

      apartmentDetailService: house.apartmentDetailService,
      breakfastService: house.breakfastService,
      saunaService: house.saunaService,
      feedbackService: house.feedbackService,

      feedbackLink: house.feedbackLink,

      bakerEmail: house.bakerEmail,
    });
  }

  // ----------------------------------------------------------------------------------------------

  updateCardVisibility(title: string) {
    // this.house.
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
