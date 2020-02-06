import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { PostBigComponent } from './post-big/post-big.component';
import {AddCompanyComponent} from './add-company/add-company.component';
import { DragDropComponent } from './add-company/drag-drop.component';
import {AllCompaniesComponent} from './all-companies/all-companies.component';
import {PostSmallComponent} from './post-small/post-small.component';
import { CompanyFullInformationComponent } from './company-full-information/company-full-information.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { CompanyEditComponent } from './company-edit/company-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    ProfileComponent,
    PostBigComponent,
    PostSmallComponent,
    AddCompanyComponent,
    DragDropComponent,
    AllCompaniesComponent,
    CompanyFullInformationComponent,
    CompanyEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
