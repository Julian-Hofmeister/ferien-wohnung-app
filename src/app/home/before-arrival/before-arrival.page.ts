import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-before-arrival',
  templateUrl: './before-arrival.page.html',
  styleUrls: ['./before-arrival.page.scss'],
})
export class BeforeArrivalPage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  bikeAmount: number;

  starterMessage = '';

  email = localStorage.getItem('user-email');

  room =
    localStorage.getItem('user-apartment') != null
      ? localStorage.getItem('user-apartment')
      : 'no room number';

  arriveDate = localStorage.getItem('user-arriveDate');

  leaveDate = localStorage.getItem('user-leaveDate');

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore, private navCtrl: NavController) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {}

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onBack() {
    this.navCtrl.back();
  }

  // ----------------------------------------------------------------------------------------------

  onChangeAmount(event: any) {
    this.bikeAmount = event.detail.value;
  }

  // ----------------------------------------------------------------------------------------------

  onChangeMessage(event: any) {
    this.starterMessage = event.detail.value;
  }

  // ----------------------------------------------------------------------------------------------

  onSendStarterMessage() {
    this.afs.collection('bevore-arrival').add({
      email: this.email,
      room: this.room,
      arriveDate: new Date(Number(this.arriveDate)).toLocaleDateString(),
      leaveDate: new Date(Number(this.leaveDate)).toLocaleDateString(),

      bikeAmount: this.bikeAmount.toString(),
      starterMessage: this.starterMessage,
    });
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion}
}
