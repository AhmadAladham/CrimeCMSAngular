import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required])
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  constructor(
    private spinner: NgxSpinnerService,
    private toastr :ToastrService,
    private router: Router,
    private authService: AuthService
    )
     { }

  ngOnInit(): void {
    
  }
   
  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  // }

  submit() {
    this.authService.Login(this.emailControl.value, this.passwordControl.value);
  }

  goToRegisterPage() {
    // Go to register page
    this.router.navigate(['account/register']);
  }
}
