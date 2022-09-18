import { RegistrationCommand } from "../../../core/services/swagger-gen";

export class RegisterMdoel implements RegistrationCommand {
  public email: string;
  public userName: string;
  public password: string;
  public confirmPass: string;
}
