import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  isPasswordConfirmMatch: boolean = false;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  goToLoginPage() {
    this.router.navigate([''])
  }

  registerUser() {
    this.spinner.show();
    const formValue = this.registerForm.value;
    console.log(formValue)
    console.log(this.registerForm.controls)
    setTimeout(() => {
      this.router.navigate(['c']);
      this.spinner.hide();
    }, 3000);
  }

}
