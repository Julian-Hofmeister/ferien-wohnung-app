import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { House } from 'src/app/home/house.model';
import { HouseService } from 'src/app/home/house.service';
import { Client } from '../category/client.model';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss'],
})
export class ClientEditorComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() client: Client;

  @ContentChild(IonInput) input: IonInput;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  id = '';

  firstName = '';
  lastName = '';

  email = '';
  password = '';

  showPassword = false;

  loadedHouses: House[] = [];
  selectedHouses: string[] = [];
  showHouses = false;

  isLoading = false;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private houseSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private houseService: HouseService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.id = this.client.id;

    this.firstName = this.client.firstName;
    this.lastName = this.client.lastName;

    this.email = this.client.email;
    this.password = this.client.password;

    this.fetchHouseData();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    if (this.houseSub) {
      this.houseSub.unsubscribe();
    }
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  toggleShow() {
    this.showPassword = !this.showPassword;
    // this.password = this.showPassword ? 'text' : 'password';
  }

  // ----------------------------------------------------------------------------------------------

  onSelectHouse() {
    console.log(this.selectedHouses);
  }

  // ----------------------------------------------------------------------------------------------

  onDisplayHouseSelection() {
    this.showHouses = !this.showHouses;
    console.log(this.showHouses);
  }

  // ----------------------------------------------------------------------------------------------

  onDetachHouse(house: House) {
    house.clientId = 'unset';

    console.log('House was detached');
  }

  // ----------------------------------------------------------------------------------------------

  onCreateHouse() {
    console.log('Create new House');
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchHouseData() {
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

        if (
          fetchedHouse.clientId == this.client.id ||
          fetchedHouse.clientId == 'unset'
        ) {
          this.loadedHouses.push(fetchedHouse);

          console.log(fetchedHouse);

          // this.house = fetchedHouse;
        }

        this.isLoading = false;
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
