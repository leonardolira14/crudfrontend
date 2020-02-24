import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PloginComponent } from './pages/plogin/plogin.component';
import { CloginComponent } from './components/clogin/clogin.component';
import { PclientesComponent } from './pages/pclientes/pclientes.component';
import { CclientesComponent } from './components/cclientes/cclientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    PloginComponent,
    CloginComponent,
    PclientesComponent,
    CclientesComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
