import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { OfferItem } from './offer.model';
import { OffersService } from './offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////
  loadedOfferItemList: OfferItem[];
  isLoading = false;

  private itemSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    // private router: Router,
    private route: ActivatedRoute,
    private afStorage: AngularFireStorage,
    private offerService: OffersService,
    private navCtrl: NavController
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.fetchOfferItemsFromFirestore();
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
  public onOpenOfferDetailPage(item: OfferItem) {
    this.navCtrl.navigateForward(['/', 'offer-detail', item.id, item.title]);
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchOfferItemsFromFirestore() {
    this.isLoading = true;
    this.itemSub = this.offerService
      .getOfferItems()
      .subscribe((informationItems) => {
        this.loadedOfferItemList = [];

        // * DEFINE NEW ITEM
        for (const currentLoadedItem of informationItems) {
          // const imagePath = this.afStorage
          //   .ref(currentLoadedItem.imagePath)
          //   .getDownloadURL();

          const fetchedItem: OfferItem = {
            title: currentLoadedItem.title,
            id: currentLoadedItem.id,
          };

          this.loadedOfferItemList.push(fetchedItem);
          this.isLoading = false;
          console.log(this.loadedOfferItemList);
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
