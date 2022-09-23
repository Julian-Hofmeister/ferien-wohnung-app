import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { createAnimation, IonContent, NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/authentication/user.model';
import { Client } from 'src/app/master/category/client.model';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @ViewChild(IonContent) content: IonContent;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

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

  // ----------------------------------------------------------------------------------------------

  chatId: string;

  selectedUser: User;

  // ----------------------------------------------------------------------------------------------

  message: string;

  loadedMessages$: Observable<Message[]>;

  // loadedClients$: Observable<Client[]>;

  client: Client;

  profileImg: any;

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  clientSub = new Subscription();
  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private navCtrl: NavController,
    private afs: AngularFirestore,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService,
    private storage: AngularFireStorage
  ) {
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

    this.loadedMessages$ = this.messageService.getMessages(this.chatId);

    this.loadClient();

    this.readMessage();
  }

  // ----------------------------------------------------------------------------------------------

  ionViewDidEnter() {
    this.loadedMessages$.subscribe((messages) => {
      for (const currentMessage of messages) {
        this.onScrollDown();
      }
    });
  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  onScrollDown() {
    this.content.scrollToBottom(600);
  }

  // ----------------------------------------------------------------------------------------------

  onBack() {
    this.navCtrl.back();
  }

  // ----------------------------------------------------------------------------------------------

  onSendMessage() {
    if (this.message) {
      const timestamp = Date.now().toString();

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

  private readMessage() {
    if (this.user.email == 'admin') {
      this.afs.collection('users').doc(this.chatId).update({
        isRead: true,
      });
    }
  }

  // ----------------------------------------------------------------------------------------------

  private loadClient() {
    this.clientSub = this.clientsService
      .loadClients(this.user.clientId)
      .subscribe(async (clients) => {
        for (const currentClient of clients) {
          this.client = {
            ...currentClient,
          };

          this.profileImg = await this.storage
            .ref(this.client.avatarUrl)
            .getDownloadURL()
            .toPromise();
        }

        // this.isLoading = false;
      });
  }

  //#endregion
}
