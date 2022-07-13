import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { House } from 'src/app/home/house.model';
import { HouseService } from 'src/app/home/house.service';

@Component({
  selector: 'app-house-editor',
  templateUrl: './house-editor.component.html',
  styleUrls: ['./house-editor.component.scss'],
})
export class HouseEditorComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() house: House;

  @Input() changing: Subject<boolean>;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  id: string;

  pageTitle: string;
  pageSubtitle: string;

  backgroundImage: string;

  welcomeMessage: string;

  periodOfStayWidget: boolean;

  apartmentDetailService: boolean;
  breakfastService: boolean;
  saunaService: boolean;
  feedbackService: boolean;

  feedbackLink: string;

  bakerEmail: string;

  // ----------------------------------------------------------------------------------------------

  currentImageUrl: string;

  selectedFiles: Array<File>;

  selectedImage: any;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private houseService: HouseService,
    private storage: AngularFireStorage
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.setData();

    this.changing.subscribe((v) => {
      this.setData();
    });
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  async onSave() {
    if (this.selectedFiles) {
      // Get selected file
      const file = this.selectedFiles[0];

      // Get the fullPath in Storage after upload
      const fullPathInStorage = await this.uploadImage(file);

      this.backgroundImage = fullPathInStorage;
    }

    const house: House = {
      id: this.id,

      pageTitle: this.pageTitle,
      pageSubtitle: this.pageSubtitle,

      backgroundImage: this.backgroundImage,

      welcomeMessage: this.welcomeMessage,

      periodOfStayWidget: this.periodOfStayWidget,

      apartmentDetailService: this.apartmentDetailService,
      breakfastService: this.breakfastService,
      saunaService: this.saunaService,
      feedbackService: this.feedbackService,

      feedbackLink: this.feedbackLink,

      bakerEmail: this.bakerEmail,
    };

    console.log(house);

    if (this.id) {
      this.houseService.updateHouse(house);
    } else {
      this.houseService.createHouse(house);
    }
  }

  // ----------------------------------------------------------------------------------------------

  onFileChosen(event: any) {
    this.selectedFiles = event.target.files;

    this.checkFileType();

    // let selectedFile = this.selectedFiles[0];
    // this.checkFileSize(selectedFile);

    // Display Image on Select
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[0]);
    reader.onload = (_event) => {
      this.selectedImage = reader.result;
    };
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private async setData() {
    this.id = this.house.id;

    this.pageTitle = this.house.pageTitle;
    this.pageSubtitle = this.house.pageSubtitle;

    this.backgroundImage = this.house.backgroundImage;

    this.welcomeMessage = this.house.welcomeMessage;

    this.periodOfStayWidget = this.house.periodOfStayWidget;

    this.apartmentDetailService = this.house.apartmentDetailService;
    this.breakfastService = this.house.breakfastService;
    this.saunaService = this.house.saunaService;
    this.feedbackService = this.house.feedbackService;

    this.feedbackLink = this.house.feedbackLink;

    this.bakerEmail = this.house.bakerEmail;

    // Get the downloadUrl for the src of img

    console.log(this.house.backgroundImage);

    this.backgroundImage = await this.storage
      .ref(this.house.backgroundImage)
      .getDownloadURL()
      .toPromise();
  }

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

  //#endregion
}
