import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaunaReservationPageRoutingModule } from './sauna-reservation-routing.module';

import { SaunaReservationPage } from './sauna-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaunaReservationPageRoutingModule
  ],
  declarations: [SaunaReservationPage]
})
export class SaunaReservationPageModule {}
