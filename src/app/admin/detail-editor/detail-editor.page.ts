import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-editor',
  templateUrl: './detail-editor.page.html',
  styleUrls: ['./detail-editor.page.scss'],
})
export class DetailEditorPage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  collection = '';
  parentId = '';

  categroy = '';
  title = '';
  description = '';

  website = '';
  maps = '';
  phoneNumber = '';

  apartment = '';

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(public afs: AngularFirestore, private router: Router) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {}

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onHome() {
    this.router.navigate(['tabs/home']);
  }

  createDetailItem() {
    // if (!this.parentId) {
    //   console.log('false parent Id');

    //   return null;
    // }

    if (!this.collection) {
      console.log('false collection');

      return null;
    }

    console.log('create');

    this.afs.collection(this.collection).add({
      parentId: this.parentId,
      categroy: this.categroy,
      title: this.title,
      description: this.description,
      website: this.website,
      maps: this.maps,
      phoneNumber: this.phoneNumber,
      apartment: this.apartment,
    });

    this.title = '';
    this.description = '';
    this.website = '';
    this.maps = '';
    this.phoneNumber = '';
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
