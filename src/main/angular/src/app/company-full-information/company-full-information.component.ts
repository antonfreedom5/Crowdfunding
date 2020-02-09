import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../_services/company.service';
import {Company} from '../Model/Company';
import {Router, ActivatedRoute, ParamMap, Data} from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import {DonateService} from '../_services/donate.service';

@Component({
  selector: 'app-company-full-information',
  templateUrl: './company-full-information.component.html',
  styleUrls: ['./company-full-information.component.css']
})
export class CompanyFullInformationComponent implements OnInit {

  private id: any;
  companies: Company;
  user = this.token.getUser();
  userAdmin = false;
  daysLeft: any;
  message: String;
  messageDonate: String;
  sumDonate: number;
  percent: number;

  constructor(private companyService: CompanyService,
              private route: ActivatedRoute,
              private token: TokenStorageService,
              private rout: Router,
              private donateService: DonateService) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
        this.companyService.getCompanyById(this.id).subscribe((data) => {
          this.companies = data;
          // @ts-ignore
          this.daysLeft = Math.round((Date.parse(this.companies.durationDate) - Date.parse(new Date())) / (60 * 60 * 24 * 1000));
          this.percent = Math.round(this.companies.reached * 100 / this.companies.goal);
          if (this.user.roles.includes('ADMIN') || this.companies.author.username === this.user.username) {
            this.userAdmin = true;
          }
        });
  }

  setRating(rating: number) {
    this.companyService.setRating(this.id, rating).subscribe((data) => {
      if (data === null) {
        this.message = 'You have already rated!';
      } else {
        this.message = 'Successful';
      }
    });
  }

  setDonate() {
    this.donateService.setDonate(this.id, this.sumDonate).subscribe((data) => {
      this.messageDonate = 'Thank you!';
      this.rout.navigate(['company/' + this.id]);
    });
  }

  deleteCompanyById() {
    this.companyService.deleteCompanyById(this.id).subscribe(data => {
      this.rout.navigate(['allcompanies']);
    });
  }
}
