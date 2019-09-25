import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // TODO page login
  { path: '', pathMatch: 'full', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'page',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule' }
];

// {
//   path: '',
//   loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
// }
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
