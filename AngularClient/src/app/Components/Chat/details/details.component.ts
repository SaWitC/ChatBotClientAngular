import { Component, OnInit } from '@angular/core';
import * as ChatHubService  from '../../../Services/SignalR/chat/chat.service';
import { ChatService } from '../../../core/services/swagger-gen/api/chat.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import { MessageDto } from '../../../Models/Messages/message-dto.model';
import { MessageShort } from '../../../Models/Message/MessageShort/message-short.model';
import { Message } from '../../../Models/Message/message.model';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: string;
  private subscription: Subscription;
  

  msgText: string;
  constructor(private chatService: ChatService, public chatHubService: ChatHubService.ChatService, private activateRoute: ActivatedRoute) {

    //var res = chatService.details();
    //this.chatHubService.MessagesHistory = res as MessageShort[];
    //this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
    setTimeout(() => {
      this.chatHubService.askServerListener();
      this.chatHubService.peopleMessageListener();

      //this.chatService.askServer();
    }, 2000)
  }

  ngOnInit(): void {
    this.chatHubService.startConnection();
    this.id = this.activateRoute.snapshot.params['id'];
    
  }

  SendMessage(form: NgForm) {

    //var message = form.value.message;
    //console.log("send "+message);
    //console.log(this.msgDto.msgText)
    //if (this.id != null && this.msgDto.msgText.length > 0) {
    //  this.chatHubService.askServer(this.msgDto.msgText, this.id);
    //}
  }

  send(): void {
    var Message = new MessageShort();
    Message.title = this.msgText;
    Message.isFromBot = false;

    this.chatHubService.MessagesHistory.push(Message)
    console.log(this.chatHubService.MessagesHistory);

    this.chatHubService.askServer(this.msgText, this.id);
  }

}
