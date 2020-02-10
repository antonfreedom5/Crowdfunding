import {Component, Input, OnInit} from '@angular/core';
import { WebSocketAPI } from '../../util/WebSocketAPI';
import {Comment} from "../../Model/Comment";
import {TokenStorageService} from "../../_services/token-storage.service";
import {ActivatedRoute} from "@angular/router";

let webSocketAPI: WebSocketAPI;
let token: TokenStorageService;
let companyID: number;

@Component({
  selector: 'comments-child',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(tokenStorage: TokenStorageService, private route: ActivatedRoute) {
    token = tokenStorage;
    companyID = parseInt(route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    webSocketAPI = new WebSocketAPI(this, companyID, token.getUser().username);
    webSocketAPI._connect();
    document.getElementById('messageForm').addEventListener('submit', this.sendMessage, true);
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
    avatarElement.appendChild(img);

    messageElement.appendChild(avatarElement);

    let usernameElement = document.createElement('span');
    let usernameText = document.createTextNode(message.sender);
    usernameElement.appendChild(usernameText);

    messageElement.appendChild(usernameElement);

    //this.addLikeAndDislikeButton(message, messageElement);

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

  }
}
