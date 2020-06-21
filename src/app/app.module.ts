import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { AutomobileCreateComponent } from './automobile/automobile-create/automobile-create.component';
import { AutomobileDeleteComponent } from './automobile/automobile-delete/automobile-delete.component';
import { AutomobileDetailComponent } from './automobile/automobile-detail/automobile-detail.component';
import { AutomobileEditComponent } from './automobile/automobile-edit/automobile-edit.component';
import { AutomobileSearchResultsComponent } from './automobile/automobile-search-results/automobile-search-results.component';
import { AutomobileSearchComponent } from './automobile/automobile-search/automobile-search.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    AutomobileSearchComponent,
    AutomobileSearchResultsComponent,
    AutomobileCreateComponent,
    AutomobileDetailComponent,
    AutomobileEditComponent,
    AutomobileDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
