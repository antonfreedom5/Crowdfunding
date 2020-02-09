import {Component, Input, OnInit} from '@angular/core';
import { WebSocketAPI } from '../../util/WebSocketAPI';
import {User} from "../../Model/User";
import {Comment} from "../../Model/Comment";
import {TokenStorageService} from "../../_services/token-storage.service";

let colors = [
  '#2196F3', '#32c787', '#00BCD4', '#ff5652',
  '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];
let webSocketAPI: WebSocketAPI;

@Component({
  selector: 'comments-child',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  messageForm = document.getElementById('messageForm');
  messageInput = <HTMLInputElement>document.getElementById('message');
  messageArea = document.querySelector('#messageArea');
  @Input() companyID: number;
  @Input() username: string;

  constructor(private token: TokenStorageService) {
  }

  ngOnInit() {
    //this.user = this.token.getUser();
    webSocketAPI = new WebSocketAPI(this, this.companyID, this.username);
    webSocketAPI._connect();
    document.getElementById('messageForm').addEventListener('submit', this.sendMessage, true);
  }

  sendMessage(event) {
    let messageContent = (<HTMLInputElement>document.getElementById('message')).value;

    if (messageContent.trim()) {
      let chatMessage = {
        companyID: this.companyID,
        sender: this.username,
        content: messageContent,
        type: 'COMMENT'
      };
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
    img.src = message.avatarURL ? message.avatarURL : "//ssl.gstatic.com/accounts/ui/avatar_2x.png";
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
    this.messageArea.appendChild(messageElement);
    this.messageArea.scrollTop = this.messageArea.scrollHeight;
  }

  private addLikeAndDislikeButtons(message, messageElement) {

  }
}
