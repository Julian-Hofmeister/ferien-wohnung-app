import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { UsersService } from './users.service';

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

  loadedUsers: User[] = [];

  isLoading: boolean;

  selectedUser: User;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private userSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private userService: UsersService) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchUsers();
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
    this.selectedUser = user;

    console.log(user.id);

    this.userEmitter.emit(user);
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchUsers() {
    this.isLoading = true;
    this.userSub = this.userService.getUsers().subscribe((clients) => {
      this.loadedUsers = [];

      // * DEFINE NEW ITEM
      for (const currentUser of clients) {
        const fetchedUser: User = {
          id: currentUser.id,

          email: currentUser.email,
          password: currentUser.password,

          role: currentUser.role,

          arriveDate: currentUser.arriveDate,
          leaveDate: currentUser.leaveDate,

          houseId: currentUser.houseId,
          apartment: currentUser.apartment,
        };

        this.loadedUsers.push(fetchedUser);
        this.isLoading = false;
        console.log(this.loadedUsers);
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
