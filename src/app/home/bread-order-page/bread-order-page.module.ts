import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreadOrderPagePageRoutingModule } from './bread-order-page-routing.module';

import { BreadOrderPagePage } from './bread-order-page.page';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreadOrderPagePageRoutingModule,
  ],
  declarations: [BreadOrderPagePage, ConfirmationModalComponent],
})
export class BreadOrderPagePageModule {}
