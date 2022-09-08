import { Chat } from "../Chat/chat.model";

export class Message {
    public id :string
    public text :string
    public avtroId: string
    public ParentId: string
    public chat: Chat;
    public IsFromBot: boolean; 
    public Created :string
}
