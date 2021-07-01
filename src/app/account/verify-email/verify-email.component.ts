import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserInfo } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  currentUser!:UserInfo;
  verifyEmailFrom: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required,Validators.minLength(6)])
  });
  constructor(
    private userService:UserService,
    private authService:AuthService
    ) {
    this.currentUser = userService.getCurrentUser();
   }

  ngOnInit(): void {
  }

  VerifyEmail(){
    let code = this.verifyEmailFrom.controls.code.value;
    this.authService.VerifyEmail(code,this.currentUser.Email);
  }
}
