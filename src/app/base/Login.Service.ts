import { Injectable } from "@angular/core";
import { BaseApi } from "./BaseApi.Service";
import { LoginObj } from "../chat-module/models/object/Auths/login.interface";
import { UserObj } from "../chat-module/models/object/Auths/user.interface";
import { DataLocal } from "./DataLocal.Service";
import BaseResponse from "./base-interface/base-response.interface";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private baseApi: BaseApi,private dataLocal: DataLocal) { }
  async Login(data: LoginObj): Promise<BaseResponse<UserObj>> {
    let response = await this.baseApi.post<UserObj>("/api/Auth/Login", data);

    if (response.rtResult) {
      this.dataLocal
      .setId(response.rtResult.userId)
      .setEmail(response.rtResult.email)
      .setFullName(response.rtResult.fullName)
      .setToken(response.rtResult.token)
      .build();
    }
    return response;
  }
}
