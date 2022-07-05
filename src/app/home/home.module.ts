import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ActionCardComponent } from './action-card/action-card.component';
import { ReservationModalComponent } from './reservation-modal/reservation-modal.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';
import { ActionCardSmallComponent } from './action-card-small/action-card-small.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    ActionCardComponent,
    ReservationModalComponent,
    UserItemComponent,
    UserDetailModalComponent,
    ActionCardSmallComponent,
  ],
})
export class HomePageModule {}
