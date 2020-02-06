import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../_services/company.service';
import { Company } from '../Model/Company';

const cloudName = 'dwvirsr0i';
const unsignedUploadPreset = 'vgffszgq';
let fileSelect;
let fileElem;
let urlSelect;

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html'
})
export class AddCompanyComponent implements OnInit {

  company: Company = new Company();

  constructor(private router: Router, private companyService: CompanyService) { }

  ngOnInit() {

  }

  addCompany() {

    this.companyService.addCompany(this.company)
      .subscribe(data => {
        this.router.navigate(['']);
      });
  }
}
