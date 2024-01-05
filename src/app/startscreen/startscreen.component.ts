import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [
    GameComponent,
  ],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})
export class StartscreenComponent {
  firestore: Firestore = inject(Firestore);
  gameComponent = GameComponent
  constructor(private router: Router) { }

  async newGame() {
    let game = new Game()
    let gameId = await this.addGame(game)
    this.router.navigateByUrl('/game/' + gameId)
  }

  async addGame(game: any) {
    let gameInfo = await addDoc(collection(this.firestore, "games"), this.gameToJson(game));
    return gameInfo.id;
  }



  gameToJson(game: any) {
    return {
      players: game.players,
      stack: game.stack,
      playedCards: game.playedCards,
      currentPlayer: game.currentPlayer,
    }
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }



}



