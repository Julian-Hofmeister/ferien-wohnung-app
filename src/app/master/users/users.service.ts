import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/authentication/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  users: Observable<any[]>;

  path = this.afs.collection('users');

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getUsers(): Observable<any[]> {
    this.users = this.path.snapshotChanges().pipe(
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

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
