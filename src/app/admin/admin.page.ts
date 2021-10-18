import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from '../authentication/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  email: string;
  apartment: string;
  newUserId: string;

  arriveDate: any;
  leaveDate: any;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private path = this.afs.collection('users');

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private afs: AngularFirestore,
    private navCtrl: NavController,
    private router: Router
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onChangeEmail() {
    console.log(this.email);
  }

  // ----------------------------------------------------------------------------------------------

  onChangeApartment() {
    console.log(this.apartment);
  }

  // ----------------------------------------------------------------------------------------------

  onBack() {
    this.navCtrl.back();
  }

  // ----------------------------------------------------------------------------------------------

  onOpenDetailEditor() {
    this.router.navigate(['admin/detail-editor']);
  }

  // ----------------------------------------------------------------------------------------------

  onCreateUser() {
    this.newUserId = Math.floor(100000 + Math.random() * 900000).toString();

    const arriveTimestamp =
      Math.round(new Date(this.arriveDate).getTime() / 10000000) * 10000000;

    const leaveTimestamp =
      Math.round(new Date(this.leaveDate).getTime() / 10000000) * 10000000;

    const user: User = {
      email: this.email,
      id: this.newUserId,
      arriveDate: arriveTimestamp,
      leaveDate: leaveTimestamp,
      apartment: this.apartment,
    };

    this.path.doc(user.id).set({
      email: user.email,
      arriveDate: arriveTimestamp,
      leaveDate: leaveTimestamp,
      room: user.apartment,
    });

    this.email = null;
    this.apartment = null;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
