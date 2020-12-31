import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import User
from .models import Message, Chat, Contact
from .views import get_last_50_messages, get_user_contact, get_current_chat


class ChatConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        messages = get_last_50_messages(data['chatId'])
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        user_contact = get_user_contact(data['from'])
        message = Message.objects.create(contact=user_contact, content=data['content'])
        current_chat = get_current_chat(data['chatId'])
        current_chat.messages.add(message)
        current_chat.save()
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_new_message(content)
    
    def read_messages(self, data):
        messages = get_last_50_messages(data['chatId'])
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_read_messages(content)

    def typing(self, data):
        content = {
            'command': 'typing',
            'userId': data['userId']
        }
        self.send_typing(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': message.id,
            'author': message.contact.user.username,
            'content': message.content,
            'read': message.read,
            'timestamp': str(message.timestamp)
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
        'read_messages': read_messages,
        'typing': typing,
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['chat_id']
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_new_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
    
    def send_read_messages(self, messages):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_messages',
                'messages': messages
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def send_typing(self, userId):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'user_typing',
                'userId': userId
            }
        )

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))

    def chat_messages(self, event):
        messages = event['messages']
        self.send(text_data=json.dumps(messages))

    def user_typing(self, event):
        userId = event['userId']
        self.send(text_data=json.dumps(userId))
