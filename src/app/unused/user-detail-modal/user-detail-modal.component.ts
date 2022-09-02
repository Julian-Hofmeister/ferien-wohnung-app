import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/authentication/user.model';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.scss'],
})
export class UserDetailModalComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() user: User;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  arriveDate: any;
  leaveDate: any;
  apartment: string;

  isDisabled = true;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private path = this.afs.collection('users');

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private modalCtrl: ModalController,
    private afs: AngularFirestore
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.arriveDate = new Date(this.user.arriveDate).toISOString();
    this.leaveDate = new Date(this.user.leaveDate).toISOString();
    this.apartment = this.user.apartmentId;
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onDidChange() {
    this.isDisabled = false;
  }

  onClose() {
    this.modalCtrl.dismiss();
  }

  // ----------------------------------------------------------------------------------------------

  onDeleteUser() {
    this.path.doc(this.user.id).delete();

    this.onClose();
  }

  // ----------------------------------------------------------------------------------------------

  onSaveChanges() {
    const arriveTimestamp =
      Math.round(new Date(this.arriveDate).getTime() / 10000000) * 10000000;

    const leaveTimestamp =
      Math.round(new Date(this.leaveDate).getTime() / 10000000) * 10000000;

    this.path.doc(this.user.id).update({
      arriveDate: arriveTimestamp,
      leaveDate: leaveTimestamp,
      room: this.apartment,
    });

    this.onClose();
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
