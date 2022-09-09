import { Component, OnInit } from '@angular/core';
import * as ChatHubService  from '../../../Services/SignalR/chat/chat.service';
import { ChatService } from '../../../core/services/swagger-gen/api/chat.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import { MessageDto } from '../../../Models/Messages/message-dto.model';
import { MessageShort } from '../../../Models/Message/MessageShort/message-short.model';
import { Message} from '../../../Models/Message/message.model';
import { ChatDetails } from '../../../Models/Chat/Details/chat-details.model';
import { MessageService } from '../../../core/services/swagger-gen';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: string;
  private subscription: Subscription;
  public CurentChat: ChatDetails = new ChatDetails();
  

  msgText: string;
  constructor(private chatService: ChatService, public chatHubService: ChatHubService.ChatService, private activateRoute: ActivatedRoute, private messageService: MessageService) {

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

    this.chatService.details(this.id).subscribe
      (res => {
        console.log(res)
        console.log(this.CurentChat)
        this.CurentChat = res as ChatDetails;
        console.log(this.CurentChat)
      },
        err => { console.log(err) }
    );

    setTimeout(() => {
      console.log("1");
      this.chatHubService.MessagesHistory = this.CurentChat.messages.reverse();

      this.CurentChat.page = this.CurentChat.page - 1;
      console.log(this.CurentChat.page)
    }, 1000)
   
  }

  send(): void {
    //var Message = new MessageShort();
    var message = new Message();
    message.text = this.msgText;
    message.isFromBot = false;

    this.chatHubService.MessagesHistory.push(message)
    console.log(this.chatHubService.MessagesHistory);

    this.chatHubService.askServer(this.msgText, this.id);
  }

  LoadOld() {
    this.CurentChat.page = this.CurentChat.page - 1
    console.log(this.CurentChat.page);
    this.messageService.getMessages(this.CurentChat.page, this.CurentChat.id).subscribe(res => {
      console.log(res)
      var mess = res as Message[];
      mess = mess.reverse();


      this.chatHubService.MessagesHistory = mess.reverse().concat(this.chatHubService.MessagesHistory);
    },
      err =>{
        console.log(err);
    });
  }

}
