import { Component, OnInit } from '@angular/core';
import { RemindCustomService } from './Services/Commands/Remind/remind.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularClient';

  public isActivOutlet: boolean = false;

  constructor(public remindCustomService: RemindCustomService) {

  }
  ngOnInit() {
    //console.log("777777777777777777777")
    //this.remindCustomService.SetAnyReminds();
  }

  onChanged(increased: any) {
    console.log(increased)
    console.log("event ")
    this.remindCustomService.SetAnyReminds()
    console.log(this.remindCustomService.activeReminders);
  }

  ActiveOutlet() {
    this.isActivOutlet = true;
  }
  DeactiveOutlet() {
    this.isActivOutlet = false;
  }
}
