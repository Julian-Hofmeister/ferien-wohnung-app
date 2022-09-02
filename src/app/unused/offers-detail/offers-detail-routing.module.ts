import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffersDetailPage } from './offers-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OffersDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersDetailPageRoutingModule {}
