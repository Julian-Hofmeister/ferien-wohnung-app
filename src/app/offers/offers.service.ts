import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OfferItem } from './offer.model';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  offerItems: Observable<any[]>;

  houseId = localStorage.getItem('house-id');

  path = this.afs.collection(
    'houses/' + this.houseId + '/offer-categories',
    (ref) => ref.orderBy('title')
  );

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getOfferItems(): Observable<any[]> {
    console.log(this.houseId);

    this.offerItems = this.path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as OfferItem;
          data.id = item.payload.doc.id;
          return data;
        })
      ),
      shareReplay(1)
    );
    return this.offerItems;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
