import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InformationItem } from './information.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////
  informationItems: Observable<any[]>;

  path = this.afs.collection('information', (ref) => ref.orderBy('title'));
  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////
  public getInformationItems() {
    this.informationItems = this.path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as InformationItem;
          data.id = item.payload.doc.id;
          return data;
        })
      )
    );
    return this.informationItems;
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
