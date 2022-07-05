import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ContactsPageRoutingModule],
  declarations: [ContactsPage, UserCardComponent],
})
export class ContactsPageModule {}
