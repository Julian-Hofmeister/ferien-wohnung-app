import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApartmentDetailPageRoutingModule } from './apartment-detail-routing.module';

import { ApartmentDetailPage } from './apartment-detail.page';
import { ApartmentEditorComponent } from './apartment-editor/apartment-editor.component';
import { InformationDetailCard } from 'src/app/information-detail/information-detail-card/information-detail-card.module';

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
