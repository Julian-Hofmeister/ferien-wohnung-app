import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/authentication/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  users: Observable<any[]>;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getUsers(): Observable<any[]> {
    const path = this.afs.collection('users');

    this.users = path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as User;
          data.id = item.payload.doc.id;

          return data;
        })
      )
    );
    return this.users;
  }

  // ----------------------------------------------------------------------------------------------

  getActiveUsers(): Observable<any[]> {
    const path = this.afs.collection('users', (ref) =>
      ref.where('leaveDate', '>=', Date.now()).where('role', '==', 'guest')
    );

    this.users = path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as User;
          data.id = item.payload.doc.id;

          console.log(data);

          return data;
        })
      )
    );
    return this.users;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
