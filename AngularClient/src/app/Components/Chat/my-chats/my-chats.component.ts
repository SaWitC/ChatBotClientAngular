import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../core/services/swagger-gen';
import { Chat } from '../../../Models/Chat/chat.model';
import { CustomChatService } from '../../../Services/Chat/Chat/custom-chat.service';
import * as RoutesPath from '../../../Services/Routes';

@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.component.html',
  styleUrls: ['./my-chats.component.css']
})
export class MyChatsComponent implements OnInit {

  constructor(public chatService: CustomChatService) { }

  public CurentPage: Chat[];
  public routesPath = RoutesPath;

  ngOnInit(): void {

    
    this.chatService.getMyChats(0).subscribe(res => {
      this.CurentPage = res as Chat[];
    },
    err => {
      console.log(err);
    })
  }

}
