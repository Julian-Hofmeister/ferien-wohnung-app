import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { User } from 'src/app/authentication/user.model';
import { Apartment } from 'src/app/home/apartment.model';
import { House } from 'src/app/home/house.model';
import { Client } from '../category/client.model';

import { FormControl, FormGroup } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { UsersService } from '../users.service';
import { HouseService } from '../house.service';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  // @Input() user: User;

  // @Input() changing: Subject<boolean>;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  user: User;

  userForm = new FormGroup({
    id: new FormControl(),

    email: new FormControl(),
    password: new FormControl(),

    role: new FormControl(),

    clientId: new FormControl(),
    houseId: new FormControl(),
    apartmentId: new FormControl(),

    arriveDate: new FormControl(),
    leaveDate: new FormControl(),
  });

  selectedClient: Client;

  selectedHouse: House;
  selectedApartment: Apartment;

  // ----------------------------------------------------------------------------------------------

  showPassword = false;

  isLoading = false;

  // ----------------------------------------------------------------------------------------------

  // loadedUsers: User[] = [];

  // loadedClients: Client[] = [];

  // loadedHouses: House[] = [];

  loadedApartments: Apartment[] = [];

  loadedHouses$: Observable<House[]>;

  loadedClients$: Observable<Client[]>;

  loadedApartments$: Observable<Apartment[]>;

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private userSub: Subscription;

  private houseSub: Subscription;

  private apartmentSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private clientsService: ClientsService,
    private houseService: HouseService,
    private userService: UsersService,
    private apartmentsService: ApartmentsService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    // this.onSetUser();

    this.loadedHouses$ = this.houseService.loadHouses();

    this.loadedClients$ = this.clientsService.loadClients();

    this.userSub = this.userService.currentUser.subscribe((user: User) => {
      this.user = user;

      console.log(user);

      this.userForm.setValue({
        id: user.id ?? '',

        email: user.email ?? '',
        password: user.password ?? '',

        role: user.role ?? '',

        clientId: user.clientId,
        houseId: user.houseId,
        apartmentId: user.apartmentId,

        arriveDate: user.arriveDate
          ? new Date(user.arriveDate).toISOString()
          : Date.now(),
        leaveDate: user.arriveDate
          ? new Date(user.leaveDate).toISOString()
          : Date.now(),
      });
    });

    // this.loadedApartments$ = this.apartmentsService.loadApartments(this.selectedHouse.id);

    // this.changing.subscribe((v) => {
    //   this.onSetUser();
    // });
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.houseSub) {
      this.houseSub.unsubscribe();
    }

    if (this.apartmentSub) {
      this.apartmentSub.unsubscribe();
    }
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  // onSetUser() {
  //   this.id = null;
  //   this.selectedClient = null;
  //   this.selectedHouse = null;
  //   this.selectedApartment = null;

  //   this.fetchClients();

  //   this.id = this.user.id;

  //   this.email = this.user.email;
  //   this.password = this.user.password;

  //   this.role = this.user.role;

  //   this.arriveDate = new Date(this.user.arriveDate).toISOString();
  //   this.leaveDate = new Date(this.user.leaveDate).toISOString();
  // }

  // ----------------------------------------------------------------------------------------------

  onSave() {
    const user: User = this.userForm.value;

    console.log(user);

    user.arriveDate =
      Math.round(
        new Date(this.userForm.get('arriveDate').value).getTime() / 10000000
      ) * 10000000;

    user.leaveDate =
      Math.round(
        new Date(this.userForm.get('leaveDate').value).getTime() / 10000000
      ) * 10000000;

    if (this.user.id) {
      this.userService.updateUser(user);
    } else {
      this.userService.createUser(user);
    }
  }

  // ----------------------------------------------------------------------------------------------

  onSelectClient() {
    // this.fetchHouses();
    console.log(this.userForm.get('clientId').value);
  }

  // ----------------------------------------------------------------------------------------------

  onSelectHouse() {
    console.log(this.userForm.get('houseId').value);

    this.loadedApartments$ = this.apartmentsService.loadApartments(
      this.userForm.get('houseId').value
    );
  }

  // ----------------------------------------------------------------------------------------------

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  // ----------------------------------------------------------------------------------------------
  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // private fetchClients() {
  //   this.isLoading = true;
  //   this.clientSub = this.clientsService.loadClients().subscribe((clients) => {
  //     this.loadedClients = [];

  //     for (const currentClient of clients) {
  //       const fetchedClient: Client = {
  //         ...currentClient,
  //       };

  //       this.loadedClients.push(fetchedClient);

  //       if (this.user.clientId == currentClient.id) {
  //         this.selectedClient = fetchedClient;

  //         this.fetchHouses();
  //       }

  //       this.isLoading = false;
  //     }
  //   });
  // }

  // // ----------------------------------------------------------------------------------------------

  // private fetchHouses() {
  //   this.isLoading = true;

  //   this.houseSub = this.houseService.getHouses().subscribe((houses) => {
  //     this.loadedHouses = [];

  //     for (const currentHouse of houses) {
  //       const fetchedHouse: House = {
  //         ...currentHouse,
  //       };

  //       if (this.selectedClient.id == fetchedHouse.clientId) {
  //         this.loadedHouses.push(fetchedHouse);
  //       }

  //       if (this.user.houseId == fetchedHouse.id) {
  //         this.selectedHouse = fetchedHouse;

  //         this.fetchApartments();
  //       }

  //       this.isLoading = false;
  //     }
  //   });
  // }

  // // ----------------------------------------------------------------------------------------------

  // private fetchApartments() {
  //   this.isLoading = true;
  //   this.apartmentSub = this.houseService
  //     .getApartment(this.selectedHouse.id)
  //     .subscribe((apartments) => {
  //       this.loadedApartments = [];

  //       for (const currentApartment of apartments) {
  //         const fetchedApartment: Apartment = {
  //           ...currentApartment,
  //         };

  //         if (this.user.apartment == fetchedApartment.id) {
  //           this.selectedApartment = fetchedApartment;
  //         }

  //         this.loadedApartments.push(fetchedApartment);

  //         this.isLoading = false;
  //       }
  //     });
  // }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
