import { Component, OnInit } from '@angular/core';
import {Company} from '../Model/Company';
import {CompanyService} from '../_services/company.service';

@Component({
  selector: 'app-post-big',
  templateUrl: './post-big.component.html'
})
export class PostBigComponent implements OnInit {

  companies: Company[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getTop3Companies().subscribe((data) => this.companies = data);
  }
}
