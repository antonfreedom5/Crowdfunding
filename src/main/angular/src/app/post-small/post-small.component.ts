import { Component, OnInit } from '@angular/core';
import {Company} from '../Model/Company';
import {CompanyService} from '../_services/company.service';

@Component({
  selector: 'app-post-small',
  templateUrl: './post-small.component.html',
  styleUrls: ['./post-small.component.css']
})
export class PostSmallComponent implements OnInit {

  specifiedCompanies: Company[] = [];
  categories: string[] = [];
  allCompanies: Company[] = [];

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe((data) => {
      this.allCompanies = data;
      this.specifiedCompanies = data;
    });
    this.companyService.getAllCategories().subscribe((category) => this.categories = category);
  }

  public filter(category: string) {
    if (category) {
      this.specifiedCompanies = this.allCompanies.filter(company => company.categories.includes(category));
    } else {
      this.specifiedCompanies = this.allCompanies.slice();
    }
  }
}
