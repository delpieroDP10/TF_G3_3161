import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ArtistProfileListComponent } from './listarartistprofile/listarartistprofile.component';

@Component({
  selector: 'app-artistprofile',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ArtistProfileListComponent], // Incluye CommonModule y el componente necesario
  templateUrl: './artistprofile.component.html',
  styleUrls: ['./artistprofile.component.css'],
})
export class ArtistProfileComponent {
  constructor(public route: ActivatedRoute) {}
}
