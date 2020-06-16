import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AutomobileSearchResultsComponent } from './automobile/automobile-search-results/automobile-search-results.component';
import { AutomobileSearchComponent } from './automobile/automobile-search/automobile-search.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AutomobileCreateComponent } from './automobile/automobile-create/automobile-create.component';
import { AutomobileDetailComponent } from './automobile/automobile-detail/automobile-detail.component';
import { AutomobileEditComponent } from './automobile/automobile-edit/automobile-edit.component';
import { DatePipe } from '@angular/common';



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
    AutomobileEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
