import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaunaReservationPage } from './sauna-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: SaunaReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaunaReservationPageRoutingModule {}
