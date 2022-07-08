import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/authentication/user.model';

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

  user: User = {
    id: localStorage.getItem('user-id'),

    email: localStorage.getItem('user-email'),
    password: localStorage.getItem('user-password'),

    role: localStorage.getItem('user-role'),

    houseId: localStorage.getItem('user-houseId'),
    apartment: localStorage.getItem('user-apartment'),

    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
  };

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
      email: this.user.email,
      room: this.user.apartment,
      arriveDate: new Date(Number(this.user.arriveDate)).toLocaleDateString(),
      leaveDate: new Date(Number(this.user.leaveDate)).toLocaleDateString(),

      // bikeAmount: this.bikeAmount.toString(),
      starterMessage: this.starterMessage,
    });
  }

  // ----------------------------------------------------------------------------------------------

  onSendBikeReservation() {
    this.afs.collection('bevore-arrival').add({
      // email: this.email,
      // room: this.room,
      // arriveDate: new Date(Number(this.arriveDate)).toLocaleDateString(),
      // leaveDate: new Date(Number(this.leaveDate)).toLocaleDateString(),

      bikeAmount: this.bikeAmount.toString(),
      //  starterMessage: this.starterMessage,
    });
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion}
}
