import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RegisterGuard } from './guards/register.guard';

const redirectLoggedUser = () => redirectLoggedInTo(['/']);
const redirectAnonymusUser = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  { path: '',                 component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectAnonymusUser }},
  { path: 'login',            component: LoginComponent,   canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectLoggedUser}},
  { path: 'register',         component: RegisterComponent, canActivate: [RegisterGuard]},
  { path: 'client/add',       component: AddClientComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectAnonymusUser}},
  { path: 'client/edit/:id',  component: EditClientComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectAnonymusUser}},
  { path: 'client/:id',       component: ClientDetailsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectAnonymusUser }},
  { path: 'settings',         component: SettingsComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectAnonymusUser}},
  { path: '**',               component: NotFoundComponent },
];


@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [RegisterGuard, AngularFireAuthGuard]
})
export class AppRoutingModule { }
