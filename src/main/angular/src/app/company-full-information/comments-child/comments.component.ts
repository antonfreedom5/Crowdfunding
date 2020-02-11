import {Component, Input, OnInit} from '@angular/core';
import { WebSocketAPI } from '../../util/WebSocketAPI';
import {Comment} from "../../Model/Comment";
import {TokenStorageService} from "../../_services/token-storage.service";
import {ActivatedRoute} from "@angular/router";
import {ImageUploadService} from "../../_services/image-upload.service";

let webSocketAPI: WebSocketAPI;
let token: TokenStorageService;
let companyID: number;
let uniqueAnonID: number = parseInt(String(+new Date() / 1000)) + Math.round(Math.random()*100000);

@Component({
  selector: 'comments-child',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [ImageUploadService]
})
export class CommentsComponent implements OnInit {

  constructor(tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private imageUploadService: ImageUploadService) {
    token = tokenStorage;
    companyID = parseInt(route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    if (!token.getUser()) {
      webSocketAPI = new WebSocketAPI(this, companyID, ""+uniqueAnonID);
      (<HTMLInputElement>document.getElementById('message')).value = 'Please, sign in to leave your comment';
      (<HTMLInputElement>document.getElementById('message')).disabled=true;
    } else {
      webSocketAPI = new WebSocketAPI(this, companyID, token.getUser().username);
      document.getElementById('messageForm').addEventListener('submit', this.sendMessage, true);
      this.imageUploadService.setOnUploadedCallback(this.onImageUploadedCallback);
      this.imageUploadService.processDropboxSelect(document.getElementById('messageArea'));
    }
      webSocketAPI._connect();
  }

  onImageUploadedCallback(url) {
    let chatMessage = {
      companyID: companyID,
      sender: token.getUser().username,
      content: url,
      type: 'IMAGE'
    };
    webSocketAPI._send(chatMessage);
  }

  sendMessage(event) {
    let messageContent = (<HTMLInputElement>document.getElementById('message')).value;

    if (messageContent.trim()) {
      let chatMessage = {
        companyID: companyID,
        sender: token.getUser().username,
        content: messageContent,
        type: 'COMMENT'
      };
      console.log("message: " + companyID);
      webSocketAPI._send(chatMessage);
      (<HTMLInputElement>document.getElementById('message')).value = '';
    }
    event.preventDefault();
  }

  handleMessage(message: Comment) {
    if (message.type === 'JOIN') return;
    let messageElement = document.createElement('li');
    messageElement.setAttribute('id', String(message.id));

    messageElement.classList.add('chat-message');

    let avatarElement = document.createElement('i');
    let img = new Image();
    img.src = message.avatarURL ? message.avatarURL : "https://pbs.twimg.com/profile_images/378800000017423279/1a6d6f295da9f97bb576ff486ed81389_400x400.png";
    img.height = 70;
    img.width = 70;
    img.style.objectFit="cover";
    img.style.borderRadius="70px";
    img.style.marginRight="10px";
    img.style.marginBottom="10px";
    avatarElement.appendChild(img);

    messageElement.appendChild(avatarElement);

    let usernameElement = document.createElement('span');
    let usernameText = document.createTextNode(message.sender);
    usernameElement.appendChild(usernameText);

    messageElement.appendChild(usernameElement);

    this.addLikeAndDislikeButtons(message, messageElement);

    if (message.type === 'IMAGE') {
      let img = new Image();
      img.src = message.content;
      let element = document.createElement('p');
      element.appendChild(img);
      messageElement.appendChild(element);
    } else {
      let element = document.createElement('p');
      let child = document.createTextNode(message.content);
      element.appendChild(child);
      messageElement.appendChild(element);
    }
    let messageArea = document.getElementById('messageArea');
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  private addLikeAndDislikeButtons(message, messageElement) {
    let container = document.createElement('p');
    this.addLikeButton(message, container);
    container.append(`  :   ${message.peopleWhoLikedIDs.length}   `);
    this.addDislikeButton(message, container);
    messageElement.appendChild(container);
  }
  addLikeButton(message, container) {
    let button = document.createElement('a');
    button.className="fa fa-thumbs-up";
    button.style.cssText="font-size: 20px; cursor: pointer; user-select: none";
    container.appendChild(button);
  }
  addDislikeButton(message, container) {
    let button = document.createElement('a');
    button.className="fa fa-thumbs-down";
    button.style.cssText="font-size: 20px; cursor: pointer; user-select: none";
    container.appendChild(button);
  }

}
