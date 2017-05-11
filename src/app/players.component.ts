import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Player }                from './player';
import { PlayerService }         from './player.service';

@Component({
  selector: 'my-players',
  templateUrl: './players.component.html',
  providers: [PlayerService],
  styleUrls: [ './players.component.css' ]
})
export class PlayersComponent implements OnInit {
  errorMessage: string;
  players: Player[];
  selectedPlayer: Player;

  constructor(
    private playerService: PlayerService,
    private router: Router) { }

  getPlayers(): void {
      this.playerService.getPlayers()
      .subscribe(
        players => this.players = players,
        error =>  this.errorMessage = <any>error);
  }

  add(name: string, level: number): void {
    name = name.trim();
    if (!name) { return; }
    this.playerService.create(name,level)
      .then(player => {
        this.players.push(player);
        this.selectedPlayer = null;
      });
  }

  delete(player: Player): void {
    this.playerService
        .delete(player.id)
        .then(() => {
          this.players = this.players.filter(h => h !== player);
          if (this.selectedPlayer === player) { this.selectedPlayer = null; }
        });
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  onSelect(player: Player): void {
    this.selectedPlayer = player;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedPlayer.id]);
  }
}
