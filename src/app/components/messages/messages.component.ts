import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { MessageListComponent } from './listarmessages/listarmessages.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MessageListComponent], // Incluye CommonModule y el componente necesario
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  constructor(public route: ActivatedRoute) {}
}
