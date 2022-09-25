import { Component, OnInit } from '@angular/core';
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

  infos: Info[] = [
    {
      title: 'Wlan',
      content: 'Netzwerk123',
    },
    {
      title: 'Wlan',
      content: 'Netzwerk123',
    },
  ];

  columns = true;

  freeText = '';

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
    this.columns = !this.columns;

    console.log(this.columns);
  }
  // ----------------------------------------------------------------------------------------------

  addInfoRow() {
    const newInfo: Info = {
      title: '',
      content: '',
    };

    this.infos.push(newInfo);
  }
  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
