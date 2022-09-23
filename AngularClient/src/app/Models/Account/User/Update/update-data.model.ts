import { UpdatePersonalDataDTO } from "../../../../core/services/swagger-gen";

export class UpdateData implements UpdatePersonalDataDTO {
  public sendToVk: boolean;
}
