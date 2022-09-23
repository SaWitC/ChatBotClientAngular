import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as ChatHubService  from '../../../Services/SignalR/chat/chat.service';
import { ChatService } from '../../../core/services/swagger-gen/api/chat.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Observable, observable, Subscription, switchMap } from 'rxjs';
import { MessageDto } from '../../../Models/Messages/message-dto.model';
import { MessageShort } from '../../../Models/Message/MessageShort/message-short.model';
import { Message} from '../../../Models/Message/message.model';
import { ChatDetails } from '../../../Models/Chat/Details/chat-details.model';
import { MessageService } from '../../../core/services/swagger-gen';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomChatService } from '../../../Services/Chat/Chat/custom-chat.service';
import { CustomMessagesService } from '../../../Services/Chat/Message/custom-messages.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {


  id: string;
  private subscription: Subscription;
  public CurentChat: ChatDetails = new ChatDetails();

  public lastDatepicker: HTMLInputElement;
  

  msgText: string;
  constructor(
    private router: Router,
    private chatService: CustomChatService,
    public chatHubService: ChatHubService.CustomChatService,
    private activateRoute: ActivatedRoute,
    private messageService: CustomMessagesService,
    public domSanitizer: DomSanitizer  ) {

    setTimeout(() => {
      this.chatHubService.askServerListener();
      this.chatHubService.peopleMessageListener();
    }, 2000)
  }

  ngOnInit(): void {

    this.chatHubService.startConnection();
    this.id = this.activateRoute.snapshot.params['id'];

    var subj =this.chatService.details(this.id).subscribe
      (res => {
        this.CurentChat = res as ChatDetails;
        
      },
      err => { console.log(err) },
      () => {
        this.chatHubService.MessagesHistory = this.CurentChat.messages.reverse();
        let lastElementFromArray: Message = this.chatHubService.MessagesHistory[this.chatHubService.MessagesHistory.length - 1]

        this.chatHubService.lastMessageFromBot = this.domSanitizer.bypassSecurityTrustHtml(lastElementFromArray.text)

        this.CurentChat.page = this.CurentChat.page - 1;
      }
    )
  }

  PageFirsLoad(): void {
    this.chatHubService.MessagesHistory = this.CurentChat.messages.reverse();
    let lastElementFromArray: Message = this.chatHubService.MessagesHistory[this.chatHubService.MessagesHistory.length - 1]

    this.chatHubService.lastMessageFromBot = this.domSanitizer.bypassSecurityTrustHtml(lastElementFromArray.text)

    this.CurentChat.page = this.CurentChat.page - 1;
  }

  send(): void {
    if (!this.msgText.startsWith("@")) {
      var message = new Message();
      message.text = this.msgText;
      message.isFromBot = false;

      this.chatHubService.MessagesHistory.push(message)
      this.chatHubService.askServer(this.msgText, this.id);
    }
    else {
      if (this.msgText.match(/nav\s{0,}/ || /navigate\s{0,}/)) {
        var match = this.msgText.match(/nav\s{0,}/ || /navigate\s{0,}/)
        let path: string = "";
        if (match != null)
          path = this.msgText.replace(match[0], "");
        this.router.navigate([path.substring(1)])
      }
      else if (this.msgText.match(/help\s{0,}/)) {
        this.router.navigate(["help"])
      }
      else {
        alert("incorrect client command");
      }
      
    }
   
  }

  ReplaceAll(text: string) {
    var res = text.replace(/"/g, '');
    return res;
  }

  RenderHtml(obj, text) {
    obj.innerHtml = text;
  }

  LoadOld() {
    this.CurentChat.page = this.CurentChat.page - 1
    this.messageService.getMessages(this.CurentChat.page, this.CurentChat.id).subscribe(res => {
      var mess = res as Message[];
      mess = mess.reverse();


      this.chatHubService.MessagesHistory = mess.reverse().concat(this.chatHubService.MessagesHistory);
    },
      err =>{
    });
  }

  date: string;
  time: string;

  DateChange(value) {
    this.date = value;
    this.msgText = this.date +" "+ this.time;
  }
  TimeChange(value) {
    this.time = value;
    this.msgText = this.date + " " + this.time;
  }

  

}


