import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { House } from 'src/app/home/house.model';
import { Client } from '../category/client.model';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { HouseService } from 'src/app/shared/services/house.service';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss'],
})
export class ClientEditorComponent implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  // @Input() client: Client;

  // @ContentChild(IonInput) input: IonInput;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  client: Client;

  clientForm = new FormGroup({
    id: new FormControl(),

    firstName: new FormControl(),
    lastName: new FormControl(),

    email: new FormControl(),
    password: new FormControl(),
  });

  // ----------------------------------------------------------------------------------------------

  showPassword = false;

  loadedHouses$: Observable<House[]>;

  selectedHouses: string[] = [];

  showHouses = false;

  // ----------------------------------------------------------------------------------------------

  message: string;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private clientSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private houseService: HouseService,
    private clientsService: ClientsService
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadedHouses$ = this.houseService.getHouses();

    this.clientSub = this.clientsService.currentClient.subscribe((client) => {
      this.client = client;

      this.clientForm.setValue({
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        password: client.password,
      });
    });
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  // ----------------------------------------------------------------------------------------------

  onSelectHouse() {
    console.log(this.selectedHouses);
  }

  // ----------------------------------------------------------------------------------------------

  onDisplayHouseSelection() {
    this.showHouses = !this.showHouses;
    console.log(this.showHouses);
  }

  // ----------------------------------------------------------------------------------------------

  onDetachHouse(house: House) {
    house.clientId = 'unset';

    console.log('House was detached');
  }

  // ----------------------------------------------------------------------------------------------

  onCreateHouse() {
    console.log('Create new House');
  }

  // ----------------------------------------------------------------------------------------------

  onSubmit() {
    console.log(this.clientForm.value);
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
