import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs';
import { Router } from '@angular/router';
export interface AuthResponse {
  message: string;
  // add other fields if the response contains more information
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  admin_username: any;

  constructor(private http: HttpClient, private router: Router) { }

  private baseUrl = 'https://vicmis.com/api';
  // private baseUrl = 'http://127.0.0.1:5000/api';

  login(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.baseUrl}/login`, { user_id: username, password }, { observe: 'response' }).pipe(
      tap(response => {
        if (response.status === 200) {
          this.admin_username = username; // Store the user ID as admin_username
          localStorage.setItem('admin_username', JSON.stringify(this.admin_username));
          this.router.navigateByUrl('/thirdwardarchive/admin')
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
    alert("invalid username or password")
    return throwError(errorMessage);
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
