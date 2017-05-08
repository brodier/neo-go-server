import { Component, OnInit } from '@angular/core';

import { Hero }        from './hero';
import { HeroService } from './hero.service';
import { Player }        from './player';
import { PlayerService } from './player.service';



@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  players: Player[] = [];

  constructor(private heroService: HeroService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
    this.playerService.getPlayers()
      .then(players => this.players = players.slice(1,5));
  }
}
