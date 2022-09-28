import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { User } from './user.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  loadedUsers: User[];

  isLoading = false;

  loadedUsers$: Observable<User[]>;

  // ----------------------------------------------------------------------------------------------

  loginForm = new FormGroup({
    email: new FormControl('', [
      <any>Validators.required,
      <any>Validators.minLength(5),
      Validators.email,
    ]),
    password: new FormControl('', [
      <any>Validators.required,
      <any>Validators.minLength(6),
      <any>Validators.maxLength(6),
    ]),
  });

  // email: string;

  // password: number;

  // ----------------------------------------------------------------------------------------------

  showHelpText = false;

  // ----------------------------------------------------------------------------------------------

  emailNotFound = false;

  passwordIncorrect = false;

  falsePasswordFormat = false;

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private userSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private userService: UserService, private router: Router) {}

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.fetchUsers();

    this.emailNotFound = false;

    this.passwordIncorrect = false;
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onOpenPageCreator() {
    this.router.navigate(['/master']);
  }

  // ----------------------------------------------------------------------------------------------

  onChange() {
    this.emailNotFound = false;

    this.passwordIncorrect = false;

    this.falsePasswordFormat = false;
  }

  // ----------------------------------------------------------------------------------------------

  onHelp() {
    this.showHelpText = !this.showHelpText;
  }

  // ----------------------------------------------------------------------------------------------

  onLoginUser() {
    this.emailNotFound = true;
    this.passwordIncorrect = false;
    this.falsePasswordFormat = false;

    const loginData = this.loginForm.value;

    for (const user of this.loadedUsers) {
      if (
        user.password === loginData.password.toString() &&
        user.email === loginData.email
      ) {
        this.router.navigate(['home']);

        this.setUserToLocalStorage(user);
      } else if (user.email === loginData.email) {
        this.emailNotFound = false;

        if (loginData.password.toString().length === 6) {
          this.passwordIncorrect = true;
        }
      }
    }
  }

  // ----------------------------------------------------------------------------------------------

  focusInput(input: string) {
    document.getElementById(input).style.border =
      'solid 1px var(--ion-color-primary)';
  }

  // ----------------------------------------------------------------------------------------------

  unFocusInput(input: string) {
    document.getElementById(input).style.border =
      'solid 1px rgba(218,218,218,0)';
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchUsers() {
    this.isLoading = true;
    this.userSub = this.userService.getUsers().subscribe((users) => {
      this.loadedUsers = [];

      for (const currentUser of users) {
        const fetchedUser: User = {
          ...currentUser,
        };

        this.loadedUsers.push(fetchedUser);

        this.isLoading = false;
      }
    });
  }

  // ----------------------------------------------------------------------------------------------

  private setUserToLocalStorage(user: User) {
    localStorage.setItem('user-id', user.id);

    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-password', user.password);

    localStorage.setItem('user-role', user.role);

    localStorage.setItem('house-id', user.houseId);
    localStorage.setItem('user-apartment', user.apartmentId);

    localStorage.setItem('user-clientId', user.clientId);

    localStorage.setItem('user-arriveDate', user.arriveDate.toString());
    localStorage.setItem('user-leaveDate', user.leaveDate.toString());
  }
  //#endregion
}
