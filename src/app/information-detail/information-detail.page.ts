import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InfoDetailItem } from './information-detail.model';
import { Subscription } from 'rxjs';
import { InformationDetailService } from './information-detail.service';

@Component({
  selector: 'app-information-detail',
  templateUrl: './information-detail.page.html',
  styleUrls: ['./information-detail.page.scss'],
})
export class InformationDetailPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////
  id: string;
  title: string;

  loadedInfoDetailItemList: InfoDetailItem[];
  isLoading = false;

  private itemSub: Subscription;
  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private informationDetailService: InformationDetailService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.getUrlData();
    this.fetchInfoDetailItemsFromFirestore();
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

  private fetchInfoDetailItemsFromFirestore() {
    this.isLoading = true;
    this.itemSub = this.informationDetailService
      .getInfoDetailItems()
      .subscribe((infoDetailItems) => {
        this.loadedInfoDetailItemList = [];

        // * DEFINE NEW ITEM
        for (const currentLoadedItem of infoDetailItems) {
          // const imagePath = this.afStorage
          //   .ref(currentLoadedItem.imagePath)
          //   .getDownloadURL();

          const fetchedItem: InfoDetailItem = {
            title: currentLoadedItem.title,
            category: currentLoadedItem.category,
            description: currentLoadedItem.description,
            parentId: currentLoadedItem.parentId,
            id: currentLoadedItem.id,
          };

          if (fetchedItem.parentId === this.id) {
            this.loadedInfoDetailItemList.push(fetchedItem);
          }
          this.isLoading = false;
          console.log(this.loadedInfoDetailItemList);
        }
      });
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion
}
