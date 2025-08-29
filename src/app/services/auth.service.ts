import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, throwError } from 'rxjs';

export interface User {
  id: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private mockUser = {
    token: "ey.mock.token",
    user: { id: "u_1", name: "Alice T.", role: "user" }
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{token: string, user: User}> {
    const body = { username, password };
    if (username === "alice" && password === "password123") {
      localStorage.setItem('authTokenRemit', this.mockUser.token);
      localStorage.setItem('userDataRemit', JSON.stringify(this.mockUser.user));
      return of(this.mockUser);
    } else {
      return throwError(() => new Error('Identifiants invalides'));
    }
    /*return this.http.post<any>(`${this.baseUrl}/auth/login`, body).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authTokenRemit', response.token);
          localStorage.setItem('userDataRemit', JSON.stringify(response.user));
        }
      })
    );*/
  }
}
