import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailEditorPageRoutingModule } from './detail-editor-routing.module';

import { DetailEditorPage } from './detail-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailEditorPageRoutingModule
  ],
  declarations: [DetailEditorPage]
})
export class DetailEditorPageModule {}
