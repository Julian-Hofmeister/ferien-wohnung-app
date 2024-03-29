import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterPageRoutingModule } from './master-routing.module';

import { MasterPage } from './master.page';
import { CategoryComponent } from './category/category.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientEditorComponent } from './client-editor/client-editor.component';
import { UsersComponent } from './users/users.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { HousesComponent } from './houses/houses.component';
import { HouseEditorComponent } from './house-editor/house-editor.component';
import { InfoCardComponent } from './house-editor/info-card/info-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MasterPage,
    CategoryComponent,
    ClientsComponent,
    ClientEditorComponent,
    UsersComponent,
    UserEditorComponent,
    HousesComponent,
    HouseEditorComponent,
    InfoCardComponent,
  ],
})
export class MasterPageModule {}
