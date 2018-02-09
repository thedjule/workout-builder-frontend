import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {
  message = '';
  types = ['danger', 'success', 'info', 'warning'];
  messageType = '';
  show = false;

  constructor() { }

  add(message: string, typeId: number) {
    this.message = message;
    this.messageType = this.types[typeId];
    this.show = true;
  }

  clear() {
    this.show = false;
    this.message = '';
    this.messageType = '';
  }
}
