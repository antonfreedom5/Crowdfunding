import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {User} from '../Model/User';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => this.users = data);
  }

  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data) => this.users = data);
  }
}

