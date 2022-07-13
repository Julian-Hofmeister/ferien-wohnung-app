import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { House } from 'src/app/home/house.model';
import { HouseService } from 'src/app/home/house.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
})
export class HousesComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Output() houseEmitter = new EventEmitter<House>();

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  loadedHouses: House[] = [];

  selectedHouse: House;

  isLoading: boolean;

  selectedUser: User;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private houseSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private houseService: HouseService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchHouses();
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

  onSelectHouse(house: House) {
    this.selectedHouse = house;

    console.log(house.id);

    this.houseEmitter.emit(house);
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

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

        this.loadedHouses.push(fetchedHouse);

        this.isLoading = false;
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
