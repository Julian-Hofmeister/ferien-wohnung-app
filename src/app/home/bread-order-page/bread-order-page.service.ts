import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { InfoDetailItem } from 'src/app/information-detail/information-detail.model';

@Injectable({
  providedIn: 'root',
})
export class BreadOrderService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  data: Observable<any[]>;

  dateNow = Date.now();

  path = this.afs.collection('data');

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getBakerEmail() {
    this.data = this.path.snapshotChanges().pipe(
      map(
        (changes) =>
          changes.map((item) => {
            const data = item.payload.doc.data() as InfoDetailItem;
            data.id = item.payload.doc.id;
            return data;
          }),
        shareReplay(1)
      )
    );
    return this.data;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
