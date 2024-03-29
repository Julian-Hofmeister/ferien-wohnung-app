import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendMessagePageRoutingModule } from './send-message-routing.module';

import { SendMessagePage } from './send-message.page';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendMessagePageRoutingModule,
  ],
  declarations: [SendMessagePage, ConfirmationModalComponent],
})
export class SendMessagePageModule {}
