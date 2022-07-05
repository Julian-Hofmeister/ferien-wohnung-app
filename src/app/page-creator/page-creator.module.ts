import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageCreatorPageRoutingModule } from './page-creator-routing.module';

import { PageCreatorPage } from './page-creator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageCreatorPageRoutingModule
  ],
  declarations: [PageCreatorPage]
})
export class PageCreatorPageModule {}
