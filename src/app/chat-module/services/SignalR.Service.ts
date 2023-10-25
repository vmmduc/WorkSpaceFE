import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr"
import { Constants } from "../constants/constant";
import { SendMessageObj } from "../models/object/Conversations/send-message.interface";
import BaseRequest from "../../base/base-interface/base-request.interface";
import { PreparingMessageObj } from "../models/object/Conversations/preparing-message.interface";
import { DataLocal } from "../../base/DataLocal.Service";

@Injectable()

export class SignalRService {
  private _connection!: signalR.HubConnection;
  private _connectionPromise: Promise<void>;

  constructor(private dataLoca: DataLocal) {
    this._connectionPromise = this.startConnection();
  }

  async startConnection(): Promise<void> {
    try {
      return new Promise<void>((resolve, reject) => {
        this._connection = new signalR.HubConnectionBuilder()
          .withUrl(Constants.apiUrl + '/Chat').build();

        this._connection.start()
          .then(() => {
            console.log('SignalR connected');
            this.setUserOnline();
            resolve();
          }).catch(error => {
            console.error('Error connect to SignalR:', error);
            reject(error);
          });
      });
    } catch (error) {
      console.error('SignalR connection failed: ' + error);
      throw error;
    }
  }

  async stopConnection() {
    this._connection.stop().then(() => {
      console.log('SignalR has been stoped connection!');
    }).catch(error => {
      console.error('Error stop connect to SignalR: ', error);
    })
  }

  getConnection(): Promise<signalR.HubConnection> {
    var signalRConnection = this._connectionPromise.then(() => this._connection);
    return signalRConnection;
  }

  async SendMessageToConversationId(messageContent: SendMessageObj): Promise<void> {
    if (this._connection.state === "Connected") {
      var request: BaseRequest<SendMessageObj> = { Param: messageContent };
      await this._connection.invoke("SendMessageToConversationId", request)
        .catch(error => {
          console.error(`Error sending message to user: ${error}`);
        });
    } else {
      console.error('SignalR connection is not in the "Connected" state.');
    }
  }

  onListenReceive(evenName: string, callback: (...args: any[]) => void) {
    this._connection.on(evenName, (...args: any) => { callback(...args) })
  }

  async PreparingMessage(preparingMessage: PreparingMessageObj): Promise<void> {
    if (this._connection.state === "Connected") {
      var request: BaseRequest<PreparingMessageObj> = { Param: preparingMessage };
      await this._connection.invoke("PreparingMessage", request)
        .catch(error => {
          console.error(`Error sending message to user: ${error}`);
        });
    } else {
      console.error('SignalR connection is not in the "Connected" state.');
    }
  }

  async setUserOnline(): Promise<void> {
    const token = this.dataLoca.getToken();
    if (!token) {
      (await this.getConnection()).stop();
      this.dataLoca.clear()
    }
    else {
      this._connection
        .invoke("SetUserOnline", this.dataLoca.getId()).catch(error => {
          console.error(`Error calling SetUserOnline: ${error}`);
        });
    }
  }
}
