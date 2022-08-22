import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/auth.guard';
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
        path: 'chat',
        loadChildren: () =>
          import('../home/message/message.module').then(
            (m) => m.MessagePageModule
          ),
      },

      {
        path: 'contacts',
        loadChildren: () =>
          import('../home/contacts/contacts.module').then(
            (m) => m.ContactsPageModule
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
