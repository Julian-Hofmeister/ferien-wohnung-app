import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ActionCardComponent } from './action-card/action-card.component';
import { ReservationModalComponent } from './reservation-modal/reservation-modal.component';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { UserItemComponent } from './user-item/user-item.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    ActionCardComponent,
    ReservationModalComponent,
    FeedbackModalComponent,
    UserItemComponent,
  ],
})
export class HomePageModule {}
