import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InformationDetailCardComponent } from './information-detail-card.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [InformationDetailCardComponent],
  exports: [InformationDetailCardComponent],
})
export class InformationDetailCard {}
