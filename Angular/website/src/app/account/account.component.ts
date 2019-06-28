import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { AlertService } from '../alert.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  deliveryAddressForm: FormGroup;
  loading: boolean = false
  submitted: boolean = false;
  checkboxValue: boolean;

  currentUser: any;
  users: User[] = [];

  public firstname: string;
  public lastname: string;
  addressline: string;
  zipcode: string;
  city: string;
  country: string;
  dateofbirth: string;
  email: string;
  id: string;



  constructor(private authService: AuthService, private router: Router, private alertService: AlertService, private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))

    // getUserById to display on account page
    let id = localStorage.getItem('USER_ID')
    this.authService.getById(id).subscribe(res => { 
      this.firstname = res['firstname']
      this.lastname = res['lastname'];
      this.addressline = res['addressline'];
      this.zipcode = res['zipcode'];
      this.city = res['city'];
      this.country = res['country'];
      this.dateofbirth = res['dateofbirth'];
      this.email = res['email']

      //PATCH VALUES FROM DATABASE TO DELIVERY ADDRESS //
      this.deliveryAddressForm.patchValue(res);
    })

    //DELIVERY ADDRESS FORM CONTROL //
    this.deliveryAddressForm = this.formBuilder.group({
      _id: [id],
      delivery_addressline: ['', Validators.required],
      delivery_zipcode: ['', Validators.required],
      delivery_city: ['', Validators.required],
      delivery_country: ['', Validators.required],
    });

  }

  get formControls() { return this.deliveryAddressForm.controls }

  setValue(event) {
    let id = localStorage.getItem('USER_ID')
    this.checkboxValue = event.target.checked
    if (this.checkboxValue === true) {
      this.deliveryAddressForm = this.formBuilder.group({
        _id: [id],
        delivery_addressline: [this.addressline, Validators.required],
        delivery_zipcode: [this.zipcode, Validators.required],
        delivery_city: [this.city, Validators.required],
        delivery_country: [this.country, Validators.required]
      });
    } else {
      this.deliveryAddressForm = this.formBuilder.group({
        _id: [id],
        delivery_addressline: ['', Validators.required],
        delivery_zipcode: ['', Validators.required],
        delivery_city: ['', Validators.required],
        delivery_country: ['', Validators.required]
      });
      this.authService.getById(id).subscribe(res =>{
        this.deliveryAddressForm.patchValue(res);
        })
  
    }
  }

  onSubmit() {
    this.submitted = true;

    if(this.deliveryAddressForm.invalid) {
      return;
    }

    this.loading = false;
    
    this.authService.update(this.deliveryAddressForm.value)
    .subscribe( res => {
      this.alertService.success('Delivery address updated', false)
      this.router.navigateByUrl('/account')
    },
    error => {
      this.alertService.error(error);
      console.log(error)
      this.loading = true;
    })

  }

  delete() {
    this.id = localStorage.getItem('USER_ID')

    this.authService.delete(this.id)
      .subscribe(res => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem('USER_ID')
        this.authService.currentUserSubject.next(null);
        this.authService.currentUserSubject2.next(null);

        this.router.navigateByUrl('/login');
        this.alertService.success(res['message'], false)
      })

  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/')
  }

}
