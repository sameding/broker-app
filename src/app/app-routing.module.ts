import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';

import { AuthGuard } from '_@shared/guards/authGuard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'signup', component: SignupComponent },

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'client/:id', component: ClientComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
