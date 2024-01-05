import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter  } from '@angular/core';
import { Game } from './../../models/game';
import { PlayerComponent } from '../player/player.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
//Material Design Components//
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { GameRuleInfoComponent } from '../game-rule-info/game-rule-info.component';
import { inject } from '@angular/core';
//Firebase
import {
  Firestore,
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  addDoc,
} from '@angular/fire/firestore';
// import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    PlayerComponent,
    GameRuleInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  // @Output() cardPicked: EventEmitter<string> = new EventEmitter<string>();
  game!: Game;
  firestore: Firestore = inject(Firestore);

  // currentGames: any;
  gameId!: string;
  gameAdded = false;

  unsubGame;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.initGame();
    this.unsubGame = this.gameList();
  }

  async initGame() {
    this.newGame();
  }

  async newGame() {
    this.game = new Game()
  }

  async getGameList() {
    let gameList = await getDocs(this.getGameRef());
    gameList.forEach((list) => {
      return list.id
    })
  }

  gameList() {
    this.gameId = this.getParams();
    onSnapshot(doc(this.getGameRef(), this.gameId), (game) => {
      this.updateGameFromFirebase(game.data())
    })
  }

  getParams() {
    let gameId: any = '';
    this.route.params.subscribe((params) => {
      gameId = params['id'];
    });
    return gameId;
  }


  updateGameFromFirebase(currentGame: any) {
    this.game.players = currentGame.players;
    this.game.stack = currentGame.stack;
    this.game.playedCards = currentGame.playedCards;
    this.game.currentPlayer = currentGame.currentPlayer;
    this.game.pickCardAnimation = currentGame.pickCardAnimation;
    this.game.currentCard = currentGame.currentCard;
  }

  async updateGameToFirebase() {
    const gameRef = doc(this.getGameRef(), this.gameId);
    await updateDoc(gameRef, this.getCleanJson()).catch(
      (err) => { console.error(err); }
    ).then();
  }

  getCleanJson() {
    return {
      players: this.game.players,
      stack: this.game.stack,
      playedCards: this.game.playedCards,
      currentPlayer: this.game.currentPlayer,
      pickCardAnimation: this.game.pickCardAnimation || false,
      currentCard: this.game.currentCard || '',
    }
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }


  pickCard() {
    if (!this.game.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card !== undefined) {
        this.game.currentCard = card;
        this.game.pickCardAnimation = true;
        this.updateGameToFirebase();
        setTimeout(() => {
          this.game.playedCards.push(card);
          this.countCurrentPlayer();
          this.game.pickCardAnimation = false;
          this.updateGameToFirebase();
          // this.cardPicked.emit(card);
        }, 1500);
      }
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGameToFirebase();
      }
    });
  }

  countCurrentPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }
}

