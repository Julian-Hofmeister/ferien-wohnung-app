import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationDetailPageRoutingModule } from './information-detail-routing.module';

import { InformationDetailPage } from './information-detail.page';

import { InformationDetailCard } from '../shared/information-detail-card/information-detail-card.module';

import { ItemEditor } from '../shared/item-editor/item-editor.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationDetailPageRoutingModule,
    InformationDetailCard,
    ItemEditor,
  ],
  declarations: [InformationDetailPage],
})
export class InformationDetailPageModule {}
