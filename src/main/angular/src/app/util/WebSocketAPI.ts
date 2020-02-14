import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class WebSocketAPI {
  webSocketEndPoint: string = 'http://localhost:8090/ws';
  companyID: number;
  stompClient: any;
  contextComponent: any;
  username: string;
  constructor(component: any, companyID: number, username: string) {
    this.contextComponent = component;
    this.companyID = companyID;
    this.username = username;
  }
  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe("/topic/" + _this.companyID, onMessageReceived);
      _this.stompClient.subscribe("/topic/edited/" + _this.companyID, onEditedMessageReceived);
      _this.stompClient.subscribe("/user/" + _this.username + "/reply", onMessageReceived);
      _this.stompClient.send("/app/comments.addUser",
        {},
        JSON.stringify({companyID: _this.companyID, sender: _this.username, type: 'JOIN'})
      );
    }, this.errorCallBack);

    function onMessageReceived(message) {
      _this.onMessageReceived(message);
    }
    function onEditedMessageReceived(message) {
      _this.onEditedMessageReceived(message);
    }
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  errorCallBack(error) {
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  _send(message) {
    this.stompClient.send("/app/comments.sendComment", {}, JSON.stringify(message));
  }

  _sendEdited(message) {
    this.stompClient.send("/app/comments.editComment", {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    this.contextComponent.handleMessage(JSON.parse(message.body));
  }

  onEditedMessageReceived(message) {
    this.contextComponent.handleEditedMessage(JSON.parse(message.body));
  }
}
