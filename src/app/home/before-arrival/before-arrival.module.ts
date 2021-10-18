import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeforeArrivalPageRoutingModule } from './before-arrival-routing.module';

import { BeforeArrivalPage } from './before-arrival.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeforeArrivalPageRoutingModule,
  ],
  declarations: [BeforeArrivalPage],
})
export class BeforeArrivalPageModule {}
