import { Component, OnInit } from '@angular/core';
import { LoginObj } from '../chat-module/models/object/Auths/login.interface';
import { AuthService } from '../base/Auth.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: LoginObj = { userName: '', password: '', remember: false }
  constructor(private loginService: AuthService) { }

  ngOnInit = () => this.loginService.checkAuthentication();

  async onLoginSubmit(): Promise<void> {
    if (this.loginData.userName !== '' || this.loginData.password !== '')
      await this.loginService.Login(this.loginData);
  }
}
