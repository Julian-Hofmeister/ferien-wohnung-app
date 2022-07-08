import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { House } from './house.model';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  houses: Observable<any[]>;

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

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
