import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterPageRoutingModule } from './master-routing.module';

import { MasterPage } from './master.page';
import { CategoryComponent } from './category/category.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientEditorComponent } from './client-editor/client-editor.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MasterPageRoutingModule],
  declarations: [
    MasterPage,
    CategoryComponent,
    ClientsComponent,
    ClientEditorComponent,
    UsersComponent,
  ],
})
export class MasterPageModule {}
