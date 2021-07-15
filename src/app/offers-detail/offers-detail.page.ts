import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
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

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////
  id: string;
  title: string;

  loadedOfferDetailItemList: OfferDetailItem[];
  isLoading = false;

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
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
  }
  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////
  public onBack() {
    this.navCtrl.back();
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////
  private getUrlData() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/information');
        return;
      }

      this.id = paramMap.get('id');
      this.title = paramMap.get('title');
    });
  }

  private fetchOfferDetailItemsFromFirestore() {
    this.isLoading = true;
    this.itemSub = this.offersDetailService
      .getOfferDetailItems()
      .subscribe((offerDetailItems) => {
        this.loadedOfferDetailItemList = [];

        // * DEFINE NEW ITEM
        for (const currentLoadedItem of offerDetailItems) {
          // const imagePath = this.afStorage
          //   .ref(currentLoadedItem.imagePath)
          //   .getDownloadURL();

          const fetchedItem: OfferDetailItem = {
            title: currentLoadedItem.title,
            description: currentLoadedItem.description,
            parentId: currentLoadedItem.parentId,
            id: currentLoadedItem.id,
          };

          // if (fetchedItem.parentId === this.id) {
          this.loadedOfferDetailItemList.push(fetchedItem);
          // }
          this.isLoading = false;
          console.log(this.loadedOfferDetailItemList);
        }
      });
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion
}
