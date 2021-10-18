import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailEditorPage } from './detail-editor.page';

const routes: Routes = [
  {
    path: '',
    component: DetailEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailEditorPageRoutingModule {}
