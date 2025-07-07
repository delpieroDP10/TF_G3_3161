import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule // Añade MatCardModule a las importaciones
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response); // Imprime la respuesta en la consola
  
        if (response && response.jwttoken) {
          this.authService.setToken(response.jwttoken);
          this.router.navigate(['/home']); // Redirige a la página principal o dashboard después del login
        } else {
          this.errorMessage = 'Token no recibido';
        }
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }  
}
