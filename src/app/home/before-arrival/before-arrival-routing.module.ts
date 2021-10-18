import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeforeArrivalPage } from './before-arrival.page';

const routes: Routes = [
  {
    path: '',
    component: BeforeArrivalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeforeArrivalPageRoutingModule {}
