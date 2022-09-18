import { LoginCommand } from "../../../core/services/swagger-gen";

export class LoginModel implements LoginCommand {
  public userName: string = "";
  public password: string = "";
}
