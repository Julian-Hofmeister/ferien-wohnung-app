import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../authentication/user.model';
import { House } from '../home/house.model';
import { Client } from './category/client.model';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  selection: string;

  selectedClient: Client;

  selectedUser: User;

  selectedHouse: House;

  // ----------------------------------------------------------------------------------------------

  // changingClient: Subject<boolean> = new Subject();

  changingUser: Subject<boolean> = new Subject();

  changingHouse: Subject<boolean> = new Subject();

  // ----------------------------------------------------------------------------------------------

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

  onSelectCategory(selection: string) {
    this.selection = selection;

    this.selectedClient = null;
    this.selectedUser = null;
  }

  // ----------------------------------------------------------------------------------------------

  onSelectClient(client: Client) {
    this.selectedClient = client;

    // this.changingClient.next(true);
  }

  // ----------------------------------------------------------------------------------------------

  onSelectUser(user: User) {
    this.selectedUser = user;

    // this.changingUser.next(true);
  }

  // ----------------------------------------------------------------------------------------------

  onSelectHouse(house: House) {
    this.selectedHouse = house;

    this.changingHouse.next(true);
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
