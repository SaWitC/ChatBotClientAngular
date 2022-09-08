import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatService } from '../../../core/services/swagger-gen';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }


  submit(form: NgForm) {

    console.log(form.value.title);
    this.chatService.createChat({ title: form.value.title }).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }    )
  }
}
