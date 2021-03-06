import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { Role } from './auth/role';
import { AutomobileCreateComponent } from './automobile/automobile-create/automobile-create.component';
import { AutomobileDeleteComponent } from './automobile/automobile-delete/automobile-delete.component';
import { AutomobileDetailComponent } from './automobile/automobile-detail/automobile-detail.component';
import { AutomobileEditComponent } from './automobile/automobile-edit/automobile-edit.component';
import { AutomobileSearchComponent } from './automobile/automobile-search/automobile-search.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'log-in', component: LoginComponent },
  { path: 'automobile/search', component: AutomobileSearchComponent, canActivate: [AuthGuard] },
  { path: 'automobile/create', component: AutomobileCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN] }},
  { path: 'automobile/:id', component: AutomobileDetailComponent, canActivate: [AuthGuard] },
  { path: 'automobile/edit/:id', component: AutomobileEditComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN] }},
  { path: 'automobile/delete/:id', component: AutomobileDeleteComponent, canActivate: [AuthGuard], data: { roles: [Role.ROLE_ADMIN] }},
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
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
