import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  message: string;

  user: User = {
    id: localStorage.getItem('user-id'),
    email: localStorage.getItem('user-email'),
    arriveDate: Number(localStorage.getItem('user-arriveDate')),
    leaveDate: Number(localStorage.getItem('user-leaveDate')),
    apartment: localStorage.getItem('user-apartment'),
    houseId: localStorage.getItem('user-houseId'),
  };

  isLoading = false;

  loadedMessages = [];

  selectedChat = '';

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
    private router: Router
  ) {
    if (router.getCurrentNavigation().extras.state) {
      const pageName = this.router.getCurrentNavigation().extras.state;
      console.log(pageName);

      this.selectedChat = pageName.split();
    }
  }

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.chatId =
      this.user.email == 'admin' ? this.selectedChat.toString() : this.user.id;

    this.fetchMessages();

    this.readMessage();
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
          const fetchMessage: Message = {
            timestamp: currentMessage.timestamp,
            email: currentMessage.email,
            message: currentMessage.message,
          };

          this.loadedMessages.push(fetchMessage);
          this.isLoading = false;
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
