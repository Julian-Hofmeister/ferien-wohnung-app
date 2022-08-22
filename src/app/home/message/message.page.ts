import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonList, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/authentication/user.model';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit, OnDestroy {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @ViewChild(IonContent) content: IonContent;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  message: string;

  user: User = {
    id: localStorage.getItem('user-id'),

    email: localStorage.getItem('user-email'),
    password: localStorage.getItem('user-password'),

    role: localStorage.getItem('user-role'),

    houseId: localStorage.getItem('user-houseId'),
    apartmentId: localStorage.getItem('user-apartment'),

    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
  };

  isLoading = false;

  loadedMessages = [];

  selectedUser: User;

  chatId = '';

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  private messageSub: Subscription;

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private navCtrl: NavController,
    private afs: AngularFirestore,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // if (router.getCurrentNavigation().extras.state) {
    //   const selectedUser: User =
    //     this.router.getCurrentNavigation().extras.state;
    //   console.log(selectedUser);

    //   this.selectedUser = selectedUser;
    // }

    this.route.queryParams.subscribe((_p) => {
      const navParams = this.router.getCurrentNavigation().extras.state;
      if (navParams) this.selectedUser = navParams.user;
    });
  }

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.chatId =
      this.user.role == 'admin' ? this.selectedUser.id : this.user.id;

    this.fetchMessages();

    this.readMessage();

    this.isLoading = false;
  }

  // ----------------------------------------------------------------------------------------------

  ngOnDestroy() {
    this.messageSub.unsubscribe();
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

  onSendMessage() {
    if (this.message) {
      let timestamp = Date.now().toString();

      this.afs
        .collection('users')
        .doc(this.chatId)
        .collection('messages')
        .doc(timestamp)
        .set({
          email: this.user.email,
          message: this.message,
          timestamp: timestamp,
        });

      this.afs.collection('users').doc(this.chatId).update({
        latestMessage: this.message,
        latestMessageTimestamp: timestamp,
        isRead: false,
      });

      this.message = '';
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  private fetchMessages() {
    this.isLoading = true;
    this.messageSub = this.messageService
      .getMessages(this.chatId)
      .subscribe((messages) => {
        this.loadedMessages = [];

        // * DEFINE NEW ITEM
        for (const currentMessage of messages) {
          const message = currentMessage.message.replaceAll('\\n', '\n');

          const fetchMessage: Message = {
            timestamp: currentMessage.timestamp,
            email: currentMessage.email,
            message: message,
          };

          this.loadedMessages.push(fetchMessage);

          this.content.scrollToBottom(600);
        }
      });
  }

  // ----------------------------------------------------------------------------------------------

  private readMessage() {
    if (this.user.email == 'admin') {
      this.afs.collection('users').doc(this.chatId).update({
        isRead: true,
      });
    }
  }

  // ----------------------------------------------------------------------------------------------

  //#endregion
}
