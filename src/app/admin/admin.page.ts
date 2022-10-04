import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ActionSheetController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Observable, pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../authentication/user.model';
import { Apartment } from '../home/apartment.model';
import { House } from '../home/house.model';
import { ApartmentsService } from '../shared/services/apartments.service';
import { HouseService } from '../shared/services/house.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  editMode = false;

  isLoading = false;

  displaySelect = false;

  // ----------------------------------------------------------------------------------------------

  user: User;

  admin: Partial<User> = {
    id: localStorage.getItem('user-id'),
    email: localStorage.getItem('user-email'),
    role: localStorage.getItem('user-role'),
    houseId: localStorage.getItem('house-id'),
  };

  userForm = new FormGroup({
    id: new FormControl(),

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(),

    role: new FormControl(),

    clientId: new FormControl(),
    houseId: new FormControl('', [Validators.required]),
    apartmentId: new FormControl('', [Validators.required]),

    arriveDate: new FormControl('', [Validators.required]),
    leaveDate: new FormControl('', [Validators.required]),
  });

  // ----------------------------------------------------------------------------------------------

  loadedHouses$: Observable<House[]>;

  loadedApartments$: Observable<Apartment[]>;

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private path = this.afs.collection('users');

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private afs: AngularFirestore,
    private navCtrl: NavController,
    private router: Router,
    private houseService: HouseService,
    private apartmentsService: ApartmentsService,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) {
    if (router.getCurrentNavigation().extras.state) {
      this.user = this.router.getCurrentNavigation().extras.state as User;

      this.editMode = true;

      this.userForm.setValue({
        id: this.user.id ?? '',

        email: this.user.email ?? '',
        password: this.user.password ?? '',

        role: 'guest',

        clientId: this.admin.id,
        houseId: this.admin.houseId,
        apartmentId: this.user.apartmentId,

        arriveDate: new Date(this.user.arriveDate).toISOString(),
        leaveDate: new Date(this.user.leaveDate).toISOString(),
      });
    }
  }
  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadedHouses$ = this.houseService.loadHouses(this.admin.houseId);

    this.loadedApartments$ = this.apartmentsService.loadApartments(
      this.admin.houseId
    );

    console.log(this.editMode);
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onBack() {
    this.navCtrl.back();
  }

  onSet() {
    // this.userForm.controls.apartmentId.setValue();
  }

  // ----------------------------------------------------------------------------------------------

  onCreateUser() {
    const user: User = {
      ...this.userForm.value,

      password: this.generatePassword(),

      arriveDate: this.roundTimestamp(this.userForm.get('arriveDate').value),
      leaveDate: this.roundTimestamp(this.userForm.get('leaveDate').value),

      clientId: this.admin.id,
      clientEmail: this.admin.email,
      apartmentId: this.userForm.get('apartmentId').value,
      houseId: this.userForm.get('houseId').value,

      role: 'guest',
    };

    if (user.arriveDate > user.leaveDate) {
      this.presentDateErrorToast();
      return;
    }

    this.path.add({
      ...user,
    });

    this.userForm.reset();

    this.onBack();
  }

  // ----------------------------------------------------------------------------------------------

  onUpdateUser() {
    const user: User = {
      ...this.userForm.value,

      arriveDate: this.roundTimestamp(this.userForm.get('arriveDate').value),
      leaveDate: this.roundTimestamp(this.userForm.get('leaveDate').value),

      apartmentId: this.userForm.get('apartmentId').value,
      houseId: this.userForm.get('houseId').value,
    };

    if (user.arriveDate > user.leaveDate) {
      this.presentDateErrorToast();
      return;
    }

    this.path.doc(user.id).update({
      ...user,
    });

    this.userForm.reset();

    this.onBack();
  }

  // ----------------------------------------------------------------------------------------------

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Account löschen',
      buttons: [
        {
          text: 'Löschen',
          role: 'destructive',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            let user: User = this.userForm.value;

            this.path.doc(user.id).delete();

            this.onBack();
          },
        },

        {
          text: 'Abbrechen',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  // ----------------------------------------------------------------------------------------------

  showReadOnly() {
    if (this.editMode) {
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private generatePassword(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // ----------------------------------------------------------------------------------------------

  private roundTimestamp(timestamp: number) {
    return Math.round(new Date(timestamp).getTime() / 10000000) * 10000000;
  }
  // ----------------------------------------------------------------------------------------------

  private async presentDateErrorToast() {
    const toast = await this.toastController.create({
      message: 'Achtung! Das Ankunftsdatum ist größer als das Abreisedatum.',
      duration: 2000,
    });
    toast.present();
  }

  //#endregion
}
