import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { MessageService } from '../../../core/services/swagger-gen/api/message.service'
import * as signalR from '@microsoft/signalr';   
import { HttpClient } from '@angular/common/http';
import { MessageDto } from '../../../Models/Messages/message-dto.model';
import { Observable, Subject } from 'rxjs';
import { ChatService } from '../../../Services/SignalR/chat/chat.service'
//import { SelectItem } from 'primeng/primeng';
declare var $: any;

@Component({
  selector: 'app-chathub',
  templateUrl: './chathub.component.html',
  styleUrls: ['./chathub.component.css']
})
export class ChathubComponent implements OnInit, OnDestroy {

  constructor(private chatService: ChatService ) {
  }

  ngOnInit(): void {
    this.chatService.startConnection();

    setTimeout(() => {
      this.chatService.askServerListener();
      //this.chatService.askServer();
    },2000)
    //this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); });  // calls the service method to get the new messages sent

  }

  msgDto: MessageDto = new MessageDto();
  Messages: MessageDto[] = [];


  send(): void {
    if (this.msgDto) {
      if (this.msgDto.user.length == 0 || this.msgDto.user.length == 0) {
        this.chatService.askServer(this.msgDto.msgText,"");
      }
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    //this.msgInboxArray.push(newObj);

  }

  ngOnDestroy() {
    this.chatService.hubConnection.off("Notify")
  }
}
