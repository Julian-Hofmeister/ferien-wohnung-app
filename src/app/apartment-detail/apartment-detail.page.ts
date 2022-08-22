import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ApartmentDetailService } from './apartment-detail.service';
import { InfoDetailItem } from '../information-detail/information-detail.model';
import { User } from '../authentication/user.model';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.page.html',
  styleUrls: ['./apartment-detail.page.scss'],
})
export class ApartmentDetailPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  id: string;
  title: string;

  isLoading = false;

  loadedApartmentDetailItemList: InfoDetailItem[];

  user: User = {
    id: localStorage.getItem('user-id'),

    email: localStorage.getItem('user-email'),
    password: localStorage.getItem('user-password'),

    role: localStorage.getItem('user-role'),

    houseId: localStorage.getItem('user-houseId'),
    apartmentId: localStorage.getItem('user-apartment'),

    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
  };

  isAdmin = false;

  selectedItem: InfoDetailItem = {
    title: '',
    description: '',
    apartment: '',
    id: '',
    category: '',
  };

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private itemSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private navCtrl: NavController,
    private apartmentDetailService: ApartmentDetailService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchApartmentDetailItems();

    this.isAdmin = this.user.email === 'admin' ? true : false;
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.itemSub.unsubscribe();
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

  // ----------------------------------------------------------------------------------------------

  selectItem(item: InfoDetailItem) {
    // console.log(item.id);
    this.selectedItem = item;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchApartmentDetailItems() {
    this.isLoading = true;

    this.itemSub = this.apartmentDetailService
      .getApartmentDetailItems()
      .subscribe((apartmentDetailItems) => {
        this.loadedApartmentDetailItemList = [];

        // * DEFINE NEW ITEM
        for (const currentLoadedItem of apartmentDetailItems) {
          const fetchedItem: InfoDetailItem = {
            title: currentLoadedItem.title,
            category: currentLoadedItem.category,
            description: currentLoadedItem.description,
            maps: currentLoadedItem.maps,
            website: currentLoadedItem.website,
            phoneNumber: currentLoadedItem.phoneNumber,
            id: currentLoadedItem.id,
            apartment: currentLoadedItem.apartment,
          };

          console.log(currentLoadedItem);

          if (
            this.isAdmin ||
            !fetchedItem.apartment ||
            fetchedItem.apartment === this.user.apartmentId
          ) {
            this.loadedApartmentDetailItemList.push(fetchedItem);
            console.log(fetchedItem.id);
          }

          console.log(this.user.apartmentId);

          this.isLoading = false;
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
