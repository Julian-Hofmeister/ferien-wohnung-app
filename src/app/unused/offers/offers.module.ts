import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPageRoutingModule } from './offers-routing.module';

import { OffersPage } from './offers.page';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { OfferDetailCardComponent } from '../offers-detail/offer-detail-card/offer-detail-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OffersPageRoutingModule],
  declarations: [OffersPage, OfferCardComponent, OfferDetailCardComponent],
})
export class OffersPageModule {}
