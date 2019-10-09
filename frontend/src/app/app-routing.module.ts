import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  // TODO page login
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './pages/login/login.module#LoginPageModule',
    // canActivate: [LoginGuardService]
  },
  {
    path: 'registration',
    loadChildren: './pages/registration/registration.module#RegistrationPageModule'
  },
  {
    path: 'visitor',
    loadChildren: () => import('./pages/visitor/tabs/tabs.module').then(m => m.TabsPageModule),
    // canActivate: [LoginGuardService]
  },
  {
    path: 'customer',
    loadChildren: () => import('./pages/customer/tabs/tabs.module').then(m => m.TabsPageModule),
    // canActivate: [LoginGuardService]
  }
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
