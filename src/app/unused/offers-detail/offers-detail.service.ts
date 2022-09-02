import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { InfoDetailItem } from '../information-detail/information-detail.model';

@Injectable({
  providedIn: 'root',
})
export class OffersDetailService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  offerDetailItems: Observable<any[]>;

  houseId = localStorage.getItem('house-id');

  path = this.afs.collection(
    'houses/' + this.houseId + '/offer-detail',
    (ref) => ref.orderBy('title')
  );

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getOfferDetailItems(): Observable<any[]> {
    this.offerDetailItems = this.path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as InfoDetailItem;
          data.id = item.payload.doc.id;
          return data;
        })
      ),
      shareReplay(1)
    );

    return this.offerDetailItems;
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
