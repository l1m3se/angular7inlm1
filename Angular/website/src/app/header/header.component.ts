import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { AlertService } from '../alert.service';
import { AccountComponent } from '../account/account.component'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstname: any;
  lastname: any;

  currentUser: any;
  currentUser2: any;
  users: User[] = [];


  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {
    //Observables displaying first- and last name in header.
    this.authService.currentUser.subscribe(x => this.currentUser = x)
    this.authService.currentUser2.subscribe(x => this.currentUser2 = x)
   
    //Next to keep displaying name after site refresh.
    if(this.currentUser) {
      this.authService.currentUserSubject.next(this.currentUser.firstname)
      this.authService.currentUserSubject2.next(this.currentUser2.lastname)
    }
  
  }


  ngOnInit() {}

  
  
  logout() {
    this.authService.logout()
    this.alertService.success('Logged out')
  }

}
