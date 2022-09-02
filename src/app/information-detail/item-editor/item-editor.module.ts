import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemEditorComponent } from './item-editor.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: [ItemEditorComponent],
  exports: [ItemEditorComponent],
})
export class ItemEditor {}
