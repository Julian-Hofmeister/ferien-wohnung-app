import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { InformationItem } from './information.model';
import { InformationService } from './information.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { InfoDetailItem } from '../information-detail/information-detail.model';
import { HttpClient } from '@angular/common/http';
import { InformationDetailService } from '../information-detail/information-detail.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  isLoading = false;

  searchTerm: string;

  detailItemList: InfoDetailItem[] = [];
  detailItemFilteredList: InfoDetailItem[];

  loadedInfoCategories$: Observable<InformationItem[]>;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private infoDetailItemSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private informationService: InformationService,
    private informationDetailService: InformationDetailService,
    private navCtrl: NavController
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadedInfoCategories$ = this.informationService.getInformationItems();

    this.loadInfoDetailItems();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.infoDetailItemSub.unsubscribe();
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onOpenInformationDetailPage(item: InformationItem) {
    this.navCtrl.navigateForward(['/information-detail', item.id, item.title]);
  }

  // ----------------------------------------------------------------------------------------------

  async filterList(evt: any) {
    this.searchTerm = evt.srcElement.value;

    if (!this.searchTerm) {
      return;
    }

    this.detailItemFilteredList = this.detailItemList.filter((currentItem) => {
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

  private loadInfoDetailItems() {
    this.infoDetailItemSub = this.informationDetailService
      .getInfoDetailItems()
      .subscribe(async (items) => {
        for (const currentItem of items) {
          const infoDetailItem: InfoDetailItem = {
            ...currentItem,
          };
          this.detailItemList.push(infoDetailItem);
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
