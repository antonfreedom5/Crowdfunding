import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import {User} from "../Model/User";
import {ImageUploadService} from "../_services/image-upload.service";
import {UserService} from "../_services/user.service";

let currentUser: User;
let userService: UserService;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ImageUploadService, UserService]
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  avatarURL: string;
  @ViewChild("dropbox", {static: true}) dropbox: ElementRef;

  constructor(private token: TokenStorageService,
              private uploadService: ImageUploadService,
              private usersService: UserService) {
    userService = this.usersService;
  }

  ngOnInit() {
    currentUser = this.currentUser = this.token.getUser();
    this.avatarURL = currentUser.avatarURL
      ? currentUser.avatarURL
      : '//ssl.gstatic.com/accounts/ui/avatar_2x.png';

    this.uploadService.setOnUploadedCallback(this.onUploadedCallback);
    this.uploadService.processDirectSelect(document.getElementById('user_avatar'),
      document.getElementById('fileElem'));
    this.uploadService.processDropboxSelect(document.getElementById('user_avatar'));
  }


  public onUploadedCallback(url) {
    currentUser.avatarURL = url;
    console.log("current user " + currentUser);
    console.log("got from server: " + userService.getUsers());
  }

  public handleFile(file) {
    this.uploadService.handleFiles(file);
  }
}
