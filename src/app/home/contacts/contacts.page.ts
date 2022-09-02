import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  loadedUsers: User[] = [];

  unreadUsers: User[] = [];

  isLoading = false;

  currentDate = Date.now();

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private userSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private userService: UserService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    console.log(this.loadedUsers);

    this.fetchUsers();
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onBack() {
    this.navCtrl.back();
  }

  // ----------------------------------------------------------------------------------------------

  onOpenChat(user: User) {
    //TODO UPDATE NAVIGATION
    this.navCtrl.navigateForward('/message', { state: { user } });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchUsers() {
    this.isLoading = true;

    this.userSub = this.userService.getUsers().subscribe((users) => {
      this.loadedUsers = [];
      this.unreadUsers = [];

      // * DEFINE NEW ITEM
      for (const currentUser of users) {
        const fetchedUser: User = {
          id: currentUser.id,

          email: currentUser.email,
          password: currentUser.password,

          role: currentUser.role,

          houseId: currentUser.houseId,
          apartmentId: currentUser.apartmentId,

          arriveDate: currentUser.arriveDate,
          leaveDate: currentUser.leaveDate,

          latestMessage: currentUser.latestMessage,
          isRead: currentUser.isRead,
        };

        // if (fetchedUser.leaveDate > this.currentDate) {
        //   this.loadedUsers.push(fetchedUser);
        // }

        if (fetchedUser.role != 'admin') {
          if (fetchedUser.isRead == false) {
            this.unreadUsers.push(fetchedUser);
          } else {
            this.loadedUsers.push(fetchedUser);
          }
        }

        this.isLoading = false;
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
