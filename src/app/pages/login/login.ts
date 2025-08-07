import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  mensaje = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  loginUsuario(): void {
    if (!this.email || !this.password) {
      this.mensaje = '⚠️ Todos los campos son obligatorios';
      return;
    }

    this.http.post<any>('http://localhost:5000/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.authService.login(res.token);
        this.mensaje = '✅ Inicio de sesión exitoso';
        this.router.navigate(['/catalogo']); // Redirige al catálogo o donde quieras
      },
      error: (err) => {
        this.mensaje = err.error?.message || '❌ Error al iniciar sesión';
      }
    });
  }
}
