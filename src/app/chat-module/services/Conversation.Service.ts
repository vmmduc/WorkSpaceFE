import { Injectable } from "@angular/core";
import { BaseApi } from "../../base/BaseApi.Service";
import BaseResponse from "../../base/base-interface/base-response.interface";
import { ConversationObj } from "../models/object/Conversations/conversation.interface";

@Injectable({
    providedIn: 'root'
})

export class ConversationService {
    constructor(private baseApi: BaseApi) { }

    async GetListConversation(): Promise<BaseResponse<ConversationObj>> {
        let response = await this.baseApi.post<ConversationObj>('/api/Conversation/GetListConversation');
        return response;
    }

    async GetConversationById(data: any): Promise<BaseResponse<ConversationObj>> {
        let response = await this.baseApi.post<ConversationObj>('/api/Conversation/GetConversationById', data);
        return response;
    }
}
