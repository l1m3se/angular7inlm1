import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {

  constructor(private authService: AuthService,  private formBuilder: FormBuilder, private alertService: AlertService, private router: Router, private activatedRoute: ActivatedRoute) { }

  updateEmail: FormGroup;

  loading: boolean = false
  submitted: boolean = false;

  ngOnInit() {
    let id = localStorage.getItem('USER_ID')

    this.updateEmail = this.formBuilder.group({
      _id: [id],
      email: ['', Validators.required]
    })
  }

  get formControls() { return this.updateEmail.controls }

  submitEmail() {
    this.submitted = true;

    if(this.updateEmail.invalid) {
      return;
    }

    this.loading = false;
    
    this.authService.updateEmail(this.updateEmail.value)
    .subscribe( res => {
      console.log(res)
      this.alertService.success('Email updated', false)
    },
    error => {
      this.alertService.error(error);
      this.loading = false;
      console.log('test')
    })
    
  }

}

