import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { ListarRoleComponent } from './listarrole/listarrole.component';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListarRoleComponent], // Incluye CommonModule y el componente necesario
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent {
  constructor(public route: ActivatedRoute) {}
}
