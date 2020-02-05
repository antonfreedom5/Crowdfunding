import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../_services/company.service';
import { Company } from '../Model/Company';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html'
})
export class AddCompanyComponent implements OnInit {

  company: Company = new Company();

  constructor(private router: Router, private service: CompanyService) { }

  ngOnInit() {
  }

  addCompany() {
    this.service.addCompany(this.company)
      .subscribe(data => {
        alert('Se Agrego con Exito...!!!');
        this.router.navigate(['']);
      });
  }

}
