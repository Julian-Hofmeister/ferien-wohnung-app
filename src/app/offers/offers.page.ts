import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { OfferDetailItem } from '../offers-detail/offer-detail.model';
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

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  isLoading = false;

  loadedOfferItemList: OfferItem[];

  detailItemList: OfferDetailItem[];
  detailItemListBackup: OfferDetailItem[];

  searchTerm: string;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private itemSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private offerService: OffersService,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  async ngOnInit() {
    this.fetchOfferItemsFromFirestore();

    this.detailItemList = await this.initializeItems();
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

  onOpenOfferDetailPage(item: OfferItem): void {
    this.navCtrl.navigateForward(['/', 'offer-detail', item.id, item.title]);
  }

  // ----------------------------------------------------------------------------------------------

  async initializeItems(): Promise<any> {
    const detailItemList = await this.firestore
      .collection('offers-detail')
      .valueChanges()
      .pipe(first())
      .toPromise();

    this.detailItemListBackup = detailItemList as OfferDetailItem[];

    return detailItemList;
  }

  // ----------------------------------------------------------------------------------------------

  async filterList(evt: any) {
    this.detailItemList = this.detailItemListBackup;
    this.searchTerm = evt.srcElement.value;

    if (!this.searchTerm) {
      return;
    }

    this.detailItemList = this.detailItemList.filter((currentItem) => {
      if (currentItem.title && this.searchTerm) {
        return (
          currentItem.title
            .toLowerCase()
            .indexOf(this.searchTerm.toLowerCase()) > -1 ||
          currentItem.description
            .toLowerCase()
            .indexOf(this.searchTerm.toLowerCase()) > -1
        );
      }
    });
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

        for (const currentLoadedItem of informationItems) {
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
