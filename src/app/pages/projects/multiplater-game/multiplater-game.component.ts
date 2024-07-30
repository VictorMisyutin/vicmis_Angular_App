import { Component, OnInit } from '@angular/core';
import { MultiplayerServiceService } from '../../../services/multiplayer-service.service';

@Component({
  selector: 'multiplater-game',
  templateUrl: './multiplater-game.component.html',
  styleUrls: ['./multiplater-game.component.css']
})
export class MultiplaterGameComponent {
  message: string = '';
  messages: string[] = [];

  constructor(private MultiplayerServiceService: MultiplayerServiceService) {
    this.MultiplayerServiceService.currentMessage.subscribe(msg => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    this.MultiplayerServiceService.sendMessage(this.message);
    this.message = '';
  }
}
