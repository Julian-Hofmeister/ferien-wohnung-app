import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApartmentDetailPage } from './apartment-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ApartmentDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartmentDetailPageRoutingModule {}
