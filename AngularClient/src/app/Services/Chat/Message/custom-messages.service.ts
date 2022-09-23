import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { protocol_botServerDomain } from '../../../../../env';
import { Configuration, MessageService } from '../../../core/services/swagger-gen';
import { Reminds } from '../../../Models/CommandResponseModels/Reminds/reminds.model';

@Injectable({
  providedIn: 'root'
})
export class CustomMessagesService extends MessageService {

  public override configuration = new Configuration();

  constructor(override httpClient: HttpClient, @Optional() configuration: Configuration) {
    super(httpClient, protocol_botServerDomain, configuration);
  }

  
}
