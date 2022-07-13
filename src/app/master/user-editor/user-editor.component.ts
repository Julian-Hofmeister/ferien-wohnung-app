import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { Apartment } from 'src/app/home/apartment.model';
import { House } from 'src/app/home/house.model';
import { HouseService } from 'src/app/home/house.service';
import { Client } from '../category/client.model';
import { ClientsService } from '../clients/clients.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() user: User;

  @Input() changing: Subject<boolean>;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  id = '';

  email = '';
  password = '';

  arriveDate: any;
  leaveDate: any;

  role: string;

  selectedClient: Client;
  selectedHouse: House;
  selectedApartment: Apartment;

  // ----------------------------------------------------------------------------------------------

  showPassword = false;

  isLoading = false;

  // ----------------------------------------------------------------------------------------------

  loadedUsers: User[] = [];

  loadedClients: Client[] = [];

  loadedHouses: House[] = [];

  loadedApartments: Apartment[] = [];

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private clientSub: Subscription;

  private houseSub: Subscription;

  private apartmentSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private clientsService: ClientsService,
    private houseService: HouseService,
    private userService: UsersService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.onSetUser();

    this.changing.subscribe((v) => {
      this.onSetUser();
    });
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    if (this.clientSub) {
      this.clientSub.unsubscribe();
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

  onSetUser() {
    this.id = null;
    this.selectedClient = null;
    this.selectedHouse = null;
    this.selectedApartment = null;

    this.fetchClients();

    this.id = this.user.id;

    this.email = this.user.email;
    this.password = this.user.password;

    this.role = this.user.role;

    this.arriveDate = new Date(this.user.arriveDate).toISOString();
    this.leaveDate = new Date(this.user.leaveDate).toISOString();
  }

  // ----------------------------------------------------------------------------------------------

  onSave() {
    const user: User = {
      id: this.id,
      email: this.email,
      password: this.password,

      role: this.role,

      clientId: this.selectedClient.id,
      houseId: this.selectedHouse.id,
      apartmentId: this.selectedApartment.id,
      apartment: this.selectedApartment.id,

      arriveDate: this.arriveDate,
      leaveDate: this.leaveDate,
    };

    console.log(user);

    if (this.id) {
      this.userService.updateUser(user);
    } else {
      this.userService.createUser(user);
    }
  }

  // ----------------------------------------------------------------------------------------------

  onSelectClient() {
    this.fetchHouses();
  }

  // ----------------------------------------------------------------------------------------------

  onSelectHouse() {
    this.fetchApartments();
  }

  // ----------------------------------------------------------------------------------------------

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  // ----------------------------------------------------------------------------------------------
  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchClients() {
    this.isLoading = true;
    this.clientSub = this.clientsService.getClients().subscribe((clients) => {
      this.loadedClients = [];

      // * DEFINE NEW ITEM
      for (const currentClient of clients) {
        // const imagePath = this.afStorage
        //   .ref(currentLoadedItem.imagePath)
        //   .getDownloadURL();

        const fetchedClient: Client = {
          id: currentClient.id,

          email: currentClient.email,
          password: currentClient.password,

          firstName: currentClient.firstName,
          lastName: currentClient.lastName,

          houses: currentClient.houses,
        };

        this.loadedClients.push(fetchedClient);

        if (this.user.clientId == currentClient.clientId) {
          this.selectedClient = fetchedClient;

          this.fetchHouses();
        }

        this.isLoading = false;
        console.log(this.loadedApartments);
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  private fetchHouses() {
    this.isLoading = true;

    this.houseSub = this.houseService.getHouses().subscribe((houses) => {
      this.loadedHouses = [];

      // * DEFINE NEW ITEM
      for (const currentHouse of houses) {
        // const imagePath = this.afStorage
        //   .ref(currentLoadedItem.imagePath)
        //   .getDownloadURL();

        const fetchedHouse: House = {
          id: currentHouse.id,
          clientId: currentHouse.clientId,

          pageTitle: currentHouse.pageTitle,
          pageSubtitle: currentHouse.pageSubtitle,

          backgroundImage: currentHouse.backgroundImage,

          welcomeMessage: currentHouse.welcomeMessage,

          periodOfStayWidget: currentHouse.periodOfStayWidget,

          apartmentDetailService: currentHouse.apartmentDetailService,
          breakfastService: currentHouse.breakfastService,
          saunaService: currentHouse.saunaService,
          feedbackService: currentHouse.feedbackService,

          feedbackLink: currentHouse.feedbackLink,

          bakerEmail: currentHouse.bakerEmail,
          clientEmail: currentHouse.clientEmail,
        };

        if (this.selectedClient.id == fetchedHouse.clientId) {
          this.loadedHouses.push(fetchedHouse);
        }

        if (this.user.houseId == fetchedHouse.id) {
          this.selectedHouse = fetchedHouse;

          this.fetchApartments();
        }

        console.log(fetchedHouse);

        // this.house = fetchedHouse;

        this.isLoading = false;
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  private fetchApartments() {
    this.isLoading = true;
    this.apartmentSub = this.houseService
      .getApartment(this.selectedHouse.id)
      .subscribe((apartments) => {
        this.loadedApartments = [];

        // * DEFINE NEW ITEM
        for (const currentApartment of apartments) {
          // const imagePath = this.afStorage
          //   .ref(currentLoadedItem.imagePath)
          //   .getDownloadURL();

          const fetchedApartment: Apartment = {
            id: currentApartment.id,
            title: currentApartment.title,
          };

          if (this.user.apartment == fetchedApartment.id) {
            this.selectedApartment = fetchedApartment;
          }

          this.loadedApartments.push(fetchedApartment);
          this.isLoading = false;
          console.log(this.loadedApartments);
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
