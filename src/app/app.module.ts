import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { APIModule } from '_@api/api.module';
import { CoreModule } from '_@core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';

import { AuthInterceptor } from  '_@shared/interceptors/auth-interceptor';
import { AuthGuard } from '_@shared/guards/authGuard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    APIModule,
    CoreModule.forRoot(),
    NoopAnimationsModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
