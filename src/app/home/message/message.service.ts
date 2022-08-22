import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  messages: Observable<any[]>;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private afs: AngularFirestore) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  getMessages(userId: string): Observable<any[]> {
    console.log(userId);

    let path = this.afs.collection('users/' + userId + '/messages');

    this.messages = path.snapshotChanges().pipe(
      map((changes) =>
        changes.map((item) => {
          const data = item.payload.doc.data() as Message;
          console.log(data.message);

          return data;
        })
      )
    );
    return this.messages;
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
