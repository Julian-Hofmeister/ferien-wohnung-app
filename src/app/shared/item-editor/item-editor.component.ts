import { Component, Input, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InfoDetailItem } from 'src/app/information-detail/information-detail.model';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss'],
})
export class ItemEditorComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() selectedItem: InfoDetailItem;

  @Input() pathHint: string;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  // title: string;

  // description: string;

  // apartment = '';

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private path: AngularFirestoreCollection;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private afs: AngularFirestore,
    private navCtrl: NavController,
    private router: Router
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.path = this.afs.collection(this.pathHint);
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onSave() {
    if (this.selectedItem.id) {
      console.log(this.selectedItem.id);

      this.path.doc(this.selectedItem.id).update({
        title: this.selectedItem.title,
        description: this.selectedItem.description,
        website: this.selectedItem.website,
        phoneNumber: this.selectedItem.phoneNumber,
        maps: this.selectedItem.maps,
      });
    } else {
      this.path.add({
        title: this.selectedItem.title,
        description: this.selectedItem.description,
      });
    }
  }

  // ----------------------------------------------------------------------------------------------

  onDelete() {
    if (this.selectedItem.id) {
      console.log(this.selectedItem.id);

      this.path.doc(this.selectedItem.id).delete();
    }
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
