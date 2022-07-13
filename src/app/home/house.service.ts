import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apartment } from './apartment.model';
import { House } from './house.model';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  houses: Observable<any[]>;

  apartments: Observable<any[]>;

  path = this.afs.collection('houses');

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore, private router: Router) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getHouses(): Observable<any[]> {
    this.houses = this.path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as House;
          data.id = item.payload.doc.id;
          console.log('data', data);

          return data;
        })
      )
    );
    return this.houses;
  }

  // ----------------------------------------------------------------------------------------------

  getApartment(houseId: string): Observable<any[]> {
    this.apartments = this.path
      .doc(houseId)
      .collection('apartments')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((item) => {
            const data = item.payload.doc.data() as Apartment;
            data.id = item.payload.doc.id;
            console.log('data', data);

            return data;
          })
        )
      );
    return this.apartments;
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

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
