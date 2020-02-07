import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../_services/company.service';
import { Company } from '../Model/Company';
import {DragAndDropComponent} from '../drag-and-drop/drag-and-drop.component';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html'
})
export class AddCompanyComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) {
    this.companyService.getAllCategories().subscribe(date => this.categories = date);
  }

  categories: String[] = [];
  company: Company = new Company();
  cat: String;
  @ViewChild(DragAndDropComponent, {static: false})
  private dropbox: DragAndDropComponent;

  ngOnInit() {}

  addCompany() {
    this.company["picURLs"] = this.dropbox.getImageSet();
    this.companyService.addCompany(this.company, this.cat)
      .subscribe(data => {
        this.router.navigate(['']);
      });
  }

}
