import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../core/services/swagger-gen';
import { Chat } from '../../../Models/Chat/chat.model';
import { CustomChatService } from '../../../Services/Chat/Chat/custom-chat.service';

@Component({
  selector: 'app-my-chats',
  templateUrl: './my-chats.component.html',
  styleUrls: ['./my-chats.component.css']
})
export class MyChatsComponent implements OnInit {

  constructor(public chatService: CustomChatService) { }

  public CurentPage:Chat[];

  ngOnInit(): void {
    this.chatService.getMyChats(0).subscribe(res => {
      this.CurentPage = res as Chat[];
    },
    err => {
      console.log(err);
    })
  }

}
