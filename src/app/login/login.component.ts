import { Component, OnInit } from '@angular/core';
import { LoginObj } from '../chat-module/models/object/Auths/login.interface';
import { AuthService } from '../base/Auth.Service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData: LoginObj = { userName: '', password: '', remember: false };
  constructor(private loginService: AuthService,private toast: ToastrService) {}

  ngOnInit() {
    this.loginService.checkAuthentication();
    this.loginData.userName = sessionStorage.getItem("USER_NAME") || '';
    this.loginData.password = sessionStorage.getItem("PASSWORD") || '';
    if(this.loginData.userName !== '' && this.loginData.password !== '') 
      this.loginData.remember = true;
  }

  async onLoginSubmit(): Promise<void> {
    if (this.loginData.userName !== '' || this.loginData.password !== '')
      await this.loginService.Login(this.loginData);
  }
}
