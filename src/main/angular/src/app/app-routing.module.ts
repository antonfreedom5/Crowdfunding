import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AllCompaniesComponent } from './all-companies/all-companies.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {AddCompanyComponent} from './add-company/add-company.component';
import {CompanyFullInformationComponent} from './company-full-information/company-full-information.component';
import {CompanyEditComponent} from './company-edit/company-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: AllCompaniesComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'addcompany', component: AddCompanyComponent},
  { path: 'allcompanies', component: AllCompaniesComponent},
  { path: 'company/:id' , component: CompanyFullInformationComponent},
  { path: 'company-edit/:editid', component: CompanyEditComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
