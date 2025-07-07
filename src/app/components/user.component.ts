import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { UserListComponent } from './listaruser/listaruser.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, CommonModule, UserListComponent], // Incluye CommonModule y el componente necesario
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor(public route: ActivatedRoute) {}
}
