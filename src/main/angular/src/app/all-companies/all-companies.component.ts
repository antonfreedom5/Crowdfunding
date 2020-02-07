import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../_services/company.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html'
})
export class AllCompaniesComponent implements OnInit {

  categories: String[] = [];

  constructor( private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getAllCategories().subscribe(data => this.categories = data);
  }
}
