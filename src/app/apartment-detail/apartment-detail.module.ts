import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApartmentDetailPageRoutingModule } from './apartment-detail-routing.module';

import { ApartmentDetailPage } from './apartment-detail.page';
import { InformationDetailCardComponent } from '../shared/information-detail-card/information-detail-card.component';
import { InformationDetailCard } from '../shared/information-detail-card/information-detail-card.module';
import { ApartmentEditorComponent } from './apartment-editor/apartment-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApartmentDetailPageRoutingModule,
    InformationDetailCard,
  ],

  declarations: [ApartmentDetailPage, ApartmentEditorComponent],
})
export class ApartmentDetailPageModule {}
