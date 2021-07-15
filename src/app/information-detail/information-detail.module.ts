import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationDetailPageRoutingModule } from './information-detail-routing.module';

import { InformationDetailPage } from './information-detail.page';
import { InformationDetailCardComponent } from './information-detail-card/information-detail-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationDetailPageRoutingModule,
  ],
  declarations: [InformationDetailPage, InformationDetailCardComponent],
})
export class InformationDetailPageModule {}
