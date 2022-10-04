import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  users: Observable<any[]>;

  path = this.afs.collection('users');

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore, private router: Router) {}

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  autoSignIn(): true | UrlTree {
    const userEmail = localStorage.getItem('user-email');
    const userId = localStorage.getItem('user-id');

    if (userEmail && userId) {
      this.router.navigate(['tabs/home']);
      // this.router.navigate(['before-arrival']);

      console.log('LOGIN SUCCESS');

      return true;
    } else {
      console.log('NO SUCCESS');

      this.router.navigate(['authentication']);
      return this.router.createUrlTree(['/authentication']);
    }
  }

  // ----------------------------------------------------------------------------------------------

  logout() {
    localStorage.clear();

    this.router.navigate(['authentication']);
  }
  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
