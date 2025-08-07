import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSignal = signal<boolean>(!!localStorage.getItem('token'));

  isLoggedIn = computed(() => this.isLoggedInSignal());

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSignal.set(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSignal.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
