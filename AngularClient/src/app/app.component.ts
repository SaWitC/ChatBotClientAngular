import { Component, HostListener, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AccountService } from './core/services/swagger-gen';
import { CustomAccountService } from './Services/Account/custom-account.service';
import { RemindCustomService } from './Services/Commands/Remind/remind.service';
import * as RoutesPath from './Services/Routes';
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
    public HotifySignlaR: NotifySignalRService) {
  }
  ngOnInit() {

    setTimeout(() => {
      this.HotifySignlaR.NotifyMessageListener();
    }, 2000)
    if (this.accountService.isAutenticated())
      this.HotifySignlaR.startConnection();
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.closeConnection();
  }

  closeConnection() {
    this.HotifySignlaR.stopConnection();
  }

}
