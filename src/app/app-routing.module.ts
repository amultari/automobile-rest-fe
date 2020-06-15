import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { AutomobileSearchComponent } from './automobile/automobile-search/automobile-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'log-in', component: LoginComponent },
  { path: 'automobile/search', component: AutomobileSearchComponent, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
  // { path: 'automobile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
