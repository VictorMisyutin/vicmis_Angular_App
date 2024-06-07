import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

export interface AuthResponse {
  message: string;
  // add other fields if the response contains more information
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  admin_username: any;

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://vicmis.com/api';
  // private baseUrl = 'http://127.0.0.1:5000/api';

  login(userId: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { user_id: userId, password }).pipe(
      tap(response => {
        if (response.message === 'Logged in successfully') {
          this.admin_username = userId; // Store the user ID as admin_username
          localStorage.setItem('admin_username', JSON.stringify(this.admin_username));
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`).pipe(
      tap(() => {
        localStorage.removeItem('admin_username');
        this.admin_username = null;
      })
    );
  }

  getProtectedData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/protected`);
  }

}
