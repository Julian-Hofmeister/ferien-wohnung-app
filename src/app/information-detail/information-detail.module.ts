import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationDetailPageRoutingModule } from './information-detail-routing.module';

import { InformationDetailPage } from './information-detail.page';
import { InformationDetailCardComponent } from '../shared/information-detail-card/information-detail-card.component';
import { InformationDetailCard } from '../shared/information-detail-card/information-detail-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationDetailPageRoutingModule,
    InformationDetailCard,
  ],
  declarations: [InformationDetailPage],
})
export class InformationDetailPageModule {}
