import { Chat } from "../Chat/chat.model";

export class Message {
    public id :string
    public text :string
    public avtroId: string
    public parentId: string
    public chat: Chat;
    public isFromBot: boolean; 
    public created :string
}
