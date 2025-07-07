import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ArtistApplicationListComponent } from './listarartistapplications/listarartistapplications.component';

@Component({
  selector: 'app-artistapplications',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ArtistApplicationListComponent], // Incluye CommonModule y el componente necesario
  templateUrl: './artistapplications.component.html',
  styleUrls: ['./artistapplications.component.css'],
})
export class ArtistApplicationsComponent {
  constructor(public route: ActivatedRoute) {}
}
