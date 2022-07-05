import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InformationItem } from './information.model';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  informationItems: Observable<any[]>;

  houseId = localStorage.getItem('house-id');

  path = this.afs.collection(
    'houses/' + this.houseId + '/information-categories',
    (ref) => ref.orderBy('title')
  );

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getInformationItems() {
    this.informationItems = this.path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as InformationItem;
          data.id = item.payload.doc.id;
          console.log('data: ' + data);

          console.log(this.informationItems);
          return data;
        })
      ),
      shareReplay(1)
    );
    return this.informationItems;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
