import { Component, Input, OnInit } from '@angular/core';
import { HouseService } from 'src/app/shared/services/house.service';
import { Card } from './card.model';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  // @Input() title: string;

  // @Input() subtitle: string;

  // @Input() btnText: string;

  // @Input() image: string;

  @Input() card: Card;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private houseService: HouseService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.card.btnText = this.card.btnText ?? 'mehr Infos';
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  openLink() {
    if (this.card.link) {
      window.location.href = this.card.link;
    }
  }

  updateCardVisibility() {
    this.houseService.updateCardVisibility(this.card.title);
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
