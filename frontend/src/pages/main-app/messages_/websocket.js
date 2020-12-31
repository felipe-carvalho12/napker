import { SOCKET_URL } from '../../../config/settings'

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(chatUrl) {
    const path = `${SOCKET_URL}/ws/chat/${chatUrl}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log("WebSocket open");
    };
    this.socketNewMessage(JSON.stringify({
      command: 'fetch-messages'
    }))
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed");
    };
  }

  disconnect() {
    if (this.socketRef) this.socketRef.close();
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
  }

  fetchMessages(username, chatId) {
    this.sendMessage({
      command: "fetch_messages",
      username: username,
      chatId: chatId
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from: message.from,
      content: message.content,
      chatId: message.chatId
    });
  }

  readMessages(chatId) {
    this.sendMessage({
      command: "read_messages",
      chatId: chatId
    });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks["messages"] = messagesCallback
    this.callbacks["new_message"] = newMessageCallback
  }

  sendMessage(data) {
    try {
      setTimeout(() => {
        if (WebSocketInstance.state() === 1) {
          this.socketRef.send(JSON.stringify({ ...data }))
          return
        } else {
          this.sendMessage(data)
        }
      }, 100)
    } catch (err) {
      console.log(err.message)
    }
  }

  state() {
    return this.socketRef ? this.socketRef.readyState : 0
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;