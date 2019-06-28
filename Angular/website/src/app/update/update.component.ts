import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert.service';
import { User } from '../user'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private alertService: AlertService, private activatedRoute: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    
   }

  
  updateForm: FormGroup;
  updatePassword: FormGroup;

  loading: boolean = false
  submitted: boolean = false;

  currentUser: User;
  users: User[] = [];
  

  ngOnInit() {
    let id = localStorage.getItem('USER_ID')

    this.updateForm = this.formBuilder.group({
        _id: [id],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        addressline: ['', Validators.required],
        zipcode: ['', Validators.required],
        city: ['', Validators.required],
        dateofbirth: ['', Validators.required]
    });

    // USE THIS TO PATCH INPUT FIELDS WITH USER DATA //
    this.authService.getById(id).subscribe(res =>{
    this.updateForm.patchValue(res);
    })



  }

  get formControls() { return this.updateForm.controls }
  
  

  onSubmit() {
    this.submitted = true;

    if(this.updateForm.invalid) {
      return;
    }

    this.loading = false;
    
    this.authService.update(this.updateForm.value)
    .subscribe( res => {
      this.alertService.success(`User with email ${res['email']} updated successfully`, false)
      this.router.navigateByUrl('/update')
      localStorage.setItem('currentUser', JSON.stringify(res))
      this.authService.currentUserSubject.next(res['firstname']);
      this.authService.currentUserSubject2.next(res['lastname']);
    },
    error => {
      this.alertService.error(error);
      console.log(error)
      this.loading = true;
    })

  }



  
}
