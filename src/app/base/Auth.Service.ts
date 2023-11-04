import { Injectable } from "@angular/core";
import { BaseApi } from "./BaseApi.Service";
import { LoginObj } from "../chat-module/models/object/Auths/login.interface";
import { UserObj } from "../chat-module/models/object/Auths/user.interface";
import { DataLocal } from "./DataLocal.Service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private baseApi: BaseApi,
    private router: Router,
    private dataLocal: DataLocal,
    private spinnerService: NgxSpinnerService) { }

  checkAuthentication() {
    const token = this.dataLocal.getToken();
    if (token) this.router.navigate(['/chat/home']);
  }

  async Login(data: LoginObj) {
    this.spinnerService.show();
    let response = await this.baseApi.post<UserObj>("/api/Auth/Login", data);
    this.spinnerService.hide();

    if (response.rtResult) {
      this.dataLocal
        .setId(response.rtResult.userId)
        .setEmail(response.rtResult.email)
        .setFullName(response.rtResult.fullName)
        .setPhoneNumber(response.rtResult.phoneNumber)
        .setToken(response.rtResult.token)
        .build();

        if(data.remember){
          sessionStorage.setItem('USER_NAME', data.userName);
          sessionStorage.setItem('PASSWORD', data.password);
        }
    }
    if (response.rtStatus) this.router.navigate(['/chat/home']);
  }

  Logout() {
    this.dataLocal.clear();
    this.router.navigate(['/']);
  }
}
