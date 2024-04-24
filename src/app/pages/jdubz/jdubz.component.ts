import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Player } from '../../interfaces/player';
@Component({
  selector: 'app-jdubz',
  templateUrl: './jdubz.component.html',
  styleUrl: './jdubz.component.css'
})
export class JdubzComponent {

  playerData: Player | undefined;

  constructor(private apiService: ApiService) {}

  testFunc() {
    this.apiService.getData().subscribe((data: Player) => {
      this.playerData = data;
      console.log(this.playerData); // Log the player data
      console.log("stats: " + data['Pts+Rebs'])
    });
  }
}
