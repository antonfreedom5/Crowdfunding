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
      let username = ""+uniqueAnonID;
      webSocketAPI = new WebSocketAPI(this, companyID, username);
      (<HTMLInputElement>document.getElementById('message')).value = 'Please, sign in to leave your comment';
      (<HTMLInputElement>document.getElementById('message')).disabled=true;
    } else {
      let username = token.getUser().username;
      webSocketAPI = new WebSocketAPI(this, companyID, username);
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
    console.log("received message: " + message);
    if (message.type === 'EDITED') {
      this.handleEditedMessage(message);
      return;
    }

    let messageElement = document.createElement('li');
    messageElement.setAttribute('id', String(message.id));

    messageElement.classList.add('chat-message');

    let avatarElement = document.createElement('i');
    let img = new Image();
    img.src = message.avatarURL ? message.avatarURL : "//ssl.gstatic.com/accounts/ui/avatar_2x.png";
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

  handleEditedMessage(message: Comment) {
    console.log("calling 'handleEditedMEssage'!!!!!!");
    let messageArea = document.getElementById('messageArea');
    let messageElements = messageArea.children;
    for (let i = 0; i < messageElements.length; i++) {
      if (messageElements[i].getAttribute("id") == String(message.id)) {
        let messageElement = messageElements[i];
        let buttonsContainer = messageElement.children[2];
        buttonsContainer.children[0].removeEventListener('click', this.onLikeClicked);
        buttonsContainer.children[1].innerHTML = ` :    ${message.peopleWhoLikedIDs.length}   `;
        buttonsContainer.children[2].removeEventListener('click', this.onDislikeClicked);
        buttonsContainer.children[3].innerHTML = ` :    ${message.peopleWhoDislikedIDs.length}   `;
      }
    }
  }

  private addLikeAndDislikeButtons(message, messageElement) {
    let container = document.createElement('p');
    container.setAttribute('id', message.id);
    this.addLikeButton(message, container);
    let likesContainer = document.createElement('span');
    likesContainer.append(` :    ${message.peopleWhoLikedIDs.length}   `);
    container.appendChild(likesContainer);
    this.addDislikeButton(message, container);
    let dislikesContainer = document.createElement('span');
    dislikesContainer.append(` :    ${message.peopleWhoDislikedIDs.length}   `);
    container.appendChild(dislikesContainer);
    messageElement.appendChild(container);
  }

  addLikeButton(message, container) {
    let button = document.createElement('a');
    button.className="fa fa-thumbs-up";
    button.style.cssText="font-size: 20px; cursor: pointer; user-select: none";
    if (token.getUser() && !(message.peopleWhoLikedIDs.includes(token.getUser().id)
      || message.peopleWhoDislikedIDs.includes(token.getUser().id) )) {
      button.addEventListener('click', this.onLikeClicked);
    }
    container.appendChild(button);
  }
  onLikeClicked(event) {
    event.preventDefault();
    let source = event.target;
    let originalCommentID = source.parentElement.getAttribute('id');
    let editedMessage = {
      id: originalCommentID, sender: token.getUser().username, type: 'LIKE'
    };
    webSocketAPI._sendEdited(editedMessage);
  }

  addDislikeButton(message, container) {
    let button = document.createElement('a');
    button.className="fa fa-thumbs-down";
    button.style.cssText="font-size: 20px; cursor: pointer; user-select: none";
    if (token.getUser() && !(message.peopleWhoLikedIDs.includes(token.getUser().id)
      || message.peopleWhoDislikedIDs.includes(token.getUser().id) )) {
      button.addEventListener('click', this.onDislikeClicked);
    }
    container.appendChild(button);
  }
  onDislikeClicked(event) {
    event.preventDefault();
    let source = event.target;
    let originalCommentID = source.parentElement.getAttribute('id');
    let editedMessage = {
      id: originalCommentID, sender: token.getUser().username, type: 'DISLIKE'
    };
    webSocketAPI._sendEdited(editedMessage);
  }


}
