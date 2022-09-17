import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as ChatHubService  from '../../../Services/SignalR/chat/chat.service';
import { ChatService } from '../../../core/services/swagger-gen/api/chat.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import { MessageDto } from '../../../Models/Messages/message-dto.model';
import { MessageShort } from '../../../Models/Message/MessageShort/message-short.model';
import { Message} from '../../../Models/Message/message.model';
import { ChatDetails } from '../../../Models/Chat/Details/chat-details.model';
import { MessageService } from '../../../core/services/swagger-gen';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


  

export class DetailsComponent implements OnInit {

  //myForm: FormGroup = new FormGroup({

  //  "msgText": new FormControl(),

  //});

  id: string;
  private subscription: Subscription;
  public CurentChat: ChatDetails = new ChatDetails();

  public lastDatepicker: HTMLInputElement;
  

  msgText: string;
  constructor(private chatService: ChatService, public chatHubService: ChatHubService.ChatService,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    public domSanitizer: DomSanitizer  ) {

    //this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
    setTimeout(() => {
      this.chatHubService.askServerListener();
      this.chatHubService.peopleMessageListener();

      //this.chatService.askServer();
    }, 2000)
  }

  ngOnInit(): void {

    
    //this.correctText = this.domSanitizer.bypassSecurityTrustHtml(this.testtext);

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
      let lastElementFromArray: Message = this.chatHubService.MessagesHistory[this.chatHubService.MessagesHistory.length - 1]




      //let position = lastElementFromArray.text.indexOf('type="date')
      //if (position > 0) {
      //  lastElementFromArray.text = [lastElementFromArray.text.slice(0, position+11), '#date name="date" (ngModelChange)="onChange($event)"', lastElementFromArray.text.slice(position+11)].join('');
      //}

      this.chatHubService.lastMessageFromBot = this.domSanitizer.bypassSecurityTrustHtml(lastElementFromArray.text)

      this.CurentChat.page = this.CurentChat.page - 1;
      console.log(this.CurentChat.page)
    }, 2000)
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

  ReplaceAll(text: string) {
    var res = text.replace(/"/g, '');
    console.log(res);
    return res;
  }

  RenderHtml(obj, text) {
    obj.innerHtml = text;
    console.log(obj)
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

  onChange(e) {
    console.log(this.date);
    console.log(e);

    //this.msgText = e;
    //console.log(e);
  }
  //ngOnChanges(changes: SimpleChanges) {
  //  console.log(changes["date"].currentValue);
  //}

  date: string;
  time: string;

  DateChange(value) {
    this.date = value;
    this.msgText = this.date +" "+ this.time;
    console.log(value);          //Changed Value
  }
  TimeChange(value) {
    this.time = value;
    this.msgText = this.date + " " + this.time;
    console.log(value);          //Changed Value
  }

  

}


