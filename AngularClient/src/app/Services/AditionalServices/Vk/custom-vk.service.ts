import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { protocol_botServerDomain } from '../../../../../env';
import { Configuration, VkService } from '../../../core/services/swagger-gen';

@Injectable({
  providedIn: 'root'
})
export class CustomVkService extends VkService {

  public override configuration = new Configuration();

  constructor(override httpClient: HttpClient, @Optional() configuration: Configuration) {
    super(httpClient, protocol_botServerDomain, configuration);
  }
}
