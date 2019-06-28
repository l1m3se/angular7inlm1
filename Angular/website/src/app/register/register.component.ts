import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService) { }

  registerForm: FormGroup;
  loading: boolean = false
  submitted: boolean = false;


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      addressline: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get formControls() { return this.registerForm.controls }


  register() {
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value)
    .subscribe(
      res => {
        this.alertService.success(res['message'], true)
        this.router.navigateByUrl('/login')
    },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    )
    
  }
}
