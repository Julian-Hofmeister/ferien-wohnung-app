import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/authentication/user.model';
import { Client } from '../category/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  clients: Observable<any[]>;

  path = this.afs.collection('clients');

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getClients(): Observable<any[]> {
    this.clients = this.path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as Client;
          data.id = item.payload.doc.id;
          return data;
        })
      )
    );
    return this.clients;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
