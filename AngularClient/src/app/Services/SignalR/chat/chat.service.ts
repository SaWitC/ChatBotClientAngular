import { Injectable, Optional } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
//import * as signalR from '@microsoft/signalr';
import * as signalR from '@aspnet/signalr'
import { HttpClient } from '@angular/common/http';
import { Message } from '../../../Models/Message/message.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChatService, Configuration } from '../../../core/services/swagger-gen';
import { protocol_botServerDomain } from '../../../../../env';

@Injectable({
  providedIn: 'root'
})
export class CustomChatService extends ChatService {

  public override configuration = new Configuration();

  constructor(override httpClient: HttpClient, @Optional() configuration: Configuration, private sanitizer: DomSanitizer) {
    super(httpClient, protocol_botServerDomain, configuration);
  }


  public lastMessageFromBot: SafeHtml;

  public MessagesHistory: Message[] = [];

  hubConnection: signalR.HubConnection;

  startConnection = () => {
    try {
      this.hubConnection.stop();
    }
    catch {
      console.log("Connection is stoped")
    }
    var token = ""
    token+=localStorage.getItem("jwt");
    if (token != null) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(protocol_botServerDomain +'/toastr', {
          skipNegotiation: true,
          accessTokenFactory: function () {
            return token;
          },
          transport: signalR.HttpTransportType.WebSockets
        })
        .build();
    }

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub Connection Started!');
      })
      .catch(err => console.log('Error while starting connection:' + err))
  }

  askServer(message: string,id:string) {
    this.hubConnection.invoke("askServer", message,id)
      .catch(err => console.error(err));
  }

  askServerListener() {
    this.hubConnection.on("askServerResponse", (someText) => {
      var message = new Message();

      message.text = someText;
      message.isFromBot = true;
      this.MessagesHistory.push(message);
      this.lastMessageFromBot = this.sanitizer.bypassSecurityTrustHtml(message.text);

      return someText;
    })
  }
  peopleMessageListener() {
    this.hubConnection.on("messageFromPeople", (mes) => {
      return mes;
    })
  }

}
