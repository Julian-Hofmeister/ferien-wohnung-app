import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'information',
        loadChildren: () =>
          import('../information/information.module').then(
            (m) => m.InformationPageModule
          ),
      },

      {
        path: 'offers',
        loadChildren: () =>
          import('../offers/offers.module').then((m) => m.OffersPageModule),
      },
      {
        path: 'offers-detail',
        loadChildren: () =>
          import('../offers-detail/offers-detail.module').then(
            (m) => m.OffersDetailPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
