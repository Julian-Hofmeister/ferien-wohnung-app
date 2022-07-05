import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'before-arrival',
    loadChildren: () =>
      import('./home/before-arrival/before-arrival-routing.module').then(
        (m) => m.BeforeArrivalPageRoutingModule
      ),
  },
  {
    path: 'send-message',
    loadChildren: () =>
      import('./home/send-message/send-message-routing.module').then(
        (m) => m.SendMessagePageRoutingModule
      ),
  },
  {
    path: 'message',
    loadChildren: () =>
      import('./home/message/message-routing.module').then(
        (m) => m.MessagePageRoutingModule
      ),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./home/contacts/contacts-routing.module').then(
        (m) => m.ContactsPageRoutingModule
      ),
  },
  {
    path: 'sauna-reservation',
    loadChildren: () =>
      import('./home/sauna-reservation/sauna-reservation-routing.module').then(
        (m) => m.SaunaReservationPageRoutingModule
      ),
  },
  {
    path: 'bread-order',
    loadChildren: () =>
      import('./home/bread-order-page/bread-order-page-routing.module').then(
        (m) => m.BreadOrderPagePageRoutingModule
      ),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationPageModule
      ),
  },
  {
    path: 'information-detail/:id/:title',
    loadChildren: () =>
      import('./information-detail/information-detail.module').then(
        (m) => m.InformationDetailPageModule
      ),
  },
  {
    path: 'offer-detail/:id/:title',
    loadChildren: () =>
      import('./offers-detail/offers-detail.module').then(
        (m) => m.OffersDetailPageModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'apartment-detail',
    loadChildren: () =>
      import('./apartment-detail/apartment-detail.module').then(
        (m) => m.ApartmentDetailPageModule
      ),
  },
  {
    path: 'page-creator',
    loadChildren: () => import('./page-creator/page-creator.module').then( m => m.PageCreatorPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
