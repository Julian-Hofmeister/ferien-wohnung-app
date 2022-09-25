import { Component, OnInit } from '@angular/core';
import { InfoCard } from './info-card.model';
import { Info } from './info.model';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  infoCard: InfoCard = {
    title: '',

    columns: true,

    infos: [
      {
        title: 'Wlan',
        content: 'Netzwerk123',
      },
      {
        title: 'Wlan',
        content: 'Netzwerk123',
      },
    ],

    freeText: '',
  };

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor() {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {}

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  changeColumns() {
    this.infoCard.columns = !this.infoCard.columns;

    console.log(this.infoCard.columns);
  }
  // ----------------------------------------------------------------------------------------------

  addInfoRow() {
    const newInfo: Info = {
      title: '',
      content: '',
    };

    this.infoCard.infos.push(newInfo);
  }

  // ----------------------------------------------------------------------------------------------

  deleteInfoRow(info: Info) {
    this.infoCard.infos.forEach((item, index) => {
      if (item === info) this.infoCard.infos.splice(index, 1);
    });
  }

  // ----------------------------------------------------------------------------------------------

  saveInfoCard() {}

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
