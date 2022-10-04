import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/authentication/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  users: Observable<any[]>;

  path = this.afs.collection('users');

  // ----------------------------------------------------------------------------------------------

  private userSource = new BehaviorSubject(null);

  currentUser = this.userSource.asObservable();

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

  loadUsers(): Observable<any[]> {
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

  changeUser(user: User) {
    this.userSource.next(user);
  }

  // ----------------------------------------------------------------------------------------------

  createUser(user: User) {
    this.afs.collection('users').add({
      ...user,
    });
  }

  // ----------------------------------------------------------------------------------------------

  updateUser(user: User) {
    this.afs
      .collection('users')
      .doc(user.id)
      .update({
        ...user,
      });
  }
  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
