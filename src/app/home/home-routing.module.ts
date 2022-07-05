import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'before-arrival',
    loadChildren: () =>
      import('./before-arrival/before-arrival.module').then(
        (m) => m.BeforeArrivalPageModule
      ),
  },
  {
    path: 'send-message',
    loadChildren: () =>
      import('./send-message/send-message.module').then(
        (m) => m.SendMessagePageModule
      ),
  },

  {
    path: 'bread-order-page',
    loadChildren: () =>
      import('./bread-order-page/bread-order-page.module').then(
        (m) => m.BreadOrderPagePageModule
      ),
  },
  {
    path: 'sauna-reservation',
    loadChildren: () =>
      import('./sauna-reservation/sauna-reservation.module').then(
        (m) => m.SaunaReservationPageModule
      ),
  },
  {
    path: 'message',
    loadChildren: () =>
      import('./message/message.module').then((m) => m.MessagePageModule),
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
