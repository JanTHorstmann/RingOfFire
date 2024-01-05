import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { Game } from '../../models/game';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    GameComponent,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() name!: string;
  @Input() currentCard!: string;
  @Input() playerActive: boolean = false;
  
  constructor() { 
  }
  
  // onCardPicked(card: string) {
  //   this.currentCard = card; // Aktualisiere die Variable mit der ausgewählten Karte
  // }
}
