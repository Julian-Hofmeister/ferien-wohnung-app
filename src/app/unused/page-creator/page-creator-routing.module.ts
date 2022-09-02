import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageCreatorPage } from './page-creator.page';

const routes: Routes = [
  {
    path: '',
    component: PageCreatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageCreatorPageRoutingModule {}
