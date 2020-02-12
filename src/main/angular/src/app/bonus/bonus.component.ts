import {Component, OnInit} from '@angular/core';
import {Bonus} from '../Model/Bonus';
import {BonusService} from '../_services/bonus.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {

  id: any;
  bonuses: Bonus[] = [];
  messageBuyBonus: string;

  constructor(private bonusService: BonusService,
              private route: ActivatedRoute,
              private rout: Router) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.bonusService.getBonusesByCompany(this.id).subscribe(data => this.bonuses = data);
  }

  buy(bonusId: number) {
    this.bonusService.buyBonus(bonusId).subscribe(data => {
      this.messageBuyBonus = 'Thank you!';
    });
  }

  deleteBonus(bonusId: number) {
    this.bonusService.deleteBonusById(bonusId).subscribe(data => {
      alert(data);
    });
  }
}
