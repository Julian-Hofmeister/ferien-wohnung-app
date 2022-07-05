import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { InformationItem } from './information.model';
import { InformationService } from './information.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { InfoDetailItem } from '../information-detail/information-detail.model';
import { HttpClient } from '@angular/common/http';

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

  loadedInformationItemList: InformationItem[];

  detailItemList: InfoDetailItem[];
  detailItemListBackup: InfoDetailItem[];

  searchTerm: string;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private itemSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private informationService: InformationService,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private http: HttpClient
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  async ngOnInit() {
    this.fetchInformationItemsFromFirestore();

    this.detailItemList = await this.initializeItems();

    console.log(this.isLoading);
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

  onOpenInformationDetailPage(item: InformationItem) {
    this.navCtrl.navigateForward(['/information-detail', item.id, item.title]);
  }

  // ----------------------------------------------------------------------------------------------

  async initializeItems(): Promise<any> {
    const detailItemList = await this.firestore
      .collection('information-detail')
      .valueChanges()
      .pipe(first())
      .toPromise();

    this.detailItemListBackup = detailItemList as InfoDetailItem[];

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

  private fetchInformationItemsFromFirestore() {
    this.isLoading = true;

    this.itemSub = this.informationService
      .getInformationItems()
      .subscribe((informationItems) => {
        this.loadedInformationItemList = [];

        for (const currentLoadedItem of informationItems) {
          const fetchedItem: InformationItem = {
            title: currentLoadedItem.title,
            id: currentLoadedItem.id,
          };

          this.loadedInformationItemList.push(fetchedItem);
          console.log(this.loadedInformationItemList);

          this.isLoading = false;
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
