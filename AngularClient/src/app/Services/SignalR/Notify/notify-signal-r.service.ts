import { Injectable } from '@angular/core';

import * as signalR from '@aspnet/signalr'
import { HttpClient } from '@angular/common/http';
import { Message } from '../../../Models/Message/message.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChatService, Configuration } from '../../../core/services/swagger-gen';
import { protocol_botServerDomain } from '../../../../../env';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifySignalRService {

  constructor(private toastr: ToastrService) {
  }

  hubConnection: signalR.HubConnection;

  stopConnection() {
    try {
      this.hubConnection.stop();
    }
    catch {

    }
  }

  startConnection = () => {

    try {
      this.hubConnection.stop();
    }
    catch {
      console.log("Connection is stoped")
    }
    

    var token = ""
    token += localStorage.getItem("jwt");
    if (token != null) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(protocol_botServerDomain +'/notify', {
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

    this.hubConnection.onclose(() => setTimeout(()=> {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7126/notify', {
          skipNegotiation: true,
          accessTokenFactory: function () {
            return token;
          },
          transport: signalR.HttpTransportType.WebSockets
        })
        .build();
    },2000));
  }

  NotifyMessageListener() {
    this.hubConnection.on("Notify", (mes) => {
      this.toastr.show(mes,"reminder");
    })
  }
}
