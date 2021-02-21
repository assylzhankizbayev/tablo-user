import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  uri = 'ws://localhost:8080'

  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: string): Observable<any> {
    return new Observable( subscriber => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    })
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
