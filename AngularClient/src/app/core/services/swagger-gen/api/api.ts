export * from './account.service';
import { AccountService } from './account.service';
export * from './chat.service';
import { ChatService } from './chat.service';
export * from './message.service';
import { MessageService } from './message.service';
export * from './signalR.service';
import { SignalRService } from './signalR.service';
export const APIS = [AccountService, ChatService, MessageService, SignalRService];
