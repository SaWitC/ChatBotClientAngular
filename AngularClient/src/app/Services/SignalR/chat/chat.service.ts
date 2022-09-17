import { Injectable } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MessageService } from '../../../core/services/swagger-gen/api/message.service'
//import * as signalR from '@microsoft/signalr';
import * as signalR from '@aspnet/signalr'
import { HttpClient } from '@angular/common/http';
import { MessageDto } from '../../../Models/Messages/message-dto.model';
import { Observable, Subject } from 'rxjs';
import { MessageShort } from '../../../Models/Message/MessageShort/message-short.model';
import { Message } from '../../../Models/Message/message.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    //this.connection.onclose(async () => {
    //  await this.start();
    //});
    //this.connection.on("Notify", (user, message) => { this.mapReceivedMessage(user, message); });
    //this.start();
  }

  ngOnInit(): void {
  }


  public lastMessageFromBot: SafeHtml;

  public MessagesHistory: Message[] = [];

  hubConnection: signalR.HubConnection;

  startConnection = () => {

    var token = ""
    token+=localStorage.getItem("jwt");
    if (token != null) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7126/toastr', {
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

      //var message = new MessageShort();
      var message = new Message();

      message.text = someText;
      message.isFromBot = true;
      this.MessagesHistory.push(message);
      this.lastMessageFromBot = this.sanitizer.bypassSecurityTrustHtml(message.text);

      console.log(someText);
      return someText;
    })
  }
  peopleMessageListener() {
    this.hubConnection.on("messageFromPeople", (mes) => {
      console.log(mes);
      return mes;
    })
  }

}
