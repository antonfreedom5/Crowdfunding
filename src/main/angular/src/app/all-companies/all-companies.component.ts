import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../_services/company.service';
import {PostSmallComponent} from '../post-small/post-small.component';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html'
})
export class AllCompaniesComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }
}
