import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InformationItem } from './information.model';
import { InformationService } from './information.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////
  loadedInformationItemList: InformationItem[];
  isLoading = false;

  private itemSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    // private router: Router,
    private route: ActivatedRoute,
    private afStorage: AngularFireStorage,
    private informationService: InformationService,
    private navCtrl: NavController
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.fetchInformationItemsFromFirestore();
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
  public onOpenInformationDetailPage(item: InformationItem) {
    this.navCtrl.navigateForward([
      '/',
      'information-detail',
      item.id,
      item.title,
    ]);
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchInformationItemsFromFirestore() {
    this.isLoading = true;
    this.itemSub = this.informationService
      .getInformationItems()
      .subscribe((informationItems) => {
        this.loadedInformationItemList = [];

        // * DEFINE NEW ITEM
        for (const currentLoadedItem of informationItems) {
          // const imagePath = this.afStorage
          //   .ref(currentLoadedItem.imagePath)
          //   .getDownloadURL();

          const fetchedItem: InformationItem = {
            title: currentLoadedItem.title,
            id: currentLoadedItem.id,
          };

          this.loadedInformationItemList.push(fetchedItem);
          this.isLoading = false;
          console.log(this.loadedInformationItemList);
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
