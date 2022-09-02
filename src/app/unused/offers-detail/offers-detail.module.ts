import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersDetailPageRoutingModule } from './offers-detail-routing.module';

import { OffersDetailPage } from './offers-detail.page';
import { OfferDetailCardComponent } from './offer-detail-card/offer-detail-card.component';
import { ItemEditor } from '../shared/item-editor/item-editor.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffersDetailPageRoutingModule,
    ItemEditor,
  ],
  declarations: [OffersDetailPage, OfferDetailCardComponent],
})
export class OffersDetailPageModule {}
