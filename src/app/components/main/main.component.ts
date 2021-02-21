import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  totalUserAmount = 0;
  currentUserId = 0;

  constructor(private webSocket: WebSocketService) { }

  ngOnInit(): void {
    this.webSocket.listen('connect').subscribe(() => console.log('Connection succeeded'));

    this.webSocket.listen('init').subscribe(({ regIdx, calIdx }) => {
      console.log('init', regIdx, calIdx);

      this.totalUserAmount = regIdx || 0;
      this.currentUserId = calIdx || 0;
    });

    this.webSocket.listen('user-info').subscribe(data => {
      this.currentUserId = data.id;
      console.log('Current user id', this.currentUserId);
    });

    this.webSocket.listen('registered-users-amount').subscribe(data => {
      this.totalUserAmount = data.amount;
      console.log('Accept total users amount', this.totalUserAmount);
    });
  }

  next(): void {
    if (this.currentUserId < this.totalUserAmount) {
      this.currentUserId++;
      this.webSocket.emit('call-next-user', null);
    }
  }
}
