import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/authentication/user.model';

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
    private authService: AuthService,
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

  onOpenChat(userId: any) {
    this.navCtrl.navigateForward('/message', { state: userId });
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchUsers() {
    this.isLoading = true;

    this.userSub = this.authService.getUsers().subscribe((users) => {
      this.loadedUsers = [];
      this.unreadUsers = [];

      // * DEFINE NEW ITEM
      for (const currentUser of users) {
        const fetchedUser: User = {
          id: currentUser.id,
          email: currentUser.email,
          arriveDate: currentUser.arriveDate,
          leaveDate: currentUser.leaveDate,
          apartment: currentUser.room,
          latestMessage: currentUser.latestMessage,
          isRead: currentUser.isRead,
          houseId: currentUser.houseId,
        };

        // if (fetchedUser.leaveDate > this.currentDate) {
        //   this.loadedUsers.push(fetchedUser);
        // }

        if (fetchedUser.email != 'admin') {
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
