import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User, UserInfo } from 'src/app/models/user';
import { UserServiceService } from 'src/app/services/user-service.service';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('newPassword')!.value;
  const passwordConfirm = control.get('confirmPassword')!.value;
  return password != passwordConfirm ? { passwordMatch: true } : null;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : UserInfo
 
  editUserForm: FormGroup = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    PhoneNumber: new FormControl('', [Validators.required]),
    DateOfBirth: new FormControl('', [Validators.required])});

    passwordForm: FormGroup = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])});
    isPasswordConfirmMatch: boolean = false;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserServiceService,
    private datePipe: DatePipe
    
  ) { 
    this.user  = this.userService.getCurrentUser()
  }

  ngOnInit(): void {
    this.editUserForm.controls.FirstName.setValue(this.user.FirstName)  
    this.editUserForm.controls.LastName.setValue(this.user.LastName)  
    this.editUserForm.controls.Email.setValue(this.user.Email)  
    this.editUserForm.controls.PhoneNumber.setValue(this.user.PhoneNumber)  
    this.editUserForm.controls.DateOfBirth.setValue(this.datePipe.transform(this.user.DateOfBirth, 'yyyy-MM-dd'))
  }

  
 updateUser() {
  const user = this.editUserForm.value
  this.userService.updateUser(user);
 }

 changePassword() {
  const userPassowrd = this.passwordForm.value
  console.log(userPassowrd);
  this.userService.changePassword(userPassowrd);
 }
}
