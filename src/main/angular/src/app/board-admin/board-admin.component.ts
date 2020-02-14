import { Component, OnInit } from '@angular/core';
import { AdminBoardService } from '../_services/admin-board.service';
import {User} from '../Model/User';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  users: User[] = [];
  constructor(private adminBoardService: AdminBoardService) { }

  ngOnInit() {
    this.adminBoardService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users)
    });
  }

  public deleteUser(id: number) {
    this.adminBoardService.deleteUser(id).subscribe((data) => this.users = data);
  }

  public revertUserActivation(id: number) {
    this.adminBoardService.revertActivation(id).subscribe((modifiedUser: User) => {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == modifiedUser.id) {
          this.users[i] = modifiedUser;
          console.log(this.users[i]);
          return;
        }
      }
    });
  }

  public makeUserAdmin(id: number) {
    this.adminBoardService.makeAdmin(id).subscribe((modifiedUser: User) => {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == modifiedUser.id) {
          this.users[i] = modifiedUser;
          console.log(this.users[i]);
          return;
        }
      }
    })
  }

  private modifyUser(modifiedUser: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == modifiedUser.id) {
        this.users[i] = modifiedUser;
        console.log(this.users[i]);
        this.users = [...this.users.slice()];
        return;
      }
    }
  }
}

