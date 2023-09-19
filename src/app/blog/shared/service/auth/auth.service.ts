import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { LoginPromptComponent } from '../../components/login-prompt/login-prompt.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }

  authorize(password: string) {
    const payload = {
      password: password,
    };
    return this.http.post<any>(
      `${environment.baseURL}Auth/Authenticate`,
      payload
    );
  }

  // openAuthDialogue(messageFromComponent: string) {
  //   return this.dialog.open(LoginPromptComponent, {
  //     width: '30%',
  //     disableClose: true,
  //     data: {
  //       message: messageFromComponent,
  //     },
  //   });
  // }
}
