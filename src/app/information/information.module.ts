import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationPageRoutingModule } from './information-routing.module';

import { InformationPage } from './information.page';
import { InformationCardComponent } from './information-card/information-card.component';
import { InformationDetailCard } from '../shared/information-detail-card/information-detail-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationPageRoutingModule,
    InformationDetailCard,
  ],
  declarations: [InformationPage, InformationCardComponent],
})
export class InformationPageModule {}
