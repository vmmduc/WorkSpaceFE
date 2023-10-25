import { Injectable } from "@angular/core";
import { BaseApi } from "../../base/BaseApi.Service";
import { FriendObj } from "../models/object/Friends/friend.interface";
import { ConfirmFriendDto } from "../models/dtos/accept-friend.interface";
import BaseResponse from "../../base/base-interface/base-response.interface";

@Injectable({
  providedIn: 'root'
})

export class FriendService {
  constructor(private baseApi: BaseApi) { }

  async GetListFriends(): Promise<BaseResponse<FriendObj>> {
    let response = await this.baseApi.post<FriendObj>('/api/Friend/GetListFriends', null);
    return response;
  }

  async MakeFriend(request: number): Promise<BaseResponse<FriendObj>> {
    let response = await this.baseApi.post<FriendObj>('/api/Friend/MakeFriend', request);
    return response;
  }

  async ManageFriendship(request: ConfirmFriendDto): Promise<BaseResponse<FriendObj>> {
    let response = await this.baseApi.post<FriendObj>('/api/Friend/ManageFriendship', request);
    return response;
  }
}
