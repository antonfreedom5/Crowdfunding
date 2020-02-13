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
  providers: [ImageUploadService]
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  avatarURL: string;
  @ViewChild("dropbox", {static: true}) dropbox: ElementRef;

  constructor(private token: TokenStorageService,
              private uploadService: ImageUploadService,
              usersService: UserService) {
    userService = usersService;
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    userService.getUserInfo(this.token.getUser().id)
      .subscribe((e:User) => {
        this.currentUser = currentUser = e;
        this.avatarURL = currentUser.avatarURL
          ? currentUser.avatarURL
          : '//ssl.gstatic.com/accounts/ui/avatar_2x.png';
      });
    this.uploadService.setOnUploadedCallback(this.onUploadedCallback);
    this.uploadService.processDirectSelect(document.getElementById('user_avatar'),
      document.getElementById('fileElem'));
    this.uploadService.processDropboxSelect(document.getElementById('user_avatar'));
  }


  public onUploadedCallback(url) {
    currentUser.avatarURL = url;
    userService.saveUserAvatar({id: currentUser.id, avatarURL: url})
      .subscribe((e:User) => {
        document.getElementById("user_avatar")
          .setAttribute('src', e.avatarURL);
      });
  }

  public handleFile(file) {
    this.uploadService.handleFiles(file);
  }
}
