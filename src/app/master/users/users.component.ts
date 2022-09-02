import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  // @Output() selectionEmitter = new EventEmitter<User>();

  @Output() userEmitter = new EventEmitter<User>();

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  loadedUsers$: Observable<User[]>;

  // ----------------------------------------------------------------------------------------------

  isLoading = false;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private userSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private userService: UsersService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadedUsers$ = this.userService.loadUsers();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onSelectUser(user: User) {
    this.userEmitter.emit(user);

    this.userService.changeUser(user);
  }

  // ----------------------------------------------------------------------------------------------

  onCreateUser() {
    const newUser: User = {
      id: '',

      email: '',
      password: '',

      role: '',

      clientId: '',
      houseId: '',
      apartmentId: '',

      arriveDate: Date.now(),
      leaveDate: Date.now(),
    };

    this.userEmitter.emit(newUser);
    this.userService.changeUser(newUser);
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
