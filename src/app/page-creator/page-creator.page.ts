import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireStorage } from '@angular/fire/storage';
import { House } from '../home/house.model';

@Component({
  selector: 'app-page-creator',
  templateUrl: './page-creator.page.html',
  styleUrls: ['./page-creator.page.scss'],
})
export class PageCreatorPage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  // accountId = Date.now().toString();

  accountId = 'cY5uJEjXWiA45P9QMCbk';

  // ----------------------------------------------------------------------------------------------

  house: House;

  pageTitle: string;

  pageSubtitle: string;

  welcomeMessage: string;

  periodOfStayWidget: boolean;

  apartmentDetailService: boolean;

  breakfastService: boolean;

  saunaService: boolean;

  feedbackService: boolean;

  feedbackLink: boolean;

  // ----------------------------------------------------------------------------------------------

  currentImageUrl: string;

  selectedFiles: Array<File>;

  selectedImage: any;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    console.log(this.accountId);
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

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

  async onSubmit() {
    if (this.selectedFiles.length) {
      // Get selected file
      const file = this.selectedFiles[0];

      // Get the fullPath in Storage after upload
      const fullPathInStorage = await this.uploadImage(file);

      this.afs.collection('houses').doc('cY5uJEjXWiA45P9QMCbk').update({
        pageTitle: this.pageTitle,
        pageSubtitle: this.pageSubtitle,
        welcomeMessage: this.welcomeMessage,

        imagePath: fullPathInStorage,

        periodOfStayWidget: this.periodOfStayWidget,

        apartmentDetailService: this.apartmentDetailService,
        breakfastService: this.breakfastService,
        saunaService: this.saunaService,
        feedbackService: this.feedbackService,

        feedbackLink: this.feedbackLink,

        // house: this.house,
      });

      // Get the downloadUrl for the src of img
      // this.currentImageUrl = await this.storage
      //   .ref(fullPathInStorage)
      //   .getDownloadURL()
      //   .toPromise();
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

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

  private checkFileSize(selectedFile: any) {
    const fileSize = Math.round(selectedFile.size / 1000);

    if (fileSize > 900) {
      window.confirm(
        'Die Datei ist zu groß. (' +
          fileSize +
          'kb)\nDie maximale Dateigröße liegt bei 900kb.'
      );
      return;
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
