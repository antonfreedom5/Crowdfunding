import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../_services/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: String[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getAllCategories().subscribe(data => this.categories = data);
  }
}
