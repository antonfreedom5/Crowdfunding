import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../_services/company.service';
import {Company} from '../Model/Company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  private editid: any;
  private company: Company;

  constructor( private router: ActivatedRoute, private companyService: CompanyService, private rout: Router) {
    this.editid = router.snapshot.paramMap.get('editid');
  }

  ngOnInit() {
    this.companyService.getCompanyById(this.editid).subscribe((data) => this.company = data);
  }

  editCompany() {
    this.companyService.editCompany(this.company, this.editid).subscribe(data => {
      this.rout.navigate(['company/' + this.editid]);
    });
  }

}
