import { Message } from "../../Message/message.model";

export class ChatDetails {
  public id: string

  public avtorId: string

  public title: string

  public created: string

  public messages: Message[];

  public page: number;
}
