import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponse {
  message: string;
  // add other fields if the response contains more information
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly LOGIN_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
  private adminUsernameKey = 'admin_username';
  private loginTimeKey = 'login_time';
  private baseUrl = 'https://vicmis.com/api';
  // private baseUrl = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.baseUrl}/login`, { user_id: username, password }, { observe: 'response' }).pipe(
      tap(response => {
        if (response.status === 200) {
          localStorage.setItem(this.adminUsernameKey, username);
          localStorage.setItem(this.loginTimeKey, Date.now().toString());
          this.router.navigateByUrl('/thirdwardarchive/admin');
        }
      }),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    alert("Invalid username or password");
    return throwError(errorMessage);
  }

  
  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`).pipe(
      tap(() => {
        localStorage.removeItem(this.adminUsernameKey);
        localStorage.removeItem(this.loginTimeKey);
        this.router.navigateByUrl('/thirdwardarchive');
      })
    );
  }

  isAuthenticated(): boolean {
    const adminUsername = localStorage.getItem(this.adminUsernameKey);
    const loginTime = localStorage.getItem(this.loginTimeKey);

    if (adminUsername && loginTime) {
      const currentTime = Date.now();
      const loginTimestamp = parseInt(loginTime, 10);
      if (currentTime - loginTimestamp < this.LOGIN_TIMEOUT_MS) {
        // Only reset the timeout if user is active (performing some action)
        return true;
      } else {
        this.logout().subscribe() // Invalidate the session if timeout has passed
      }
    }
    return false;
  }

  get admin_username(): string | null {
    if (this.isAuthenticated()) {
      // If user is authenticated, update the login time
      localStorage.setItem(this.loginTimeKey, Date.now().toString());
      return localStorage.getItem(this.adminUsernameKey);
    }
    return null;
  }

}
