import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private authService: AuthService,  private formBuilder: FormBuilder, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute) { }

  updatePassword: FormGroup;

  loading: boolean = false
  submitted: boolean = false;

  ngOnInit() {
    let id = localStorage.getItem('USER_ID')

    this.updatePassword = this.formBuilder.group({
      _id: [id],
      password: ['', Validators.required]
    })
  }

  get formControls() { return this.updatePassword.controls }

  submitPassword() {
    this.submitted = true;

    if(this.updatePassword.invalid) {
      return;
    }

    this.loading = false;
    
    this.authService.updatePassword(this.updatePassword.value)
    .subscribe( res => {
      this.alertService.success('Password updated', false)
      
    },
    error => {
      this.alertService.error(error);
      console.log(error)
      this.loading = false;
    });
    
  }

}
