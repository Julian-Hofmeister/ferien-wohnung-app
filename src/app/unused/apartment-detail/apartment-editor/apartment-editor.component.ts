import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InfoDetailItem } from 'src/app/information-detail/information-detail.model';

@Component({
  selector: 'app-apartment-editor',
  templateUrl: './apartment-editor.component.html',
  styleUrls: ['./apartment-editor.component.scss'],
})
export class ApartmentEditorComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() selectedItem: InfoDetailItem;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  // title: string;

  // description: string;

  // apartment = '';

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private path = this.afs.collection('apartment-detail');

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private afs: AngularFirestore,
    private navCtrl: NavController,
    private router: Router
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {}

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onChangeTitle() {
    console.log(this.selectedItem.title);
  }

  // ----------------------------------------------------------------------------------------------

  onChangeApartment() {
    console.log(this.selectedItem.apartment);
  }

  // ----------------------------------------------------------------------------------------------

  onSave() {
    if (this.selectedItem.id) {
      console.log(this.selectedItem.id);

      this.path.doc(this.selectedItem.id).update({
        title: this.selectedItem.title,
        description: this.selectedItem.description,
        apartment:
          this.selectedItem.apartment === '' ? '' : this.selectedItem.apartment,
      });
    } else {
      this.path.add({
        title: this.selectedItem.title,
        description: this.selectedItem.description,
        apartment: this.selectedItem.apartment,
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
