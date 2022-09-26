import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApartmentsService } from 'src/app/shared/services/apartments.service';
import { Apartment } from '../apartment.model';

@Component({
  selector: 'app-apartment-info',
  templateUrl: './apartment-info.component.html',
  styleUrls: ['./apartment-info.component.scss'],
})
export class ApartmentInfoComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  houseId = localStorage.getItem('house-id');

  apartmentId = localStorage.getItem('user-apartment');

  apartment: Apartment;

  isLoading = false;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private apartmentSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private apartmentService: ApartmentsService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchApartment();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
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

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private async fetchApartment() {
    this.isLoading = true;

    this.apartmentSub = this.apartmentService
      .loadApartment(this.houseId, this.apartmentId)
      .subscribe(async (apartments) => {
        for (const currentApartment of apartments) {
          this.apartment = {
            ...currentApartment,
          };
        }

        console.log(this.apartment);

        this.isLoading = false;
      });
  }
  s;
  // ----------------------------------------------------------------------------------------------

  //#endregion
}
