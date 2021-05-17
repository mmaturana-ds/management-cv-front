import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export class User {
  nombreUsuario: string = "";
  password: string = "";
}

@Injectable()
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false);    
    constructor(private _http: HttpClient) { }

    private contextApi = 'http://localhost:8080';
    error: any;
    
    private handleErrors(error: any):Promise<any> {
      return Promise.reject(error);
    }

    get isLoggedIn() {
      return this.loggedIn.asObservable(); 
    }

    public validate():Promise<any> {
      const endpoint = `${this.contextApi}/auth/validate`;
  
      return this._http.get(endpoint).toPromise()
        .then(response => response)
        .catch((error)=> {
          if(error.status !== 403) this.handleErrors(error);
        });
    }

    public login(user:string, password:string): Promise<any>{
      const endpoint = `${this.contextApi}/auth/login`,
        body: User = {
          nombreUsuario: user,
          password: password
        };
      
      return this._http.post(endpoint, body).toPromise()
        .then(response => response)
        .catch(this.handleErrors);
    }

    public createUser(data: any): Promise<any> {
        const endpoint = `${this.contextApi}/auth/nuevo`;

        return this._http.post(endpoint, data).toPromise()
            .then(response => response)
            .catch(this.handleErrors);
    }

    public setLoggedIn(): void {
      this.loggedIn.next(true);
    }

    public setToken(token:string): void {
        localStorage.setItem('token',token);
        this.loggedIn.next(true);
    }

    public getToken(): string {
      return localStorage.getItem('token') || '';
    }

    public setUserName(user:string): void {
      localStorage.setItem('username', user);
    }

    public getUserName(): string {
      return localStorage.getItem('username') || '';
    }

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.loggedIn.next(false);
    }
}