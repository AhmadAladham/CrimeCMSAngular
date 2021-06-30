import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')!.value;
  const passwordConfirm = control.get('passwordConfirm')!.value;
  return password != passwordConfirm ? { passwordMatch: true } : null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    roleId: new FormControl(1),}, { validators: passwordMatchValidator });
    isPasswordConfirmMatch: boolean = false;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  goToLoginPage() {
    this.router.navigate(['account'])
  }

  registerUser() {
    if (this.registerForm.valid){
      this.authService.Register(this.registerForm.value)
    }
    else{
      this.validateAllFormFields(this.registerForm);
    }
    const formValue = this.registerForm.value;
    console.log(formValue)
  }

  validateAllFormFields(formGroup: FormGroup) {   
    Object.keys(formGroup.controls).forEach(field => { 
      const control = formGroup.get(field);        
      if (control instanceof FormControl) {  
        control.markAsTouched();
        control.markAsDirty();
      } else if (control instanceof FormGroup) {     
        this.validateAllFormFields(control);            
      }
    });
  }

   

}
