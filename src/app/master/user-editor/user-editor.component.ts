import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() user: User;

  @Input() changing: Subject<boolean>;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  id = '';

  email = '';
  password = '';

  showPassword = false;

  loadedUsers: User[];

  isLoading = false;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor() {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.onChange();

    this.changing.subscribe((v) => {
      this.onChange();
    });
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onChange() {
    this.id = this.user.id;

    this.email = this.user.email;
    this.password = this.user.password;

    console.log(this.id + ' ' + this.user.id);

    if (this.id != this.user.id) {
      this.onChange();
    }

    console.log('Changed');
  }
  // ----------------------------------------------------------------------------------------------

  onSave() {
    console.log('Saved');
  }
  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
