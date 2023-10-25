import axios, { AxiosResponse } from "axios";
import BaseResponse from "./base-interface/base-response.interface";
import BaseRequest from "./base-interface/base-request.interface";
import { DataLocal } from './DataLocal.Service'
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Constants } from "../chat-module/constants/constant";

@Injectable()
export class BaseApi {
  constructor(private router: Router, private dataLocal: DataLocal) { }
  async post<T>(url: string, data?: any): Promise<BaseResponse<T>> {
    try {
      const request: BaseRequest<any> = { Param: data };
      const token = this.dataLocal.getToken();
      const headers: { [key: string]: string } = {};
      headers['Access-Control-Allow-Origin'] = '*'

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response: AxiosResponse<BaseResponse<T>> = await axios.post(
        Constants.apiUrl + url,
        request,
        { headers }
      );

      return this.handleError(response);
    } catch (exception: any) {
      return this.handleError(exception.response);
    }
  }

  private handleError<T>(response: AxiosResponse<BaseResponse<T>>): BaseResponse<any> {
    if (response.status === 401) {
      this.dataLocal.clear()
      this.router.navigate(['/login']);
    }
    else {
      if (!response.data.rtStatus) {
        if (response.data.rtCode === -1) alert(response.data.rtMessage);
        else alert(response.data.rtMessage);
      }
    }
    return response.data
  }
}
