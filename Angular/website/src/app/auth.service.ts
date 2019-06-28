import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, } from 'rxjs';
import { AlertService } from './alert.service';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public currentUserSubject2: BehaviorSubject<User>;
  public currentUser2: Observable<User>

  _apiurl: string = "http://localhost:3001/api";

  constructor(private http: HttpClient, private alertService: AlertService, private router: Router) { 
    // Observables sending data (first- and lastname) to header from currentUser //
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentUserSubject2 = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser2 = this.currentUserSubject2.asObservable();


   }

  public get currentUserValue(): User {
  return this.currentUserSubject.value;
  }


  public login(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/login`, userInfo);
  }

  public register(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/register`, userInfo);
  }

  public getAll() {
    return this.http.get<User[]>(`${this._apiurl}/users/all`);
  }

  public getById(id: string) {
    return this.http.get(`${this._apiurl}/users/` + id);
  }

   public update(user: User) {
    return this.http.put(`${this._apiurl}/users/` + user._id, user);
  }

  public updatePassword(user: User) {
    return this.http.put(`${this._apiurl}/users/updatepass/` + user._id, user);
  }

  public updateEmail(user: User) {
    return this.http.put(`${this._apiurl}/users/updateemail/` + user._id, user);
  }

  delete(id: string) {
      return this.http.delete(`${this._apiurl}/users/` + id)
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.clear()
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');
  }


}

