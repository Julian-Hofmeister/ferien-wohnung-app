import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { Client } from '../category/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Output() clientEmitter = new EventEmitter<Client>();

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  loadedClients$: Observable<Client[]>;

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private clientsService: ClientsService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadedClients$ = this.clientsService.loadClients();
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onSelectClient(client: Client) {
    this.clientEmitter.emit(client);

    this.clientsService.changeClient(client);
  }

  // ----------------------------------------------------------------------------------------------

  onCreateClient() {
    const newClient: Client = {
      id: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phoneNumber: '',
      avatarUrl: '',
      houses: [],
    };

    this.clientEmitter.emit(newClient);
    this.clientsService.changeClient(newClient);
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
