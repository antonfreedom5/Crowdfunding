import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../_services/company.service';
import {Company} from '../Model/Company';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-company-full-information',
  templateUrl: './company-full-information.component.html'
})
export class CompanyFullInformationComponent implements OnInit {

  private id: any;
  companies: Company;
  user = this.token.getUser();
  userAdmin = false;

  constructor(private companyService: CompanyService, private route: ActivatedRoute, private token: TokenStorageService) {
    this.id = route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
        this.companyService.getCompanyById(this.id).subscribe((data) => this.companies = data);

        if (this.user.roles.includes('ROLE_ADMIN')) {
          this.userAdmin = true;
        }
  }
}
