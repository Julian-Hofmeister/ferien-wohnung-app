import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationDetailPageRoutingModule } from './information-detail-routing.module';

import { InformationDetailPage } from './information-detail.page';

import { ItemEditor } from './item-editor/item-editor.module';
import { InformationDetailCard } from './information-detail-card/information-detail-card.module';

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
