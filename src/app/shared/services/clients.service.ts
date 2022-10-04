import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/master/category/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  clients: Observable<Client[]>;

  path = this.afs.collection('clients');

  newClient: Client = {
    id: '',

    firstName: '',
    lastName: '',

    email: '',
    password: '',
    phoneNumber: '',
    avatarUrl: '',

    houses: [],
  };

  private clientSource = new BehaviorSubject(this.newClient);

  currentClient = this.clientSource.asObservable();

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  loadClients(clientId?): Observable<Client[]> {
    const path = clientId
      ? this.afs.collection('clients', (ref) =>
          ref.where(firebase.firestore.FieldPath.documentId(), '==', clientId)
        )
      : this.afs.collection('clients');

    this.clients = path.snapshotChanges().pipe(
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

  changeClient(client: Client) {
    this.clientSource.next(client);
  }

  // ----------------------------------------------------------------------------------------------

  updateClient(client: Client) {
    this.path.doc(client.id).update({ ...client });

    console.log('succes');
  }

  // ----------------------------------------------------------------------------------------------

  createClient(client: Client) {
    this.path.add({ ...client });
  }

  // ----------------------------------------------------------------------------------------------

  getClientById(clientId: string) {
    this.path.doc(clientId).get();
  }
  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
