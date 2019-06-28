import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorInterceptor } from './error.interceptor';
import { AlertComponent } from './alert/alert.component';
import { UpdateComponent } from './update/update.component';
import { HeaderComponent } from './header/header.component';
import { HttpConfigInterceptor } from './http-config.interceptor';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateEmailComponent } from './update-email/update-email.component'




@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    AlertComponent,
    UpdateComponent,
    HeaderComponent,
    FooterComponent,
    CardsComponent,
    UpdatePasswordComponent,
    UpdateEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
