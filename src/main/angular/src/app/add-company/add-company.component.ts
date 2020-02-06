import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../_services/company.service';
import { Company } from '../Model/Company';
import { DragDropComponent } from './drag-drop.component'

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html'
})
export class AddCompanyComponent implements OnInit {

  company: Company = new Company();

  constructor(private router: Router, private companyService: CompanyService) { }

  ngOnInit() {}
  @ViewChild(DragDropComponent, {static: false})
  private dropbox: DragDropComponent;

  addCompany() {
    this.company["picURLs"] = this.dropbox.getImageSet();
    this.companyService.addCompany(this.company)
      .subscribe(data => {
        this.router.navigate(['']);
      });
  }
}
