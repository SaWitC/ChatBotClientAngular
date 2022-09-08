import { Injectable } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MessageService } from '../../../core/services/swagger-gen/api/message.service'
//import * as signalR from '@microsoft/signalr';
import * as signalR from '@aspnet/signalr'
import { HttpClient } from '@angular/common/http';
import { MessageDto } from '../../../Models/Messages/message-dto.model';
import { Observable, Subject } from 'rxjs';
import { MessageShort } from '../../../Models/Message/MessageShort/message-short.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
    //this.connection.onclose(async () => {
    //  await this.start();
    //});
    //this.connection.on("Notify", (user, message) => { this.mapReceivedMessage(user, message); });
    //this.start();
  }

  ngOnInit(): void {
  }

  //private connection2: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:7126/chat")   // mapping to the chathub as in startup.cs
  //  .configureLogging(signalR.LogLevel.Information)  
  //  .build();



  //connection = new signalR.HubConnectionBuilder()
  //  .configureLogging(signalR.LogLevel.Debug)
  //  .withUrl("https://localhost:7126/chat", {
  //    skipNegotiation: true,
  //    transport: signalR.HttpTransportType.WebSockets
  //  })
  //  .build();


  //readonly POST_URL = "https://localhost:7126/api/chat/Send"

  ////public send() {
  ////  this.messageService.
  ////}

  //private receivedMessageObject: MessageDto = new MessageDto();
  //private sharedObj = new Subject<MessageDto>();


  //public async start() {
  //  try {
  //    await this.connection.start();
  //    console.log("connected");
  //  } catch (err) {
  //    console.log(err);
  //    setTimeout(() => this.start(), 5000);
  //  }
  //}

  //private mapReceivedMessage(user: string, message: string): void {
  //  this.receivedMessageObject.user = user;
  //  this.receivedMessageObject.msgText = message;
  //  this.sharedObj.next(this.receivedMessageObject);
  //}

  ///* ****************************** Public Mehods **************************************** */

  //// Calls the controller method
  //public broadcastMessage(msgDto: any) {
  //  this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
  //  // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  //}

  //public retrieveMappedObject(): Observable<MessageDto> {
  //  return this.sharedObj.asObservable();
  //}


  public MessagesHistory: MessageShort[]=[];
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

      var message = new MessageShort();
      message.title = someText;
      message.isFromBot = true;
      this.MessagesHistory.push(message);

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
