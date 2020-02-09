import { Component, OnInit } from '@angular/core';
import {Company} from '../Model/Company';
import {CompanyService} from '../_services/company.service';

@Component({
  selector: 'app-post-small',
  templateUrl: './post-small.component.html',
  styleUrls: ['./post-small.component.css']
})
export class PostSmallComponent implements OnInit {

  companies: Company[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe((data) => this.companies = data);
  }
}
