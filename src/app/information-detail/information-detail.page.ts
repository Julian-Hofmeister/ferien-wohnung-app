import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InfoDetailItem } from './information-detail.model';
import { Subscription } from 'rxjs';
import { InformationDetailService } from './information-detail.service';
import { User } from '../authentication/user.model';

@Component({
  selector: 'app-information-detail',
  templateUrl: './information-detail.page.html',
  styleUrls: ['./information-detail.page.scss'],
})
export class InformationDetailPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  id: string;
  title: string;

  loadedInfoDetailItemList: InfoDetailItem[];

  isLoading = false;

  user: User = {
    email: localStorage.getItem('user-email'),
    id: localStorage.getItem('user-id'),
    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
    apartment: localStorage.getItem('user-apartment'),
  };

  isAdmin = false;

  selectedItem: InfoDetailItem = {
    title: '',
    description: '',
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
    private route: ActivatedRoute,
    private informationDetailService: InformationDetailService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.getUrlData();

    this.fetchInfoDetailItems();

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

  selectItem(item: InfoDetailItem) {
    // console.log(item.id);
    this.selectedItem = item;
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

      console.log(this.id);
    });
  }

  // ----------------------------------------------------------------------------------------------

  private fetchInfoDetailItems() {
    this.isLoading = true;

    this.itemSub = this.informationDetailService
      .getInfoDetailItems()
      .subscribe((infoDetailItems) => {
        this.loadedInfoDetailItemList = [];

        for (const currentLoadedItem of infoDetailItems) {
          const fetchedItem: InfoDetailItem = {
            title: currentLoadedItem.title,
            category: currentLoadedItem.category,
            description: currentLoadedItem.description,
            maps: currentLoadedItem.maps,
            website: currentLoadedItem.website,
            phoneNumber: currentLoadedItem.phoneNumber,
            parentId: currentLoadedItem.parentId,
            id: currentLoadedItem.id,
          };

          if (fetchedItem.parentId === this.id) {
            this.loadedInfoDetailItemList.push(fetchedItem);
          }

          this.isLoading = false;
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
