import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationDetailPage } from './information-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InformationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationDetailPageRoutingModule {}
