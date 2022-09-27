import { Component, HostListener, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AccountService } from './core/services/swagger-gen';
import { CustomAccountService } from './Services/Account/custom-account.service';
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

  constructor(public accountService: CustomAccountService,
    public remindCustomService: RemindCustomService,
    public router: Router,
    public routeService: RouteService,
    public HotifySignlaR: NotifySignalRService) {
  }
  ngOnInit() {

    setTimeout(() => {
      this.HotifySignlaR.NotifyMessageListener();
    }, 2000)
    if (this.accountService.isAutenticated())
      this.HotifySignlaR.startConnection();
  }

  onChanged(increased: any) {
    this.remindCustomService.SetAnyReminds()
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.closeConnection();
  }

  closeConnection() {
    this.HotifySignlaR.stopConnection();
  }

}
