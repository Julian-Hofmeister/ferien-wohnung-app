import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { House } from 'src/app/home/house.model';
import { HouseService } from '../house.service';

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

  // ----------------------------------------------------------------------------------------------

  selectedUser: User;

  isLoading: boolean;

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

    this.houseEmitter.emit(house);
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchHouses() {
    this.isLoading = true;

    this.houseSub = this.houseService.getHouses().subscribe((houses) => {
      this.loadedHouses = [];

      for (const currentHouse of houses) {
        const fetchedHouse: House = {
          ...currentHouse,
        };

        this.loadedHouses.push(fetchedHouse);

        this.isLoading = false;
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
