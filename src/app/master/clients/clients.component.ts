import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { Client } from '../category/client.model';
import { ClientsService } from './clients.service';

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

  loadedClients: Client[] = [];

  loadedUsers: User[] = [];

  isLoading: boolean;

  selectedClient: Client;

  selectedUser: User;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private clientSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private clientsService: ClientsService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchClients();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    if (this.clientSub) {
      this.clientSub.unsubscribe();
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onSelectClient(client: Client) {
    this.selectedClient = client;

    console.log(client);

    this.clientEmitter.emit(client);
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchClients() {
    this.isLoading = true;
    this.clientSub = this.clientsService.getClients().subscribe((clients) => {
      this.loadedClients = [];

      // * DEFINE NEW ITEM
      for (const currentClient of clients) {
        // const imagePath = this.afStorage
        //   .ref(currentLoadedItem.imagePath)
        //   .getDownloadURL();

        const fetchedClient: Client = {
          id: currentClient.id,

          email: currentClient.email,
          password: currentClient.password,

          firstName: currentClient.firstName,
          lastName: currentClient.lastName,

          houses: currentClient.houses,
        };

        this.loadedClients.push(fetchedClient);
        this.isLoading = false;
        console.log(this.loadedClients);
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
