import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class WebSocketAPI {
  webSocketEndPoint: string = 'http://localhost:8090/ws';
  companyID: number;
  stompClient: any;
  component: any;
  username: string;
  constructor(component: any, companyID: number, username: string) {
    this.component = component;
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
      _this.stompClient.subscribe("/topic/public", onMessageReceived);
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

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/comments.sendComment", {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
    this.component.handleMessage(JSON.parse(message.body));
  }

  onEditedMessageReceived(message) {
    console.log("Edited Message Recieved from Server :: " + message);
    this.component.handleEditedMessage(JSON.parse(message.body));
  }
}
