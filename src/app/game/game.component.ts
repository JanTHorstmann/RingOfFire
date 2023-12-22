import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from './../../models/game';
import { PlayerComponent } from '../player/player.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
//Material Design Components//
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { GameRuleInfoComponent } from '../game-rule-info/game-rule-info.component';

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
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card !== undefined) {
        this.currentCard = card;
        this.pickCardAnimation = true;
        setTimeout(() => {
          this.game.playedCards.push(card);
          this.countCurrentPlayer();
          this.pickCardAnimation = false;
        }, 1500);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length < 0) {
        this.game.players.push(name);
      }
    });
  }

  countCurrentPlayer() {
  this.game.currentPlayer++;
  this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

  }
}

