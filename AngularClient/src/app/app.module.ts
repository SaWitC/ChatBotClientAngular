import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Account/login/login.component';
import { ApiModule, ChatService } from './core/services/swagger-gen';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './Components/Chat/details/details.component';
import { ChathubComponent } from './Components/SignalR/chathub/chathub.component';
import { AuthGuardService } from './Guards/Auth/AuthGard/auth-guard.service';
import { MyChatsComponent } from './Components/Chat/my-chats/my-chats.component';
import { CreateComponent } from './Components/Chat/create/create.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsComponent,
    ChathubComponent,
    MyChatsComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ApiModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7126"],
        disallowedRoutes:[],
      }
    }),
  ],
  providers: [ChatService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
