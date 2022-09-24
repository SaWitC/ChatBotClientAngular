import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RemindCustomService } from './Services/Commands/Remind/remind.service';
import * as RoutesPath from './Services/Routes';
import { RouteService } from './Services/RouteService/route.service';
import { NotifySignalRService } from './Services/SignalR/Notify/notify-signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularClient';

  //public isActivOutlet: boolean = false;
  public routesPath = RoutesPath;

  constructor(public remindCustomService: RemindCustomService, public router: Router, public routeService: RouteService, public HotifySignlaR: NotifySignalRService) {
    //this.router.events.subscribe(res => {
    //  if (this.router.url == "/")
    //    //this.isActivOutlet = false;
    //})
  }
  ngOnInit() {

    setTimeout(() => {
      this.HotifySignlaR.NotifyMessageListener();
    }, 2000)

    this.HotifySignlaR.startConnection();
  }

  onChanged(increased: any) {
    console.log(increased)
    console.log("event ")
    this.remindCustomService.SetAnyReminds()
    console.log(this.remindCustomService.activeReminders);
  }

  //onRouted(increased: any) {
  //  this.isActivOutlet = false;
  //}

  //ActiveOutlet() {
  //  this.isActivOutlet = true;
  //}
  //DeactiveOutlet() {
  //  this.isActivOutlet = false;
  //}
}
