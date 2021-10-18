import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreadOrderPagePage } from './bread-order-page.page';

const routes: Routes = [
  {
    path: '',
    component: BreadOrderPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreadOrderPagePageRoutingModule {}
