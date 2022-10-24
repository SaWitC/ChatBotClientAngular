import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from '../../../core/services/swagger-gen';
import { CustomChatService } from '../../../Services/Chat/Chat/custom-chat.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public chatService: CustomChatService,
    private toastr: ToastrService  ) { }

  public isSubmitted: boolean = false;

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.isSubmitted = true;
    console.log(form.value.title);
    this.chatService.createChat({ title: form.value.title }).subscribe(
      res => {
        this.toastr.success("new chatCreated","");
      },
      err => {
        this.toastr.error("server cannot fulfill your request");
      }    )
  }
}
