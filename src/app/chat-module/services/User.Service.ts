import { Injectable } from "@angular/core";
import { FriendObj } from "../models/object/Friends/friend.interface";
import { BaseApi } from "../../base/BaseApi.Service";
import BaseRequest from "../../base/base-interface/base-request.interface";
import BaseResponse from "../../base/base-interface/base-response.interface";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private baseApi: BaseApi) { }

  async FindUser(data: string): Promise<BaseResponse<FriendObj>> {
    let response = await this.baseApi.post<FriendObj>('/api/User/FindUser', data);
    return response;
  }
}
