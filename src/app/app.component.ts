//FIREBASE_TOKEN = '1//09Zs0vz6mfkJOCgYIARAAGAkSNwF-L9IrvNUr28nV6nxTVPiDlnD62TTejajm1Mse9EiJGLKJcLkqb8xDmmG_tTUJhXOVPcOnqig',
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './game/game.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    GameComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ringoffire';
}
