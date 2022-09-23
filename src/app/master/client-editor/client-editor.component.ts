import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { House } from 'src/app/home/house.model';
import { Client } from '../category/client.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HouseService } from 'src/app/shared/services/house.service';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { AngularFireStorage } from '@angular/fire/storage';

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

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),

    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    houseId: new FormControl(),
  });

  // ----------------------------------------------------------------------------------------------

  showPassword = false;

  loadedHouses$: Observable<House[]>;

  selectedHouses: string[] = [];

  // ----------------------------------------------------------------------------------------------

  message: string;

  // ----------------------------------------------------------------------------------------------

  currentImageUrl: string;

  selectedFiles: Array<File>;

  selectedImage: any;

  avatarImg: any;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private clientSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private houseService: HouseService,
    private clientsService: ClientsService,
    private storage: AngularFireStorage
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  async ngOnInit() {
    this.loadedHouses$ = this.houseService.getHouses();

    this.clientSub = this.clientsService.currentClient.subscribe((client) => {
      this.client = client;

      this.clientForm.setValue({
        id: client.id ?? '',
        firstName: client.firstName ?? '',
        lastName: client.lastName ?? '',
        email: client.email ?? '',
        phoneNumber: client.phoneNumber ?? '',
        password: client.password ?? '',
        houseId: client.houses ?? '',
      });
    });

    console.log(this.client);

    this.setImg();
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

  onDetachHouse(house: House) {
    house.clientId = 'unset';

    console.log('House was detached');
  }

  // ----------------------------------------------------------------------------------------------

  onCreateHouse() {
    console.log('Create new House');
  }

  // ----------------------------------------------------------------------------------------------

  async onSubmit() {
    const client: Client = this.clientForm.value;

    if (this.selectedFiles) {
      const file = this.selectedFiles[0];

      // Get the fullPath in Storage after upload
      const fullPathInStorage = await this.uploadImage(file);

      client.avatarUrl = fullPathInStorage;
    }

    console.log(client);

    if (client.id) {
      this.clientsService.updateClient(client);
    } else {
      this.clientsService.createClient(client);
    }
  }

  // ----------------------------------------------------------------------------------------------

  onFileChosen(event: any) {
    this.selectedFiles = event.target.files;

    this.checkFileType();

    // let selectedFile = this.selectedFiles[0];
    // this.checkFileSize(selectedFile);

    // *Display Image on Select
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[0]);
    reader.onload = (_event) => {
      this.selectedImage = reader.result;
    };
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  private checkFileType() {
    var mimeType = this.selectedFiles[0].type;

    if (mimeType.match(/image\/*/) == null) {
      window.confirm(
        'Die Datei kann nicht als Bild erkannt werden. Bitte verwenden sie nur gängige Dateiformate'
      );

      this.selectedFiles = [];
      this.selectedImage = '';

      return;
    }
  }

  // ----------------------------------------------------------------------------------------------

  private async uploadImage(file): Promise<string> {
    /**
     * You can add random number in file.name to avoid overwrites,
     * or replace the file.name to a static string if you intend to overwrite
     */
    const fileRef = this.storage.ref('test').child(file.name);

    // Upload file in reference
    if (!!file) {
      const result = await fileRef.put(file);

      return result.ref.fullPath;
    }
  }

  // ----------------------------------------------------------------------------------------------

  private async setImg() {
    console.log(this.client.avatarUrl);

    this.avatarImg = await this.storage
      .ref(this.client.avatarUrl)
      .getDownloadURL()
      .toPromise();
  }
  //#endregion
}
