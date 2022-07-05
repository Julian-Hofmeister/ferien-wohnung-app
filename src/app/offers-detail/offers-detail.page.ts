import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from '../authentication/user.model';
import { OfferDetailItem } from './offer-detail.model';
import { OffersDetailService } from './offers-detail.service';

@Component({
  selector: 'app-offers-detail',
  templateUrl: './offers-detail.page.html',
  styleUrls: ['./offers-detail.page.scss'],
})
export class OffersDetailPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  id: string;
  title: string;

  loadedOfferDetailItemList: OfferDetailItem[];

  isLoading = false;

  user: User = {
    email: localStorage.getItem('user-email'),
    id: localStorage.getItem('user-id'),
    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
    apartment: localStorage.getItem('user-apartment'),
    houseId: localStorage.getItem('user-houseId'),
  };

  isAdmin = false;

  selectedItem: OfferDetailItem = {
    title: '',
    description: '',
    id: '',
    parentId: '',
    website: '',
    maps: '',
    phoneNumber: '',
  };

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private itemSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private offersDetailService: OffersDetailService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.getUrlData();

    this.fetchOfferDetailItemsFromFirestore();

    this.isAdmin = this.user.email === 'admin' ? true : false;
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.itemSub.unsubscribe();
  }

  // ----------------------------------------------------------------------------------------------

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

  selectItem(item: OfferDetailItem) {
    // console.log(item.id);
    this.selectedItem = item;
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private getUrlData() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/offers');
        return;
      }

      this.id = paramMap.get('id');
      this.title = paramMap.get('title');
    });
  }

  // ----------------------------------------------------------------------------------------------

  private fetchOfferDetailItemsFromFirestore() {
    this.isLoading = true;
    this.itemSub = this.offersDetailService
      .getOfferDetailItems()
      .subscribe((offerDetailItems) => {
        this.loadedOfferDetailItemList = [];

        for (const currentLoadedItem of offerDetailItems) {
          const fetchedItem: OfferDetailItem = {
            title: currentLoadedItem.title,
            description: currentLoadedItem.description,
            parentId: currentLoadedItem.parentId,
            id: currentLoadedItem.id,
            website: currentLoadedItem.website,
            maps: currentLoadedItem.maps,
            phoneNumber: currentLoadedItem.phoneNumber,
          };

          if (fetchedItem.parentId === this.id) {
            this.loadedOfferDetailItemList.push(fetchedItem);
          }

          this.isLoading = false;
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
