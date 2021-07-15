import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ActionCardComponent } from './action-card/action-card.component';
import { ReservationModalComponent } from './reservation-modal/reservation-modal.component';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { MessageModalComponent } from './message-modal/message-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    ActionCardComponent,
    ReservationModalComponent,
    FeedbackModalComponent,
    MessageModalComponent,
  ],
})
export class HomePageModule {}
