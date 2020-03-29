import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DeviceRegistrationComponent } from './components/device-registration/device-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { AngularMaterialModule } from './angular-material.module';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { DeviceOverviewComponent } from './components/device-overview/device-overview.component';
import {MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DeviceRegistrationComponent,
    LoginComponent,
    DeviceOverviewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['puf.dev.eng.c-alm.ch']
      }
    }),
    AngularMaterialModule,
    FontAwesomeModule,
    MatSelectCountryModule,
    Ng2TelInputModule,
    MatPasswordStrengthModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
